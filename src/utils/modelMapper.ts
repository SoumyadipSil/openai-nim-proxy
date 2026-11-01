export const MODEL_MAPPING: Record<string, string> = {
  // Big / flagship
  "gpt-4": "nvidia/nemotron-3-ultra-550b-a55b",
  "gpt-4-turbo": "stepfun-ai/step-5-preview",
  "claude-3-opus": "mistralai/mistral-large-4-1t-a52b",
  "m3": "minimaxai/minimax-m3.1-flash",

  // Mid-tier
  "m2": "deepseek-ai/deepseek-v4.1-flash",
  "gpt-3.5-turbo": "nvidia/nemotron-3.5-super-vl-120b-a12b",
  "gpt-4o": "z-ai/glm-5.3-flash",
  "gemini-pro": "google/gemma-4-31b-it",
  "claude-3-sonnet": "openai/gpt-oss-20b",

  // Fast / light
  "gpt-4-flash": "nvidia/nemotron-3.5-lightning-30b-a3b",
  "gpt-3.5": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
  "gpt-3.5o": "poolside/laguna-xs-2.1",
  "gemini-turbo": "meta/muse-glimmer-30b",

  // Mistral aliases
  "mistral": "mistralai/mistral-large-4-1t-a52b",
  "mistral-nemo": "mistralai/mistral-large-4-1t-a52b",
  "mistral-turbo": "z-ai/glm-5.3-flash",
  "mistral-pro": "google/gemma-4-31b-it",
  "mistral-fast": "nvidia/nemotron-3.5-lightning-30b-a3b",

  // Google-style aliases
  "google-light": "google/gemma-4-31b-it",
  "google-lightest": "meta/muse-glimmer-30b",
  "google-lighter": "poolside/laguna-xs-2.1",

  // Vision
  "gpt-4-vision": "meta/llama-3.2-90b-vision-instruct",
};
export const professionalModels = Array.from(
  new Set(Object.values(MODEL_MAPPING)),
).map((id) => ({
  id,
  provider: id.split("/")[0],
}));

/**
 * Resolves the incoming requested model to a NIM-compatible model name.
 * If the model doesn't need mapping, it passes it through.
 */
export function resolveTargetModel(requestedModel: string): string {
  // If the user already provides a full NIM path (e.g. meta/llama-3.1-70b-instruct), use it.
  if (requestedModel.includes("/")) {
    return requestedModel;
  }

  return MODEL_MAPPING[requestedModel.toLowerCase()] || requestedModel;
}
