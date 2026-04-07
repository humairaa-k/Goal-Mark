import {  useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography
} from "@mui/material";

import { useTranslation } from "react-i18next";

export default function CategoryForm({ open, onClose, editingCategory, onSave, categories=[] }) {

  const defaultValues = {
    name: editingCategory?.name || "",
    color: editingCategory?.color || "#2d76bb",
    icon: editingCategory?.icon || "folder" 
  };

  const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm({defaultValues, mode: 'onChange'});

  useEffect(() => {
    reset(defaultValues);
  },[editingCategory, open]);

 const onSubmit = (data) => {
   const trimmedName = data.name.trim();

   onSave({
    ...data,
    name: trimmedName
   });
 };

 const {t} = useTranslation("categories");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingCategory ? t("form.editTitle") : t("form.createTitle")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label={t("form.fields.name")}
          {...register('name',{
            required: t("form.validation.required"),
            validate: (value) => {
              const trimmed = value.trim();

              const isDuplicate = categories.some((c) => 
                c.name.toLowerCase() === trimmed.toLowerCase() &&
                (!editingCategory || c.name !== editingCategory.name)
              );
              return isDuplicate ? t("form.validation.duplicate") : true;
            }
          })} 
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth />

          <Box>
            <Typography variant="caption" color="text.secondary"> {t("form.fields.color")} </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
              <TextField type="color"{...register('color')}  sx={{ width: 80 }} />
              <Typography variant="body2">{t("form.helper.color")}</Typography>
            </Box>
          </Box>

          <TextField label={t("form.fields.icon")} {...register("icon")} fullWidth helperText={t("form.helper.icon")} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{gap: 0.7 }}>
        <Button sx={{border: 1}} onClick={onClose}>{t("form.actions.cancel")}</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          {editingCategory ? t("form.actions.save") : t("form.actions.create")}
          </Button>
      </DialogActions>
    </Dialog>
  );
}