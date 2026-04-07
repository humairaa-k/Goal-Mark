// material-ui
import { useTheme } from '@mui/material/styles';

import logoLight from '../assets/images/logoLight.png'
import logoDark from '../assets/images/logoDark.png'

import { useColorScheme } from '@mui/material/styles';


// project imports

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function Logo() {
  const theme = useTheme();
   const { mode } = useColorScheme();

  const currentLogo = (mode ?? theme.palette.mode) === 'dark' ? logoDark : logoLight;

  return (
     <img
    src={currentLogo}
    alt="logo"
    style={{
      height: 40,  
      transform: 'scale(2)', 
      objectFit: 'contain',
      margin: '0 auto'
    }}
  />
  );
}

