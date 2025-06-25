export type TokenizedCard = {
    token: string;
    name?: string;
    cardInfo?: CardInfo;
  };

export type CardInfo = {
  maskedNumber?: string;
  paymentSystem?: string;
  bank?: string;
  isoA3Code?: string;
  cardType?: string;
};