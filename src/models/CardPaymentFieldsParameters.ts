import { FieldRequirement } from "./FieldRequirement";

export type CardPaymentFieldsParameters = {
    cardNameField?: FieldRequirement;
    emailField?: FieldRequirement;
    cardholderNameField?: FieldRequirement;
};

export const defaultCardPaymentFieldsParameters: CardPaymentFieldsParameters = {
    cardNameField: FieldRequirement.None,
    emailField: FieldRequirement.None,
    cardholderNameField: FieldRequirement.None,
};