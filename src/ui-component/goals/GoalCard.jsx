import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { GoalContext } from '../../contexts/GoalContext';
import ProgressBar from '../common/ProgressBar';
import ConfirmDelete from '../common/confirmDelete';
import IconFor from '../../utils/goal-tracker/icons';

import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Card } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslation } from "react-i18next";


export default function GoalCard({ goal, onDelete }) {
  const theme = useTheme();
  
  const { t } = useTranslation("goalCard");

  const { addProgress, togglePause } = useContext(GoalContext);

  const color = goal?.color || "#1976d2";
  const percentage = Math.min(100, Math.round(((goal?.progress || 0) / Math.max(goal?.target || 1, 1)) * 100));

   return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        p: 2.5,
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
        overflow: "hidden",
        transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, transparent)`
        },
        "&:hover": {
          boxShadow: "0 18px 42px rgba(15, 23, 42, 0.14)",
          transform: "translateY(-4px)",
          borderColor: "action.selected"
        }
      }}
    >
      {/* header*/}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
        <Box sx={{ display: "flex", gap: 1.25, alignItems: "center", minWidth: 0, flex: 1 }}>
          <Avatar
            sx={{
              bgcolor: color,
              width: 48,
              height: 48,
              color: "#fff",
              boxShadow: `0 10px 22px ${color}33`
            }}
          >
            {IconFor(goal.icon)}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              component={RouterLink}
              to={`/goals/${goal.id}`}
              variant="h5"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: 800,
                display: "block",
                lineHeight: 1.15,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                "&:hover": {
                  color: "primary.main"
                }
              }}
            >
              {goal.title}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 0.45, letterSpacing: "0.03em" }}
            >
              {t("subtitle")}
            </Typography>
          </Box>
        </Box>

        <Chip
          label={t(`status.${goal.status}`)}
          size="small"
          sx={{
            fontWeight: 700,
            px: 1,
            height: 25,
            borderRadius: 3,
            bgcolor:
              goal.status === "completed"
                ? "success.main"
                : goal.status === "paused"
                ? "warning.main"
                : "primary.main",
            color: "primary.contrastText",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)"
          }}
        />
      </Stack>

      {/* chips row */}
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Chip
          label={goal.category}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 3,
            bgcolor: "action.hover",
            borderColor: "transparent"
          }}
        />
        <Chip
          label={t(`type.${goal.type}`)}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 3,
            bgcolor: "action.hover",
            borderColor: "transparent"
          }}
        />
        <Chip
          label={t("target", { target: goal.target })}
          size="small"
          color="primary"
          sx={{ borderRadius: 3, fontWeight: 700 }}
        />
      </Stack>

      <Divider sx={{ borderColor: "divider", opacity: 0.7 }} />

      {/* more details */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          bgcolor: "action.hover",
          border: "1px solid",
          borderColor: "divider"
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.02em" }}>
              {t("progress", {
                progress: goal.progress || 0,
                target: goal.target || 0,
                unit: goal.type === "time" ? "hrs" : goal.type === "count" ? "count" : ""
              })}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {percentage}%
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 10,
            borderRadius: 999,
            bgcolor: "background.paper",
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
              background: `linear-gradient(90deg, ${color}, ${color}cc)`
            }
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1.1 }}>
          {t("complete", { percent: percentage })}
        </Typography>
      </Box>

      {/* stats row */}
        <Box sx={{ mt: 0.25, display: "grid", 
         gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 1 }}>
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)",
            px: 1.25,
            py: 1.15,
            borderRadius: 2,
            minWidth: 0,
            textAlign: "left",
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {t("start")}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.4, lineHeight: 1.4 }}>
            {goal.startDate || "-"}{" "}
            {goal.startTime ? (
              <>
                <AccessTimeIcon sx={{ fontSize: 12, ml: 0.5, verticalAlign: "middle" }} />
                <span style={{ marginInlineStart: 4 }}>{goal.startTime}</span>
              </>
            ) : null}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "rgba(15,23,42,0.02)" : "rgba(255,255,255,0.02)",
            px: 1.25,
            py: 1.15,
            borderRadius: 2,
            minWidth: 0,
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {t("end")}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.4, lineHeight: 1.4 }}>
            {goal.endDate || "-"}{" "}
            {goal.endTime ? (
              <>
                <AccessTimeIcon sx={{ fontSize: 12, ml: 0.5, verticalAlign: "middle" }} />
                <span style={{ marginInlineStart: 4 }}>{goal.endTime}</span>
              </>
            ) : null}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)",
            px: 1.25,
            py: 1.15,
            borderRadius: 2,
            minWidth: 0,
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {t("deadline")}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.4, lineHeight: 1.4 }}>
            {goal.deadline || "-"}
          </Typography>
        </Box>
      </Box>

       <Stack direction="row" spacing={1} sx={{ mt: 0.25, px: 1.25, py: 1, borderRadius: 2.5, bgcolor: "action.hover", alignItems: "center" }} flexWrap="wrap">

        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.03em" }}>
          {t("logs")}:
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 800 }}>
          {(goal.logs || []).length}
        </Typography>
      </Stack>

      {/*actions*/}
      <Stack spacing={1}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          component={RouterLink}
          to={`/goals/${goal.id}`}
          sx={{
            fontWeight: 800,
            borderRadius: 3,
            letterSpacing: "0.02em",
            py: 0.9,
            textTransform: "none",
            gap: 0.75,
            borderColor: "transparent",
            color: "secondary.main",
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            "&:hover": {
              backgroundColor: alpha(theme.palette.secondary.main, 0.18),
              borderColor: "transparent"
            },
            "& .MuiButton-endIcon": {
              margin: 0
            }
          }}
        >
          {t("actions.details")}
        </Button>
        
        
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ gap: 1, width: "100%" }}
        >
          <Tooltip title={t("actions.progress")}>
            <span>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => typeof addProgress === "function" && addProgress(goal.id, 1)}
                disabled={goal.status === "completed" || goal.status === "paused"}
                sx={{
                  flex: 1,
                  fontWeight: 800,
                  width: "100%", 
                  letterSpacing: "0.01em",
                  borderRadius: 2.5,
                  py: 0.75,
                  fontSize: "0.75rem",
                  textTransform: "none",
                  gap: 0.6,
                  "& .MuiButton-startIcon": {
                    margin: 0
                  }
                }}
              >
                {t("actions.progress")}
              </Button>
            </span>
          </Tooltip>

          <Tooltip title={goal.status === "paused" ? t("actions.resume") : t("actions.pause")}>
            <span>
              <Button
                variant="outlined"
                color="warning"
                startIcon={goal.status === "paused" ? <PlayArrowIcon /> : <PauseIcon />}
                onClick={() => typeof togglePause === "function" && togglePause(goal.id)}
                disabled={goal.status === "completed"}
                sx={{
                flex: 1,
                fontWeight: 800,
                 width: "100%", 
                letterSpacing: "0.01em",
                borderRadius: 2.5,
                py: 0.75,
                fontSize: "0.75rem",
                textTransform: "none",
                gap: 0.6,
                  "& .MuiButton-startIcon": {
                    margin: 0
                  }
                }}
              >
                {goal.status === "paused" ? t("actions.resume") : t("actions.pause")}
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => onDelete?.(goal.id)}
              sx={{
                flex: 1,
                fontWeight: 800,
                letterSpacing: "0.01em",
                borderRadius: 2.5,
                py: 0.75,
                fontSize: "0.75rem",
                textTransform: "none",
                gap: 0.6,
                "& .MuiButton-startIcon": {
                  margin: 0
                }
              }}
            >
              {t("actions.delete")}
            </Button>
          </Tooltip>

        </Stack>
      </Stack>
    </Card>
  );
}


//component={RouterLink}: Make the btn behave like a router link
