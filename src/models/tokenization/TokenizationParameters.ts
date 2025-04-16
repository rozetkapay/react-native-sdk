import { FieldRequirement } from "../FieldRequirement";

export type TokenizationFieldsParameters = {
    cardNameField?: FieldRequirement;
    emailField?: FieldRequirement;
    cardholderNameField?: FieldRequirement;
};

export const defaultTokenizationFieldsParameters: TokenizationFieldsParameters = {
    cardNameField: FieldRequirement.None,
    emailField: FieldRequirement.None,
    cardholderNameField: FieldRequirement.None,
};

export type TokenizationParams = {
    widgetKey: string;
    fieldsParameters?: typeof defaultTokenizationFieldsParameters;
}
