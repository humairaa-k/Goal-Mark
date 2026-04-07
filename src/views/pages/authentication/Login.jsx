import { Link } from 'react-router-dom';
import { Stack, Typography, Box, Divider, Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';

// project imports
import AuthWrapper1 from './AuthWrapper1';
// import AuthCardWrapper from 'ui-component/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AuthLogin from '../auth-forms/AuthLogin';

export default function Login() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        {/* Centered Paper card similar to Register form */}
        <Paper
          elevation={18}
          sx={{
            width: '100%',
            maxWidth: 450,
            borderRadius: { xs: 2, md: 6 },
            overflow: 'hidden',
            mx: 2,
            p: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          }}
        >
          <Stack sx={{ alignItems: 'center', gap: 3 }}>
            {/* Logo */}
            <Box>
              <Link to="#" aria-label="logo">
                <Logo />
              </Link>
            </Box>

            {/* Header */}
            <Stack sx={{ alignItems: 'center', gap: 1 }}>
              <Typography variant={downMD ? 'h3' : 'h2'} sx={{ color: 'secondary.main' }}>
                Hi, Welcome Back
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: '16px', textAlign: { xs: 'center', md: 'inherit' } }}
              >
                Enter your credentials to continue
              </Typography>
            </Stack>

            {/* Login Form */}
            <Box sx={{ width: '100%' }}>
              <AuthLogin />
            </Box>

            <Divider sx={{ width: '100%' }} />

            {/* Link to Register */}
            <Stack sx={{ alignItems: 'center' }}>
              <Typography
                component={Link}
                to="/pages/register"
                variant="subtitle1"
                sx={{ textDecoration: 'none', fontWeight: 600, color: 'text.primary' }}
              >
                Don&apos;t have an account?
              </Typography>
            </Stack>
          </Stack>
        </Paper>

      </Stack>
    </AuthWrapper1>
  );
}