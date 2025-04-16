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
};

export type ThemeConfigurator = {
  lightColorScheme: DomainColorScheme;
  darkColorScheme: DomainColorScheme;
  sizes: DomainSizes;
};

export const defaultThemeConfigurator: ThemeConfigurator = {
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
  },
};