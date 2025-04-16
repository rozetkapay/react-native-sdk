import { FieldRequirement } from "../FieldRequirement";
import type { defaultThemeConfigurator } from "../theme/ThemeConfigurator";

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

export type StartTokenizationParams = {
    widgetKey: string;
    fieldsParameters?: typeof defaultTokenizationFieldsParameters;
    themeConfigurator?: typeof defaultThemeConfigurator;
}
