import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { DEFAULT_THEME_MODE } from 'config';
import useConfig from 'hooks/useConfig';

const DEFAULT_ENGLISH_FONT = `'Poppins', sans-serif`;
const DEFAULT_PASHTO_FONT = `'Noto Sans Arabic', sans-serif`;

const FONT_OPTIONS = [
  { id: 'poppins', value: `'Poppins', sans-serif`, label: 'Poppins' },
  { id: 'inter', value: `'Inter', sans-serif`, label: 'Inter' },
  { id: 'roboto', value: `'Roboto', sans-serif`, label: 'Roboto' },
  { id: 'noto', value: `'Noto Sans Arabic', sans-serif`, label: 'Noto Sans Arabic' }
];

export default function Settings() {
  const { mode, setMode } = useColorScheme();
  const { t, i18n } = useTranslation('settings');
  const {
    state: { fontFamily },
    resetState,
    setField
  } = useConfig();

  const resolveDirection = (language) => (language === 'ps' ? 'rtl' : 'ltr');
  const resolveDefaultFontFamily = (language) => (language === 'ps' ? DEFAULT_PASHTO_FONT : DEFAULT_ENGLISH_FONT);

  const handleThemeToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleFontChange = (nextFontFamily) => {
    setField('fontFamily', nextFontFamily);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setField('direction', resolveDirection(language));
  };

  const handleResetPreferences = () => {
    const nextDirection = resolveDirection(i18n.language);
    const nextFontFamily = resolveDefaultFontFamily(i18n.language);

    setMode(DEFAULT_THEME_MODE);
    resetState();
    setField('direction', nextDirection);
    setField('fontFamily', nextFontFamily);
  };

  return (
    <Box sx={{ px: { md: 4 }, py: { xs: 3, md: 6 }, minHeight: '80vh' }}>
      <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'center',
            justifyContent: 'space-between',
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            mb: 3,
            mt: -4,
            flexWrap: 'wrap',
            bgcolor: 'background.paper'
          }}
        >
          <Stack spacing={1.5} sx={{ minWidth: 0 }}>
            <Typography variant="h2" component="h1" fontWeight={800} sx={{ letterSpacing: '0.02em' }}>
              {t('settings')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {t('subtitle')}
            </Typography>
          </Stack>

          <Button variant="outlined" color="inherit" onClick={handleResetPreferences} sx={{ borderRadius: 2.5, px: 2.5 }}>
            {t('resetPreferences')}
          </Button>
        </Paper>

        <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}>
          <Stack spacing={5}>
            <Stack spacing={2}>
              <Typography variant="h4" fontWeight={600}>
                {t('appearance')}
              </Typography>
              <Divider />
              <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                <Stack>
                  <Typography variant="body1">{t('darkMode')}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('darkModeSubtitle')}
                  </Typography>
                </Stack>

                <Switch checked={mode === 'dark'} onChange={handleThemeToggle} />
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h4" fontWeight={600}>
                {t('language')}
              </Typography>
              <Divider />
              <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                <Stack>
                  <Typography variant="body1">{t('language')}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('languageSubtitle')}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    display: 'flex',
                    p: 0.5,
                    borderRadius: 3,
                    bgcolor: 'action.selected'
                  }}
                >
                  <Button
                    onClick={() => handleLanguageChange('en')}
                    sx={{
                      borderRadius: 2.5,
                      px: 2.5,
                      py: 0.6,
                      textTransform: 'none',
                      fontWeight: 600,
                      bgcolor: i18n.language === 'en' ? 'background.paper' : 'transparent',
                      color: 'text.primary',
                      boxShadow: i18n.language === 'en' ? 2 : 0
                    }}
                  >
                    EN
                  </Button>

                  <Button
                    onClick={() => handleLanguageChange('ps')}
                    sx={{
                      borderRadius: 2.5,
                      px: 2.5,
                      py: 0.6,
                      textTransform: 'none',
                      fontWeight: 600,
                      bgcolor: i18n.language === 'ps' ? 'background.paper' : 'transparent',
                      color: 'text.primary',
                      boxShadow: i18n.language === 'ps' ? 2 : 0
                    }}
                  >
                    PS
                  </Button>
                </Box>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h4" fontWeight={600}>
                {t('typography')}
              </Typography>
              <Divider />
              <Stack spacing={1}>
                <Typography variant="body1">{t('fontStyle')}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('fontStyleSubtitle')}
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                {FONT_OPTIONS.map((option) => {
                  const isActive = fontFamily === option.value;

                  return (
                    <Grid key={option.id} size={{ xs: 12, sm: 6 }}>
                      <Button
                        fullWidth
                        onClick={() => handleFontChange(option.value)}
                        variant={isActive ? 'contained' : 'outlined'}
                        color={isActive ? 'primary' : 'inherit'}
                        sx={{
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          px: 2,
                          py: 1.75,
                          borderRadius: 3,
                          fontFamily: option.value
                        }}
                      >
                        <Stack alignItems="flex-start" spacing={0.5}>
                          <Typography variant="h5" sx={{ fontFamily: option.value }}>
                            {option.label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: isActive ? 'inherit' : 'text.secondary' }}>
                            Aa Ab
                          </Typography>
                        </Stack>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
