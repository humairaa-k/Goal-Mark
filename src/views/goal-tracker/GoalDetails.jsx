import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import ProgressBar from '../../ui-component/common/ProgressBar';
import StatsCards from '../../ui-component/common/StatsCards';
import { GoalContext } from '../../contexts/GoalContext';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ConfirmDelete from '../../ui-component/common/confirmDelete';

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';

import { useTranslation } from "react-i18next";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, addProgress, togglePause, deleteGoal } = useContext(GoalContext);
  
  const goal = goals.find((g) => g.id === Number(id));
  const [openConfirm, setOpenConfirm] = useState(false);

  const { t } = useTranslation("goaldetails");
  const { t: tCommon } = useTranslation("common");

  const handleDelete = () => setOpenConfirm(true);

  const confirmDelete = () => {
    deleteGoal(goal.id);
    setOpenConfirm(false);
    navigate('/goals');
  };

  const goGoals = () => navigate("/goals");
  const editGoals = () => navigate(`/editGoal/${goal.id}`);

   const statItems = [
    {
    title: t("stats.progress"),
    value: `${goal.progress}/${goal.target}`,
    icon: <TrendingUpRoundedIcon sx={{  }} />,
    color: "primary.main"
    },
    {
      title: t("stats.remaining"),
      value: Math.max(goal.target - goal.progress, 0),
      icon: <HourglassBottomRoundedIcon sx={{ }} />,
      color: "warning.main" 
    },
    {
      title: t("stats.logs"),
      value: (goal.logs || []).length,
      icon: <HistoryRoundedIcon sx={{  }} />,
      color: "info.main"
    }
  ];

  
