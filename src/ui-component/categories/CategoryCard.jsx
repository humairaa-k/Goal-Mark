import { Box, Stack, Typography, Button, IconButton, Avatar, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ProgressBar from '../../ui-component/common/ProgressBar';
import IconFor from '../../utils/goal-tracker/icons';

import { useTranslation } from "react-i18next";

export default function CategoryCard({ category, goalsCount = 0, completedCount = 0, progressPercent = 0, iconComponent, onView, onEdit, onDelete }) {
  const { t } = useTranslation("categories");

  return (
    <Box
      sx={{
        p: 2.25,
        borderRadius: 3,
        bgcolor: 'background.paper',
        boxShadow: 1,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: '100%',
        transition: 'all .18s ease',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1.5}>
        <Stack direction="row" alignItems="center" sx={{ gap: 1.5, minWidth: 0, flex: 1 }}>
          <Avatar sx={{ bgcolor: category.color || '#1976d2', width: 42, height: 42 }}>
            {IconFor(category.icon)}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
              {category.name}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.35 }}>
              {t("card.goals", { count: goalsCount })} • {t("card.completed", { count: completedCount })}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ gap: 0.75, flexShrink: 0 }}>
          <Tooltip title={t("card.tooltips.edit")}>
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("card.tooltips.delete")}>
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', color: 'error.main' }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: 0.5,
          p: 1.25,
          borderRadius: 2
        }}
      >
        <ProgressBar progress={(progressPercent / 100) * (category.target || 1)} target={category.target || 1} />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
          {t("card.progress", { value: progressPercent })}
        </Typography>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onView}
            sx={{ textTransform: "none", borderRadius: 2.5, fontWeight: 600, px: 1.5 }}
          >
            {t("card.viewGoals")}
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={onEdit}
            sx={{ textTransform: "none", borderRadius: 2.5, fontWeight: 600, px: 1.5 }}
          >
            {t("card.edit")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
