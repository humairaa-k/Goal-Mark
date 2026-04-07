import { Link } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';

import Logo from 'ui-component/Logo';
import AuthRegister from '../auth-forms/AuthRegister';

import { useTheme, alpha } from '@mui/material/styles';
import {
  Paper,
  Grid,
  Link as MuiLink
} from '@mui/material';
import { styled } from '@mui/material/styles';

const LeftPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  minHeight: 420,
  height: '100%',
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  position: 'relative',
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.down(950)]: {
  display: 'none',
},

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-80px',
    right: '-80px',
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: alpha(theme.palette.common.white, 0.12)
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-90px',
    left: '-90px',
    width: 260,
    height: 260,
    borderRadius: '50%',
    background: alpha(theme.palette.common.white, 0.08)
  }
}));

const RightPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  minHeight: 420,
  width: '100%'
}));


export default function Register() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Paper
      elevation={18}
      sx={{
        width: '100%',
        maxWidth: 980,
        mx: 'auto',
        borderRadius: { xs: 2, md: 6 },
        overflow: 'hidden',
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`
      }}
    >
      <Grid container>
      <Grid item xs={12} md={5}>
       <LeftPanel>
      <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
        <Box>
          <Logo />
        </Box>

        <Box>
          <Typography variant={downMD ? 'h4' : 'h3'} fontWeight={700} gutterBottom>
            Create your account
          </Typography>
          <Typography sx={{ maxWidth: 360, opacity: 0.9, lineHeight: 1.8 }}>
            Join the platform to track goals, manage progress, and stay consistent every day.
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="body2" sx={{ opacity: 0.85, mb: 1 }}>
          Simple. Clean. Organized.
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.75, display: 'block' }}>
          Build your habits with a dashboard designed to keep you focused.
        </Typography>
      </Box>
    </LeftPanel>
  </Grid>

  <Grid item xs={12} md={7}>
    <RightPanel>
      <Stack spacing={3} sx={{ maxWidth: 450, width: '100%', mx: 'auto' }}>
        <Stack spacing={1}>
          <Typography variant={downMD ? 'h3' : 'h2'} fontWeight={700} color="secondary.main">
            Sign up
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your details to continue
          </Typography>
        </Stack>
       <Stack spacing={3}
        sx={{
          width: '100%',
          maxWidth: 380,   
          mx: 'auto'
        }}
        >
          <AuthRegister />
        </Stack>
        <Divider />

        <Stack alignItems="center">
          <MuiLink
            component={Link}
            to="/pages/login"
            underline="none"
            variant="subtitle1"
            sx={{ fontWeight: 600}}
          >
            Already have an account?
          </MuiLink>
        </Stack>
      </Stack>
    </RightPanel>
  </Grid>
</Grid>
      </Paper>
    </AuthWrapper1>
  );
}
