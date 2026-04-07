import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MainCard from "ui-component/cards/MainCard";

//btn imports
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/Edit';

import { IconButton } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { defaultCategories } from "../../data/categories";
import { useTranslation } from "react-i18next";

export default function GoalForm({ defaultValues, onSubmit, formTitle, subTitle, submitButtonText, onChangeValues }) {

  const navigate = useNavigate();

    const emptyValues = {
    title: "",
    category: "Health",
    type: "daily",
    target: 1,
    startDate: "",
    endDate: "",
    deadline: "",
    startTime: "",
    endTime: "",
    color: "#1976d2",
    icon: "",
    notes: "",
    reminder: {
    enabled: false,
    time: ""
  }
  };

  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm({
  defaultValues: defaultValues || emptyValues,
  mode: "onChange",
  reValidateMode: "onChange"
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const deadline = watch("deadline");
  

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  },[defaultValues, reset])

   const [categories, setCategories] = useState([]);


   useEffect(() => {
    const data = localStorage.getItem("categories_V1");

    if (data) {
     setCategories(JSON.parse(data));
    } else {
     setCategories(defaultCategories);
    }
   }, []);

   useEffect(() => {
    if (!onChangeValues) return undefined;

    const subscription = watch((values) => {
      onChangeValues(values);
    });

    return () => subscription.unsubscribe();
   }, [watch, onChangeValues]);
   
   const { t } = useTranslation("goalForm");

  return (
   <Box sx={{ width: "100%", maxWidth: 850 }}>
    <MainCard>

    <Box mb={3}>
     <Box display="flex" justifyContent="space-between" alignItems="center">
       <div>
         <Typography variant="h3" fontWeight="bold" sx={{mb:2}}>
           {formTitle}
         </Typography>
         <Typography variant="subtitle1" color="text.secondary">
           {subTitle}
         </Typography>
       </div>
       <EditIcon fontSize="medium" color="grey" />
  </Box>
</Box>

     <Box sx={{ width: '100%', height: 2, bgcolor: "secondary.main", mb: 3, borderRadius: 2 }} />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{width: "100%",mt: 5 }}
      >

        <Grid container spacing={2.5}>

          <Grid size={{ xs: 12, md: 3}}>
            <TextField
              label={t("fields.title")}
              fullWidth
              {...register("title", { required: t("validation.titleRequired") })}
               error={!!errors.title}
               helperText={errors.title?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Controller
              name="category"
              control={control}
              rules={{ required: t("validation.categoryRequired") }}
              render={({ field, fieldState }) => (
                <TextField select label={t("fields.category")} fullWidth {...field} error={!!fieldState.error} helperText={fieldState.error?.message}>
                  {categories.map((cat) => (
                     <MenuItem key={cat.name}value={cat.name}> {cat.name} </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Controller
              name="type"
              control={control}
              rules={{ required: t("validation.typeRequired")}}
              render={({ field, fieldState }) => (
                <TextField select label={t("fields.type")} fullWidth {...field}error={!!fieldState.error} helperText={fieldState.error?.message}>
                  <MenuItem value="daily">{t("types.daily")}</MenuItem>
                  <MenuItem value="count">{t("types.count")}</MenuItem>
                  <MenuItem value="time">{t("types.time")}</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 3, md: 2}}>
            <TextField
              label={t("fields.target")}
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              {...register("target", { required: t("validation.targetRequired"), min: { value: 1 } })}
              error={!!errors.target}
              helperText={errors.target?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label={t("fields.startDate")}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("startDate", { required: t("validation.startDateRequired"),
                validate: value => {
                  if (deadline && value > deadline ) return t("validation.startAfterDeadline")
                  if(endDate && value > endDate ) return t("validation.startAfterEnd");
                  return true;
                }
              })}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label={t("fields.endDate")}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("endDate", { required: t("validation.endDateRequired"),
                 validate: value => {
                  if (startDate && value < startDate ) return t("validation.endBeforeStart")
                  if(deadline && value < deadline ) return t("validation.endBeforeDeadline");
                  return true;
                }
              })}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />
          </Grid>

          
          <Grid size={{ xs: 12, md: 3 }}>
           <TextField
             label={t("fields.deadline")}
             type="date"
             fullWidth
             InputLabelProps={{ shrink: true }}
             {...register("deadline",{ required: t("validation.deadlineRequired"),
               validate: value => {
                  if (startDate && value < startDate ) return t("validation.deadlineBeforeStart");
                  if(endDate && value > endDate ) return t("validation.deadlineAfterEnd");
                }
             })}
             error={!!errors.deadline}
             helperText={errors.deadline?.message}

           />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ mt: 2, mb: 2 }} />

            <Typography variant="h4"sx={{mb: 1}}>
              {t("sections.customizeTitle")}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t("sections.customizeSubtitle")}
            </Typography>
          </Grid>

         <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label={t("fields.startTime")}
            type="time"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register("startTime")}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
         <TextField
           label={t("fields.endTime")}
           type="time"
           size="small"
           fullWidth
           InputLabelProps={{ shrink: true }}
           {...register("endTime")}
         />
        </Grid>
       
          <Grid size={{ xs: 12, md: 2 }}>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <TextField select label={t("fields.icon")} size="small" fullWidth {...field}>
                  <MenuItem value="target">Target</MenuItem>
                  <MenuItem value="money">Money</MenuItem>
                  <MenuItem value="heart">Heart</MenuItem>
                  <MenuItem value="book">Book</MenuItem>
                  <MenuItem value="star">Star</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Color */}
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              label={t("fields.color")}
              type="color"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("color")}
            />
          </Grid>

          <Grid size={{md: 5  }}>
            <TextField
              label={t("fields.notes")}
              size="small"
              fullWidth
              multiline
              rows={2}
              {...register("notes")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ mt: 2, mb: 2 }} />
           
            <Typography variant="h5" sx={{ mb: 1 }}>
                {t('reminder.title')}
            </Typography>
           
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
               {t('reminder.subtitle')}
            </Typography>
          </Grid>

          <Grid container spacing={2} alignItems="center">
        
            <Grid size={{ xs:12,md:2 }} sx={{mt:-5}}>
            <Controller
            name="reminder.enabled"
            control={control}
            render={({ field }) => (
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <IconButton 
                  onClick={() => field.onChange(!field.value)}
                  color={field.value ? "primary" : "default"}
                >
                  {field.value ? <NotificationsActiveIcon /> : <NotificationsNoneIcon />}
                </IconButton>
              </Stack>
            )}
            />

          </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              type="time"
              label={t('reminder.label')}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!watch("reminder.enabled")}
              {...register("reminder.time", {
                validate: (value) => {
                  if (watch("reminder.enabled") && !value) {
                    return t('reminder.errorRequired');
                  }
                  return true;
                }
              })}
              error={!!errors?.reminder?.time}
              helperText={
                errors?.reminder?.time?.message ||
                (!watch("reminder.enabled")
                  ? t('reminder.helperDisabled')
                  : t('reminder.helperEnabled'))
              }
            />
          </Grid>

     </Grid>

          <Grid size={{ xs: 12 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="flex-end"
              sx={{gap: 1.2}}
            >

          <Button
            type="submit"
            variant="contained"
            startIcon={<AddTaskRoundedIcon />}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={(theme) => ({
              px: 3,
              py: 1.15,
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 700,
              letterSpacing: 0.2,
              gap:1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: theme.shadows[4],
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[8],
                backgroundColor: theme.palette.primary.dark
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            })}
          >
            {submitButtonText}
          </Button>


          <Button variant="outlined" color="secondary" sx={{ gap:1,}}startIcon={<CloseRoundedIcon />} onClick={() => navigate('/goals')}>
           {t("actions.cancel")}
         </Button>


            </Stack>
          </Grid>

        </Grid>

      </Box>
      

    </MainCard>
      </Box>
  );
}
