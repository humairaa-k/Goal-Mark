// material-ui
import { useTheme, useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';
import useConfig from 'hooks/useConfig';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import Typography from '@mui/material/Typography';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const { state, setField } = useConfig();
  const { mode, setMode } = useColorScheme();
  const { i18n } = useTranslation();

  const resolveDirection = (language) => (language === 'ps' ? 'rtl' : 'ltr');

  const handleThemeToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setField('direction', resolveDirection(language));
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex', gap: 2, alignItems: 'center', marginInlineEnd: 2, mt:2.3 }}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, mt:2 }}>
          <LogoSection />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            color: theme.vars.palette.secondary.dark,
            background: theme.vars.palette.secondary.light,
            '&:hover': {
              color: theme.vars.palette.secondary.light,
              background: theme.vars.palette.secondary.dark
            }
          }}
          onClick={() => handlerDrawerOpen(!drawerOpen)}
        >
          <IconMenu2 stroke={1.5} size="20px" />
        </Avatar>
      </Box>

      {/* header search */}
      <Box sx={{mt:2.3}}>
       <SearchSection />
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,mt:2.3 }}>
        {/* Lang toggle */}
        <Tooltip title="Change Language">
          <IconButton 
            onClick={() => handleLanguageChange(i18n.language === 'en' ? 'ps' : 'en')} 
            color="inherit"
            sx={{ 
              gap: 1.5, 
              borderRadius: 4,
              px: 1.5   
            }}
          >
            <TranslateOutlinedIcon sx={{ fontSize: 20 }} />
            <Typography variant="button" fontWeight={600}>
              {i18n.language.toUpperCase()}
            </Typography>
           </IconButton>
          </Tooltip>
      
          {/* theme changer */}
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={handleThemeToggle} color="inherit">
            {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Box>
    </>
  );
}
