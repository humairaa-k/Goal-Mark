import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
 
import { useTranslation } from "react-i18next";

export default function ConfirmDelete({ open, title, message, onClose, onConfirm }) {

  const { t } = useTranslation("common");
 
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions sx={{gap:1.2}}>
        <Button onClick={onClose}>{t("common:actions.cancel")}</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
         {t("common:actions.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
