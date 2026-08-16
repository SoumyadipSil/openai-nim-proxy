export const professionalModels = [
  // Coding & Reasoning
  { id: 'deepseek-coder-6.7b-instruct', provider: 'deepseek' },
  { id: 'meta/llama-3.1-405b-instruct', provider: 'meta' },
  { id: 'meta/llama-3.1-70b-instruct', provider: 'meta' },
  { id: 'meta/llama-3.1-8b-instruct', provider: 'meta' },
  { id: 'nvidia/nemotron-4-340b-instruct', provider: 'nvidia' },
  { id: 'mistralai/mistral-large-2-instruct', provider: 'mistralai' },
  { id: 'mistralai/mixtral-8x22b-instruct-v0.1', provider: 'mistralai' },
  
  // Speed & Efficiency
  { id: 'meta/llama3-8b-instruct', provider: 'meta' },
  { id: 'google/gemma-2-27b-it', provider: 'google' },
  { id: 'google/gemma-2-9b-it', provider: 'google' },
  { id: 'microsoft/phi-3-mini-4k-instruct', provider: 'microsoft' },
  { id: 'microsoft/phi-3-small-8k-instruct', provider: 'microsoft' }
];

/**
 * Resolves the incoming requested model to a NIM-compatible model name.
 * If the model doesn't need mapping, it passes it through.
 */
export function resolveTargetModel(requestedModel: string): string {
  // If the user already provides a full NIM path (e.g. meta/llama-3.1-70b-instruct), use it.
  if (requestedModel.includes('/')) {
    return requestedModel;
  }

  // Simple aliases
  const aliases: Record<string, string> = {
    'gpt-4': 'meta/llama-3.1-405b-instruct',
    'gpt-4-turbo': 'meta/llama-3.1-405b-instruct',
    'gpt-4o': 'meta/llama-3.1-405b-instruct',
    'gpt-3.5-turbo': 'meta/llama-3.1-70b-instruct',
    'claude-3-opus': 'nvidia/nemotron-4-340b-instruct',
    'claude-3-sonnet': 'mistralai/mistral-large-2-instruct',
    'claude-3-haiku': 'meta/llama-3.1-8b-instruct',
    'deepseek-coder': 'deepseek-coder-6.7b-instruct',
    'nemotron': 'nvidia/nemotron-4-340b-instruct',
    'llama-3.1': 'meta/llama-3.1-70b-instruct',
  };

  return aliases[requestedModel.toLowerCase()] || requestedModel;
}
