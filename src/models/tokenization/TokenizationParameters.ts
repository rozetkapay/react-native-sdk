import type { defaultCardPaymentFieldsParameters } from "../CardPaymentFieldsParameters";
import type { defaultThemeConfigurator } from "../theme/ThemeConfigurator";


export type StartTokenizationParams = {
    widgetKey: string;
    fieldsParameters?: typeof defaultCardPaymentFieldsParameters;
    themeConfigurator?: typeof defaultThemeConfigurator;
}
