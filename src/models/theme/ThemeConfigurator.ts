export enum ThemeMode {
  System = 'System',
  Light = 'Light',
  Dark = 'Dark',
}

export type DomainColorScheme = {
  surface: string;
  onSurface: string;
  appBarIcon: string;
  title: string;
  subtitle: string;
  error: string;
  primary: string;
  onPrimary: string;
  placeholder: string;
  componentSurface: string;
  componentDivider: string;
  onComponent: string;
};

export type DomainSizes = {
  sheetCornerRadius: number;
  componentCornerRadius: number;
  buttonCornerRadius: number;
  borderWidth: number;
  buttonHeight: number;
  googlePayButtonHeight: number;
  applePayButtonHeight: number;
  inputHeight: number;
  mainButtonTopPadding: number;
};

export namespace DomainTextStyle {
  export enum FontWeight {
    Thin = 'Thin',
    ExtraLight = 'ExtraLight',
    Light = 'Light',
    Normal = 'Normal',
    Medium = 'Medium',
    SemiBold = 'SemiBold',
    Bold = 'Bold',
    ExtraBold = 'ExtraBold',
    Black = 'Black',
  }
}

export type DomainTextStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight: DomainTextStyle.FontWeight;
};

export namespace DomainTypography {
  export enum FontFamily {
    Default = 'Default',
    SansSerif = 'SansSerif',
    Serif = 'Serif',
    Monospace = 'Monospace',
    Cursive = 'Cursive',
  }
}

export type DomainTypography = {
  fontFamily: DomainTypography.FontFamily;
  titleTextStyle: DomainTextStyle;
  subtitleTextStyle: DomainTextStyle;
  bodyTextStyle: DomainTextStyle;
  labelSmallTextStyle: DomainTextStyle;
  labelLargeTextStyle: DomainTextStyle;
  inputTextStyle: DomainTextStyle;
  legalTextTextStyle: DomainTextStyle;
};

export type ThemeConfigurator = {
  mode: ThemeMode;
  lightColorScheme: DomainColorScheme;
  darkColorScheme: DomainColorScheme;
  sizes: DomainSizes;
  typography: DomainTypography;
};

export const defaultThemeConfigurator: ThemeConfigurator = {
  mode: ThemeMode.System,
  lightColorScheme: {
    surface: '#FFFFFF',
    onSurface: '#2B2B2B',
    appBarIcon: '#9DA2A6',
    title: '#2B2B2B',
    subtitle: '#414345',
    error: '#FF0B0B',
    primary: '#00A046',
    onPrimary: '#FFFFFF',
    placeholder: '#9DA2A6',
    componentSurface: '#F6F7F9',
    componentDivider: '#DFE2E5',
    onComponent: '#2B2B2B',
  },
  darkColorScheme: {
    surface: '#221F1F',
    onSurface: '#EEEEEE',
    appBarIcon: '#A7A5A5',
    title: '#EEEEEE',
    subtitle: '#A7A5A5',
    error: '#E56464',
    primary: '#00A046',
    onPrimary: '#FFFFFF',
    placeholder: '#9B9EA0',
    componentSurface: '#363436',
    componentDivider: '#4E4C4C',
    onComponent: '#EEEEEE',
  },
  sizes: {
    sheetCornerRadius: 20,
    componentCornerRadius: 12,
    buttonCornerRadius: 12,
    borderWidth: 1,
    buttonHeight: 52,
    googlePayButtonHeight: 52,
    applePayButtonHeight: 52,
    inputHeight: 52,
    mainButtonTopPadding: 40,
  },
  typography: {
    fontFamily: DomainTypography.FontFamily.SansSerif,
    titleTextStyle: {
      fontSize: 22,
      lineHeight: 24,
      fontWeight: DomainTextStyle.FontWeight.SemiBold,
    },
    subtitleTextStyle: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: DomainTextStyle.FontWeight.SemiBold,
    },
    bodyTextStyle: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: DomainTextStyle.FontWeight.Normal,
    },
    labelSmallTextStyle: {
      fontSize: 14,
      lineHeight: 16,
      fontWeight: DomainTextStyle.FontWeight.Normal,
    },
    labelLargeTextStyle: {
      fontSize: 18,
      lineHeight: 20,
      fontWeight: DomainTextStyle.FontWeight.SemiBold,
    },
    inputTextStyle: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: DomainTextStyle.FontWeight.Normal,
    },
    legalTextTextStyle: {
      fontSize: 9,
      lineHeight: 10,
      fontWeight: DomainTextStyle.FontWeight.Normal,
    },
  },
};