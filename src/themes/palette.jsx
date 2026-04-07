// project imports
import { extendPaletteWithChannels, withAlpha } from 'utils/colorUtils';

// assets
import defaultColor from './theme/default';

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export function buildPalette(presetColor) {
  let colors;
  switch (presetColor) {
    case 'default':
    default:
      colors = defaultColor;
  }

  const lightColors = {
    primary: {
      light: colors.primaryLight,
      main: colors.primaryMain,
      dark: colors.primaryDark,
      200: colors.primary200,
      800: colors.primary800
    },
    secondary: {
      light: colors.secondaryLight,
      main: colors.secondaryMain,
      dark: colors.secondaryDark,
      200: colors.secondary200,
      800: colors.secondary800
    },
    error: {
      light: colors.errorLight,
      main: colors.errorMain,
      dark: colors.errorDark
    },
    orange: {
      light: colors.orangeLight,
      main: colors.orangeMain,
      dark: colors.orangeDark
    },
    warning: {
      light: colors.warningLight,
      main: colors.warningMain,
      dark: colors.warningDark,
      contrastText: colors.grey700
    },
    success: {
      light: colors.successLight,
      200: colors.success200,
      main: colors.successMain,
      dark: colors.successDark
    },
    grey: {
      50: colors.grey50,
      100: colors.grey100,
      500: colors.grey500,
      600: colors.grey600,
      700: colors.grey700,
      900: colors.grey900
    },
    dark: {
      light: colors.darkTextPrimary,
      main: colors.darkLevel1,
      dark: colors.darkLevel2,
      800: colors.darkBackground,
      900: colors.darkPaper
    },
    text: {
      primary: colors.grey700,
      secondary: colors.grey500,
      dark: colors.grey900,
      hint: colors.grey100,
      heading: colors.grey900
    },
    divider: colors.grey200,
    background: {
      paper: colors.paper,
      default: colors.paper
    }
  };


const darkColors = {
  primary: {
    light: '#64b5f6',
    main: '#2196f3',   
    dark: '#1976d2'
  },

  secondary: {
    light: '#9D7BFF',
    main: '#7C4DFF',
    dark: '#5A35CC'
  },

  error: {
    light: '#ef9a9a',
    main: '#f44336',
    dark: '#c62828'
  },

  warning: {
    light: '#ffe082',
    main: '#ff9800',
    dark: '#e65100'
  },

  success: {
    light: '#b9f6ca',
    main: '#00e676',
    dark: '#00c853'
  },

  orange: {
    main: '#ff9800'
  },

  // ⚡ Dark background & card
  background: {
    default: '#141414', 
    paper: '#1D1D1D'    
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    heading: '#FFFFFF',
    dark: '#FFFFFF',
    hint: '#888888'
  },

  grey: {
    50: '#2a2a2a',
    100: '#313131',
    200: '#3a3a3a',
    300: '#444444',
    400: '#555555',
    500: '#777777',
    600: '#999999',
    700: '#bbbbbb',
    800: '#dddddd',
    900: '#ffffff'
  },

  divider: '#313131'
};
const extendedDark = extendPaletteWithChannels(darkColors);

  const commonColor = { common: { black: colors.darkPaper, white: '#fff' } };

  const extendedLight = extendPaletteWithChannels(lightColors);
  const extendedCommon = extendPaletteWithChannels(commonColor);

  return {
    light: {
      mode: 'light',
      ...extendedCommon,
      ...extendedLight
    },
    dark: {
      mode: 'dark',
      ...extendedCommon,
      ...extendedDark
    }
  };
}