return (
 <>
 {!goal ? (
      <Box
           sx={{
             minHeight: "80vh",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             px: 2,
           }}>
           <Box
             sx={{
               maxWidth: 950,
               width: "100%",
               textAlign: "center",
               p: 4,
               borderRadius: 4,
               mt: -10,
               bgcolor: "background.paper",
               border: "2px dashed",
               borderColor: "divider",
               boxShadow: 3,
             }}
           >
         
             <Box
               sx={{
                 width: 72,
                 height: 72,
                 mx: "auto",
                 mb: 2,
                 borderRadius: "50%",
                 bgcolor: "error.lighter",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center"
               }}
             >
               <FolderOpenRoundedIcon
                 sx={{ fontSize: 50, color: "error.main" }}
               />
             </Box>
     
             {/* title */}
             <Typography variant="h2" fontWeight={800} sx={{ mb: 2 }}>
               {tCommon("notFound.title")}
             </Typography>
     
             <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
               {tCommon("notFound.subtitle")}
             </Typography>
     
             {/* btn */}
             <Button
               variant="contained"
               onClick={() => navigate("/goals")}
               sx={{
                 borderRadius: 3,
                 py: 1.2,
                 px: 6,
                 fontWeight: 700,
                 textTransform: "none",
                 boxShadow: 2,
                 "&:hover": { boxShadow: 4 }
               }}
             >
               {tCommon("notFound.back")}
             </Button>
           </Box>
         </Box>

    ):(
   <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, sm: 6, md: 8 }, bgcolor: "background.default", minHeight: "80vh", borderRadius: 4 }}>
     <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
      {/* heading */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
          }}
        >
        <Box sx={{ width: { xs: "100%", md: "auto" } }}>
         <Typography variant={{ xs: "h4", sm: "h3", md: "h2" }} component="h1" fontWeight={900} sx={{ mb: 2 }}>
            {goal.title}
          </Typography>

          {/* chips */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap", gap: 1 }}>
            <Chip label={goal.category} variant="outlined" size="medium" />
            <Chip label={goal.type === "daily" ? t("types.daily") : goal.type === "count" ? t("types.count") : t("types.time")} variant="outlined" size="medium" />
            <Chip label={t("labels.target", {value: goal.target})} color="primary" size="medium" />
            <Chip
            label={tCommon(`status.${goal.status}`)}
            color={goal.status === "completed" ? "success" : goal.status === "paused" ? "warning" : "primary"}
            sx={{ fontWeight: 700, px: 1, py: 0.5}}/>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {t("header.description")}
          </Typography>
        </Box>

        {/* btns */}
       <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          mt={{ xs: 2, md: 0 }}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent={{ sm: "flex-end" }}
        >
         <Button
           variant="text"
           startIcon={<ArrowBackRoundedIcon />}
           onClick={goGoals}
           sx={{ borderRadius: 3, gap: 2,border: 1}}
           >
           {t("header.back")}
         </Button>
        
         <Button
           variant="contained"
           startIcon={<EditRoundedIcon />}
           onClick={editGoals}
           sx={{ borderRadius: 3, gap: 2}}>
           {t("header.edit")}
         </Button>
       
        </Stack>
      </Box>

    {/* stats */}
    
     <StatsCards items={statItems} />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 3, mb: 4 }}>

        <Box sx={{ bgcolor: "background.paper", borderRadius: 3, p: 4, boxShadow: 1 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            {t("overview.title")}
          </Typography>

          <Box sx={{ display: "flex",flexWrap: "wrap" , alignItems: "center", gap: 3, mb: 3}}>
            <Box>
              <Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1 }}>
                {Math.min(100, Math.round((goal.progress / (goal.target || 1)) * 100))}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mt:1.5}}>
                  {t("overview.progressText", { progress: goal.progress, target: goal.target,
                   unit: goal.type === "time"
                     ? t("units.time")
                     : t("units.count")
                 })}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 220 }}>
              {/*prog bar */}
              <ProgressBar progress={goal.progress} target={goal.target} color={goal.color} />
            </Box>
          </Box>

          {/* small stats*/}
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <Box sx={{ bgcolor: "rgba(0,0,0,0.03)", px: 2, py: 1.2, borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">{t("meta.created")}</Typography>
              <Typography variant="subtitle2">{new Date(goal.createdAt).toLocaleDateString()}</Typography>
            </Box>

            <Box sx={{ bgcolor: "rgba(0,0,0,0.03)", px: 2, py: 1.2, borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">{t("meta.updated")}</Typography>
              <Typography variant="subtitle2">{new Date(goal.updatedAt).toLocaleDateString()}</Typography>
            </Box>

            <Box sx={{ bgcolor: "rgba(0,0,0,0.03)", px: 2, py: 1.2, borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">{t("meta.logs")}</Typography>
              <Typography variant="subtitle2">{(goal.logs || []).length}</Typography>
            </Box>
          </Stack>
        </Box>

        {/* right grid */}
        <Stack spacing={2}>

          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2.5, boxShadow: 0.5 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}> {t("sections.dates")} </Typography>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">{t("dates.start")}</Typography>
              <Typography variant="body2">{goal.startDate || "—"}</Typography>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>{t("dates.end")}</Typography>
              <Typography variant="body2">{goal.endDate || "—"}</Typography>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>{t("dates.deadline")}</Typography>
              <Typography variant="body2">{goal.deadline || "—"}</Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">{t("dates.startTime")}</Typography>
                  <Typography variant="body2">{goal.startTime || "—"}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">{t("dates.endTime")}</Typography>
                  <Typography variant="body2">{goal.endTime || "—"}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2.5, boxShadow: 0.5 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>{t("sections.appearance")}</Typography>
            <Stack direction="row" spacing={2} alignItems="center"sx={{ gap: 2}}>
              <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: goal.color || "#1976d2" }} />
              <Box>
                <Typography variant="caption" color="text.secondary">{t("appearance.icon")}</Typography>
                <Typography variant="body2" sx={{ textTransform: "capitalize" }}>{goal.icon || "—"}</Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2.5, boxShadow: 0.5 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}> {t("sections.notes")} </Typography>
            <Typography variant="body2" color="text.secondary">
              {goal.notes || t("notes.empty") }
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/*btn box */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 2 }}>
  
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{
          px: 2,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 700,
          boxShadow: 3,
           gap: 1, 
          textTransform: "none",
          '&:hover': { boxShadow: 6 }
        }}
        disabled={goal.status === "completed" || goal.status === "paused"}
        onClick={() => addProgress(goal.id, 1)} >
          {t("actions.progress")}
        </Button>
      
        <Button
          variant="outlined"
          color="warning"
          startIcon={goal.status === "paused" ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
          sx={{ px: 1.5, borderRadius: 2, fontWeight: 600, textTransform: "none", gap: 1  }}
          disabled={goal.status === "completed"}
          onClick={() => togglePause(goal.id)}
        >
          {goal.status === "paused" ? t("actions.resume") : t("actions.pause")}
        </Button>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{ px: 1.5, borderRadius: 2, fontWeight: 600, textTransform: "none", gap: 1 }}
          onClick={handleDelete} >
          {t("actions.delete")}
        </Button>
      </Box>

      <ConfirmDelete 
      open={openConfirm} 
      title={t("delete.title")}
      message= {t("delete.message")}
      onClose={() => setOpenConfirm(false)} 
      onConfirm={confirmDelete} />
    </Box>
  </Box>
 )}
 </>
);
}


