import type { TokenizedCard } from './TokenizedCard';

export type TokenizationResult =
  | {
    type: 'Complete';
    tokenizedCard: TokenizedCard
  }
  | {
    type: 'Failed';
    message?: string;
    error?: string;
  }
  | {
    type: 'Cancelled';
  };