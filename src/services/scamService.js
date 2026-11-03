import { API_ENDPOINTS } from '../config/constants';
import { evaluateHeuristics } from './heuristicEngine';

/**
 * Service for analyzing scam threats via Backend REST API with offline heuristic fallback
 */
export const scamService = {
  async analyze({ type, content }) {
    const endpoint = `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ANALYZE_SCAM}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type.toUpperCase(),
          content: content.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Backend responded with status HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        riskLevel: data.riskLevel || data.risk || 'SUSPICIOUS',
        summary: data.summary || data.explanation || data.message || 'Analysis completed.',
        reasons: data.reasons || data.indicators || [],
        recommendation: data.recommendation || data.advice || 'Verify independently.',
        isLocalFallback: false,
      };
    } catch (err) {
      console.info(`[scamService] Backend unavailable (${err.message}). Using local heuristics.`);
      return evaluateHeuristics(type, content);
    }
  },
};

