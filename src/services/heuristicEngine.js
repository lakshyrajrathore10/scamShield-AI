import { RISK_LEVELS, SCAN_MODES } from '../config/constants';

/**
 * Intelligent Client-Side Threat Pattern Recognition
 * Runs without network dependencies as fallback or offline mode.
 */
export function evaluateHeuristics(type, content) {
  const normalizedType = (type || '').toLowerCase();
  const text = (content || '').toLowerCase();
  const reasons = [];
  let riskLevel = RISK_LEVELS.SAFE;
  let summary = '';
  let recommendation = '';

  if (normalizedType === SCAN_MODES.URL) {
    const isIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(text);
    const hasSuspiciousTLD = /\.(xyz|top|buzz|tk|ml|ga|cf|gq|icu|work|rest|onion)\b/.test(text);
    const isShortened = /(bit\.ly|tinyurl\.com|t\.co|is\.gd|buff\.ly|cutt\.ly|rb\.gy)/.test(text);
    const hasPhishingKeywords = /(login|secure|verify|account|update|banking|kyc|bonus|free|gift|reward|upi|support)/.test(text);
    const isBrandImpersonation =
      /(sbi|hdfc|icici|paytm|google|apple|amazon|netflix|flipkart|microsoft)/.test(text) &&
      !/(sbi\.co\.in|hdfcbank\.com|icicibank\.com|paytm\.com|google\.com|apple\.com|amazon\.(in|com)|netflix\.com|flipkart\.com|microsoft\.com)/.test(text);

    if (isIp) reasons.push('Uses raw numerical IP address instead of a registered domain.');
    if (isBrandImpersonation) reasons.push('Brand impersonation: Mentions trusted institution on non-official domain.');
    if (hasSuspiciousTLD) reasons.push('Uses disposable or low-reputation top-level domain frequently associated with phishing.');
    if (isShortened) reasons.push('URL shortener obscures the true destination address.');
    if (hasPhishingKeywords && (isShortened || hasSuspiciousTLD || isIp)) {
      reasons.push('Sensitve authentication keywords combined with deceptive routing.');
    }

    if (reasons.length >= 2 || isBrandImpersonation || isIp) {
      riskLevel = RISK_LEVELS.HIGH;
      summary = 'Critical threat: High probability of phishing or credential harvesting website.';
      recommendation = 'Do NOT open or input passwords. Close tab immediately and report domain.';
    } else if (reasons.length === 1 || hasPhishingKeywords || isShortened) {
      riskLevel = RISK_LEVELS.SUSPICIOUS;
      summary = 'Caution required: Displays deceptive traits common to marketing trackers or unverified redirectors.';
      recommendation = 'Verify the destination manually. Do not submit sensitive details.';
    } else {
      riskLevel = RISK_LEVELS.SAFE;
      summary = 'No immediate high-risk threat indicators found.';
      recommendation = 'Standard domain structure. Ensure valid HTTPS is active before continuing.';
      reasons.push('Standard protocol format.');
      reasons.push('No known brand spoofing patterns detected.');
    }
  } else if (normalizedType === SCAN_MODES.MESSAGE) {
    const hasUrgency = /(urgent|immediately|within 24 hours|account suspended|deactivated|disconnected|final warning|action required|arrest|police)/.test(text);
    const hasFinancialKeywords = /(lottery|prize|won|reward|cashback|crore|lakh|free gift|bonus|congratulations|claim now)/.test(text);
    const hasCredentialTheft = /(otp|pin|password|cvv|share code|verification code|upi pin)/.test(text);
    const hasKycElectricity = /(electricity power will be disconnected|update your kyc|pan card blocked|sim block|bill unpaid)/.test(text);
    const hasJobScam = /(part time job|like youtube videos|earn 5000 daily|work from home|telegram task)/.test(text);

    if (hasCredentialTheft) reasons.push('Demands security codes, OTP, or PINs which genuine entities never ask.');
    if (hasKycElectricity) reasons.push('Classic panic pretext: Electricity cutoff or urgent KYC block threat.');
    if (hasJobScam) reasons.push('Task/prepaid scam template: Unrealistic daily earnings for simple video likes.');
    if (hasUrgency) reasons.push('Artificial pressure designed to force hurried decisions.');
    if (hasFinancialKeywords) reasons.push('Unsolicited lottery or prize reward claim.');

    if (hasCredentialTheft || hasKycElectricity || (hasJobScam && hasFinancialKeywords) || reasons.length >= 2) {
      riskLevel = RISK_LEVELS.HIGH;
      summary = 'Severe risk of social engineering, credential harvesting, or financial theft.';
      recommendation = 'Do not respond, do not click links, and NEVER share OTPs or UPI PINs.';
    } else if (reasons.length === 1 || hasFinancialKeywords || hasUrgency) {
      riskLevel = RISK_LEVELS.SUSPICIOUS;
      summary = 'Suspicious unverified communication using psychological persuasion triggers.';
      recommendation = 'Cross-verify through official consumer helpline numbers sourced independently.';
    } else {
      riskLevel = RISK_LEVELS.SAFE;
      summary = 'No major scam triggers or coercion keywords found.';
      recommendation = 'Appears normal. Maintain caution if money or personal details are subsequently requested.';
      reasons.push('No urgent panic hooks.');
      reasons.push('No credential theft triggers.');
    }
  } else {
    // OFFER
    const hasUnrealisticDiscount = /(100% free|90% off|95% off|iphone for 999|free gift card|zero investment|guaranteed return|double your money)/.test(text);
    const hasCryptoForex = /(crypto|bitcoin|forex|binary option|guaranteed profit|daily 10%|multiplier)/.test(text);
    const hasTimerPressure = /(limited time offer|only today|only 2 left|hurry up|expires in)/.test(text);

    if (hasUnrealisticDiscount) reasons.push('Implausible price cut or luxury product for nominal amount.');
    if (hasCryptoForex) reasons.push('Guaranteed daily return claims typical of Ponzi/investment frauds.');
    if (hasTimerPressure) reasons.push('Aggressive fake countdown urgency to discourage price comparison.');

    if (hasUnrealisticDiscount || (hasCryptoForex && hasTimerPressure) || reasons.length >= 2) {
      riskLevel = RISK_LEVELS.HIGH;
      summary = 'High probability of fraudulent storefront or investment scam.';
      recommendation = 'Avoid transferring money or entering card details. Verify seller authenticity.';
    } else if (reasons.length === 1 || hasTimerPressure) {
      riskLevel = RISK_LEVELS.SUSPICIOUS;
      summary = 'Potentially misleading commercial promotion.';
      recommendation = 'Verify merchant ratings and opt for Cash on Delivery where possible.';
    } else {
      riskLevel = RISK_LEVELS.SAFE;
      summary = 'The offer does not show aggressive deceptive markers.';
      recommendation = 'Check customer return terms before finalizing any order.';
      reasons.push('Standard commercial phrasing.');
    }
  }

  return {
    riskLevel,
    summary,
    reasons,
    recommendation,
    isLocalFallback: true,
  };
}

