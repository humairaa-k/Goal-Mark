import { Snackbar as MuiSnackbar, Alert } from "@mui/material";

export default function AppSnackbar({ open, message, onClose }) {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert
        onClose={onClose}
        severity="info"
        variant="filled"
        sx={{ borderRadius: 2 }}
      >
        🔔 {message}
      </Alert>
    </MuiSnackbar>
  );
}
