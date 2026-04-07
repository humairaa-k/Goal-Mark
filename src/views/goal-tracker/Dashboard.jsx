import { useContext, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


import DashboardBanner from '../../ui-component/dashboard/dashboardBanner';
import DashboardStatCards from '../../ui-component/dashboard/DashboardStatCards';
import ConfirmDelete from '../../ui-component/common/confirmDelete';
import { GoalContext } from '../../contexts/GoalContext';
import GoalList from '../../ui-component/goals/GoalList';

import MiniCalendar from '../../ui-component/dashboard/MiniCalender';
import StreakCard from '../../ui-component/dashboard/StreakCard';
import ArchiveGoalCard from '../../ui-component/archive/archiveGoalCard';

import { useTranslation } from "react-i18next";


export default function Dashboard() {
  const navigate = useNavigate();

  const { goals, addProgress, togglePause,archivedGoals, stats, deleteGoal } = useContext(GoalContext);
  

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const data = useMemo(() => {
    const allGoals = [...goals, ...archivedGoals];
    const totalTarget = allGoals.reduce((sum, goal) => sum + Math.max(goal?.target || 0, 0), 0);

    const totalProgress = allGoals.reduce((sum, goal) => {
      const target = Math.max(goal?.target || 0, 0);
      const progress = goal?.status === 'completed' ? target : Math.min(goal?.progress || 0, target);
      return sum + progress;
    }, 0);

    const percent = totalTarget > 0 ? Math.round((totalProgress / totalTarget) * 100) : 0;
  
    const activeGoals = goals.filter( (goal) => goal.status !== 'completed');
    const level = Math.max(1, Math.floor(stats.xpTotal / 250) + 1);

    const completedGoals = [ ...archivedGoals]
      .filter((goal) => goal.status === 'completed' && !goal.deleted && !goal.deletedAt) // only completed, non-deleted goals
      .sort((a, b) => new Date(b.completedAt || b.createdAt || 0) -
                      new Date(a.completedAt || a.createdAt || 0))
      .slice(0, 3);

    return {
      percent,
      completedCount: stats.completeCount,
      streak: stats.streak,
      xpTotal: stats.xpTotal,
      level,
      activeGoals,
      completedGoals
    };
  }, [archivedGoals, goals, stats]);

  const handleDelete = (goalId) => {
    const goal = goals.find((item) => item.id === goalId);
    if (!goal) return;

    setSelectedGoal(goal);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (!selectedGoal) return;

    deleteGoal(selectedGoal.id);
    setSelectedGoal(null);
    setOpenConfirm(false);
  };

  const { t } = useTranslation("dashboard");

  const statItems = [
    {
      title: t('stats.overallCompletion'),
      value: `${data.percent}%`,
      subtitle: `${data.percent}% complete`,
      icon: <TrendingUpRoundedIcon />,
      color: '#2563eb'
    },
    {
      title: t('stats.completedGoals'),
      value: data.completedCount,
      subtitle: t('stats.goalsFinished'),
      icon: <CheckCircleRoundedIcon />,
      color: '#16a34a'
    },
    {
      title: t('stats.currentStreak'),
      value: data.streak,
      subtitle: t('stats.daysInARow'),
      icon: <LocalFireDepartmentRoundedIcon />,
      color: '#ea580c'
    },
    {
      title: t('stats.xpAndLevel'),
      value: `${data.xpTotal} XP`,
      subtitle: `Level ${data.level}`,
      icon: <FlashOnRoundedIcon />,
      color: '#7c3aed'
    }
  ];


  return (
    <Box sx={{ px: { xs: 0, md: 4 }, py: { xs: 3, md: 6 }, minHeight: '80vh' }}>
      <Box sx={{ maxWidth: 1300, mx: 'auto' }}>

        <DashboardBanner />
        <DashboardStatCards items={statItems} />

        {/* main grid */}
        <Grid container spacing={3} sx={{ mt: 3 }}>

          {/* left grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={1.5}>
                <Box>
                  <Typography variant="h4" fontWeight={800}>
                    {t("activeGoals.title")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                    {t("activeGoals.description")}
                  </Typography>
                </Box>

                <Chip label={ t('activeGoals.goalsLabel',{count: data.activeGoals.length }) } color="#fff" sx={{ borderRadius: 3, fontWeight: 700 }} />
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              {data.activeGoals.length === 0 ? (
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: 'center',
                    border: '1px dashed',
                    borderColor: 'divider',
                    bgcolor: 'background.default',
                    height: 200
                  }}
                >
                  <InfoOutlinedIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                  <Typography variant="h5" fontWeight={700}>
                   {t("activeGoals.noGoalsTitle")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                     {t("activeGoals.noGoalsDesc")}
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={3} sx={{ mt: 3 }}>


                  <Grid container spacing={1.5}>
                    <GoalList
                      goals={data.activeGoals}
                      addProgress={addProgress}
                      togglePause={togglePause}
                      onDelete={handleDelete}
                     />
                  </Grid>

                </Grid>
              )}
            </Paper>

          </Grid>

          {/* right grid */}

          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={2}>
              <StreakCard streak={data.streak} />
              <MiniCalendar goals={goals} />
            </Stack>
          </Grid>

        </Grid>

       
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={1.5}>
            <Box>
              <Typography variant="h4" fontWeight={800}>
               {t("completedGoals.title")}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
               {t("completedGoals.description")}
              </Typography>
            </Box>

            <Button component={RouterLink} to="/archive" variant="outlined" endIcon={<ArrowOutwardIcon />} sx={{ borderRadius: 3 }}>
               {t("completedGoals.openArchive")}
            </Button>
          </Stack>

          <Divider sx={{ my: 2.5 }} />
          {data.completedGoals.length === 0 ? (
            <Box
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: 'center',
                border: '1px dashed',
                borderColor: 'divider',
                bgcolor: 'background.default'
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
              <Typography variant="h5" fontWeight={700}>
                {t("completedGoals.noGoalsTitle")}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
               {t("completedGoals.noGoalsDesc")}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {data.completedGoals.map((goal) => (
                <Grid item xs={12} sm={6} md={4} key={goal.id}>
                  <ArchiveGoalCard
                    goal={goal}
                    hideRestore={true}
                    showDelete={false}
                  />
                </Grid>
              ))}
            </Grid>
          )}

        </Paper>


        {selectedGoal && (
          <ConfirmDelete
            open={openConfirm}
            title={`Delete "${selectedGoal.title}"?`}
            message="This goal will be moved out of your active list."
            onClose={() => setOpenConfirm(false)}
            onConfirm={confirmDelete}
          />
        )}
      </Box>
    </Box>
  );
}
