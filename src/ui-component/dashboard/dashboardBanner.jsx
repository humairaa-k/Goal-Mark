import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';

import darkImg from '../../assets/images/bg.PNG';
import lightImg from '../../assets/images/abstract.avif';
import girlImg from '../../assets/images/3dastrogirl.png';

import { useColorScheme, useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

import { useAuth } from '../../contexts/AuthContext';


export default function DashboardBanner() {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const navigate = useNavigate();
  const isRTL = theme.direction === 'rtl';
  const headerImg = (mode ?? theme.palette.mode) === 'dark' ? darkImg : lightImg;

  const goNew = () => navigate('/goals/new');
  const goGoals = () => navigate('/goals');

  const { user } = useAuth();

  const { t } = useTranslation("dashboard");

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 240,
        p: { xs: 2.5, md: 3.5 },
        backgroundImage: `url(${headerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        mb: 3,
        mt: -4,
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: isRTL ? 'right' : 'left',
          maxWidth: { xs: '100%', md: '58%' },
          pr: isRTL ? { xs: 0, md: 4 } : 0,
          pl: isRTL ? 0 : { xs: 0, md: 4 }
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ opacity: 0.82, textTransform: 'uppercase', letterSpacing: 1.6, color: 'white', fontWeight: 700 }}
        >
         {t("header.welcome")} {user?.email?.split("@")[0]} 
        </Typography>
        <Typography variant="h2" fontWeight="bold" color="white">
        {t("header.title")}
        </Typography>

        <Typography variant="h4" sx={{ mb: 2, color: '#fff', mt: 1.5, fontWeight: 400, maxWidth: 560, opacity: 0.92 }}>
         {t("header.subtitle")}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' }, mt: 3, gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={goNew}
            sx={{
              px: 3.2,
              py: 1.25,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 800,
              letterSpacing: '0.02em',
              boxShadow: '0 16px 34px rgba(124, 58, 237, 0.34)',
              width: { xs: '100%', sm: 'auto' },
              gap:0.7,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.42)'
              }
            }}
          >
            {t("header.newGoal")}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<ArrowOutwardIcon />}
            onClick={goGoals}
            sx={{
              px: 3.2,
              py: 1.25,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 800,
              letterSpacing: '0.02em',
              width: { xs: '100%', sm: 'auto' },
              borderColor: 'rgba(255,255,255,0.32)',
              color: '#fff',
              gap:0.7,
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.52)',
                backgroundColor: 'rgba(255,255,255,0.16)'
              }
            }}
          >
        {t("header.viewGoals")}
          </Button>
        </Stack>

      </Box>

      <Box
        component="img"
        src={girlImg}
        sx={{
          position: 'absolute',
          bottom: -66,
          right: isRTL ? 'auto' : 18,
          left: isRTL ? 18 : 'auto',
          height: 'auto',
          width: { xs: 0, sm: 230, md: 300 },
          maxWidth: '42%',
          zIndex: 1,
          filter: 'drop-shadow(0 20px 30px rgba(15, 23, 42, 0.25))',
    
        }}
      />
    </Box>
  );
}
