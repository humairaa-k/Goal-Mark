import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function DashboardStatCards({ items }) {
  return (
    <Grid container spacing={3} sx={{ mt: 0.5 }}>
      {items.map((item) => (
        <Grid key={item.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, fontWeight: 800 }}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
                  {item.subtitle}
                </Typography>
              </Box>

              <Avatar sx={{ bgcolor: `${item.color}1a`, color: item.color, width: 46, height: 46 }}>{item.icon}</Avatar>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

