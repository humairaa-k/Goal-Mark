import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export default function CircleLoader() {
  return (
     <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        inset: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(116, 108, 108, 0.5)', 
        backdropFilter: 'blur(4px)',
        opacity: 0.7,
        zIndex: 2000
      }}
    >
      <CircularProgress size={60} />
      <p>Loading...</p>
    </Box>
  );
}