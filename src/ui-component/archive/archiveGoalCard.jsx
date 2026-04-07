import { Paper, Stack, Typography, Button, Box, Chip } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import RestoreIcon from "@mui/icons-material/Restore";

import { useTranslation } from "react-i18next";

export default function ArchiveGoalCard({ goal, onRestore, onDelete, showDelete, hideRestore }) {
  const { t, i18n } = useTranslation(["archive", "common"]);

  const chipKey = goal.deletedAt || goal.deleted
    ? "deleted"
    : goal.completedAt || goal.status === "completed"
    ? "completed"
    : goal.status;

  const chipColor =
    chipKey === "deleted"
      ? "error"
      : chipKey === "completed"
      ? "success"
      : chipKey === "paused"
      ? "warning"
      : "primary";

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2.25,
        borderRadius: 4,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: 1,
        transition: "all .18s ease",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)"
        }
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mt: 0.25,
            lineHeight: 1.3,
            flex: 1,
            minWidth: 0
          }}
        >
          {goal.title}
        </Typography>

        <Chip
          label={t(`common:status.${chipKey}`)}
          size="small"
          sx={{
            fontWeight: 600,
            bgcolor: `${chipColor}.light`,
            color: `${chipColor}.dark`,
            border: "1px solid",
            borderColor: `${chipColor}.main`,
            textTransform: "capitalize"
          }}
        />
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
       <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>

        <Chip
          label={t("card.categoryValue", { category: goal.category })}
          size="small"
          variant="outlined"
          sx={{ bgcolor: "action.hover", borderColor: "divider" }}
        />
        <Chip
          label={t("card.typeValue", { type: goal.type })}
          size="small"
          variant="outlined"
          sx={{ bgcolor: "action.hover", borderColor: "divider", textTransform: "capitalize" }}
        />
        </Box>
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

        {goal.completedAt && (
          <Typography variant="body2" color="text.secondary">
            {t("card.completedAt", {
              date: new Date(goal.completedAt).toLocaleDateString(i18n.language)
            })}
          </Typography>
        )}

        {goal.deletedAt && (
          <Typography variant="body2" color="text.secondary">
            {t("card.deletedAt", {
              date: new Date(goal.deletedAt).toLocaleDateString(i18n.language)
            })}
          </Typography>
        )}
      </Box>
        
      <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>

       {!hideRestore && 
           <Button
          variant="outlined"
          startIcon={<RestoreIcon />}
          onClick={() => onRestore(goal.id)}
          sx={{
               borderRadius: 4,
               textTransform: "none",
               fontWeight: 600,
               gap: 0.6,
               "& .MuiButton-startIcon": {
                 margin: 0
               }
             }}
         >
          {t("actions.restore")}
        </Button>
       }
      
        {showDelete && (
           <Button
             variant="outlined"
             color="error"
             onClick={() => onDelete(goal.id)}
             startIcon={<DeleteOutlineIcon />}
             sx={{
               borderRadius: 4,
               textTransform: "none",
               fontWeight: 600,
               gap: 0.6,
               "& .MuiButton-startIcon": {
                 margin: 0
               }
             }}
            >
            {t("actions.delete")}
         </Button>

        )}
      </Stack>
    </Paper>
  );
}
