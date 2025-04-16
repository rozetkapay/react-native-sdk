import {   MD3LightTheme } from 'react-native-paper';

const lightColors =  {
        "primary": "rgb(24, 109, 50)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(162, 246, 171)",
        "onPrimaryContainer": "rgb(0, 33, 9)",
        "secondary": "rgb(81, 99, 81)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(212, 232, 209)",
        "onSecondaryContainer": "rgb(15, 31, 17)",
        "tertiary": "rgb(57, 101, 109)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(189, 234, 243)",
        "onTertiaryContainer": "rgb(0, 31, 36)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(252, 253, 247)",
        "onBackground": "rgb(26, 28, 25)",
        "surface": "rgb(252, 253, 247)",
        "onSurface": "rgb(26, 28, 25)",
        "surfaceVariant": "rgb(221, 229, 217)",
        "onSurfaceVariant": "rgb(65, 73, 65)",
        "outline": "rgb(114, 121, 112)",
        "outlineVariant": "rgb(193, 201, 190)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(46, 49, 45)",
        "inverseOnSurface": "rgb(240, 241, 236)",
        "inversePrimary": "rgb(135, 217, 145)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(241, 246, 237)",
            "level2": "rgb(234, 242, 231)",
            "level3": "rgb(227, 237, 225)",
            "level4": "rgb(225, 236, 223)",
            "level5": "rgb(220, 233, 219)"
        },
        "surfaceDisabled": "rgba(26, 28, 25, 0.12)",
        "onSurfaceDisabled": "rgba(26, 28, 25, 0.38)",
        "backdrop": "rgba(43, 50, 43, 0.4)"
    }

const RozetkaPayTheme = {
    ...MD3LightTheme,
    colors: lightColors,
};


export default RozetkaPayTheme;