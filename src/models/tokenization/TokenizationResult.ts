export type TokenizationResult =
  | {
    type: 'Complete';
    tokenizedCard: {
      token: string;
      name?: string;
      cardInfo?: {
        maskedNumber?: string;
        paymentSystem?: string;
        bank?: string;
        isoA3Code?: string;
        cardType?: string;
      };
    };
  }
  | {
    type: 'Failed';
    message?: string;
    error?: string;
  }
  | {
    type: 'Cancelled';
  };