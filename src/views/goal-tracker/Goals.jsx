import GoalCard from '../../ui-component/goals/GoalCard';
import { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'
import { GoalContext } from '../../contexts/GoalContext';
import { useSearchParams } from "react-router-dom";

import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Grid,
  Chip
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import AddIcon from "@mui/icons-material/Add";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

import ConfirmDelete from '../../ui-component/common/confirmDelete';
import StatsCards from '../../ui-component/common/StatsCards';

import { useTranslation } from "react-i18next";

export default function Goals() {
  const navigate = useNavigate();
  const { goals, addProgress, togglePause, deleteGoal } = useContext(GoalContext);

  const [ filter, setFilter ] = useState("all");
  const [ search, setSearch ] = useState("");
  const [ sort, setSort ] = useState("progress");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category')?.trim() || null;

  const { t } = useTranslation("goals"); 
  const { t: tCommon } = useTranslation("common");

  const filteredGoals = useMemo(() => {
  const query = (search || "").trim().toLowerCase();

  const byFilter = goals.filter((g) => {
    if (filter === "all") return true;
    return g.status === filter;
  });

  const bySearch = query
    ? byFilter.filter((g) =>
        (g.title || "").toLowerCase().includes(query)
      )
    : byFilter;


  const byCategory = categoryFilter
    ? bySearch.filter((g) => g.category === categoryFilter)
    : bySearch;

  const sorted = [...byCategory].sort((a, b) => {
    if (sort === "progress") {
      const pa = (a.progress || 0) / Math.max(a.target || 1, 1);
      const pb = (b.progress || 0) / Math.max(b.target || 1, 1);
      return pb - pa;
    }

    if (sort === "newest") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }

    if (sort === "category") {
      return (a.category || "").localeCompare(b.category || "");
    }

    return 0;
  });

  return sorted;

}, [goals, filter, search, sort, categoryFilter]);


   const totalgoals = goals.length;
   const activegoals =  goals.filter((g) => g.status === "active").length;
   const completedgoals = goals.filter((g) => g.status === "completed").length;

   const totalProgress = goals.reduce((sum, g) => sum + (g.progress || 0), 0);
   const totalTarget = goals.reduce((sum, g) => sum + (g.target || 0), 0);

  const overallProgress = totalTarget > 0 ? Math.round((totalProgress / totalTarget) *100) : 0; 

  const statItems = [
    {
      title: t("stats.total"),
      value: totalgoals,
      icon: <TrendingUpRoundedIcon />,
      color: "primary.main"
    },
    {
      title: t("stats.active"),
      value: activegoals,
      icon: <HourglassBottomRoundedIcon />,
      color: "warning.main"
    },
    {
      title: t("stats.completed"),
      value: completedgoals,
      icon: <HistoryRoundedIcon />,
      color: "success.main"
    },
    {
      title: t("stats.overallProgress"),
      value: `${overallProgress}%`,
      icon: <TrendingUpRoundedIcon />,
      color: "info.main"
    }
  ];

   //handlers
   const goNew = () => navigate("/goals/new");
   const goDashboard = () => navigate("/dashboard");
   const onEdit = (id) => navigate(`/editGoal/${id}`)


  const handleDelete = (goalId) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    setSelectedGoal(goal);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
  if (!selectedGoal) return;
  deleteGoal(selectedGoal.id); // from GoalContext
  setSelectedGoal(null);
  setOpenConfirm(false);
};


  return (
    <Box sx={{ px: { xs: -2, md: 4 }, py: { xs: 3, md: 6 }, minHeight: "80vh" }}>
      <Box sx={{ maxWidth: 1300, mx: "auto" }}>

        <Paper
             elevation={3}
             sx={{
               display: "flex",
               gap: 3,
               alignItems: "center",
               justifyContent: "space-between",
               p: { xs: 2, md: 3 },
               borderRadius: 4,
               mb: 3,
               mt: -4,
               flexWrap: "wrap"
             }}>
              
            <Stack 
              spacing={1}
              sx={{
               flex: 1,      
               minWidth: 250
               }}     
               >
                <Typography variant="h2" component="h1" fontWeight={800} sx={{ letterSpacing: "0.02em", xs: "1.6rem", md: "2.4rem" }}>
                  {t("title")}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ps: 1 }}>
                  {t("subtitle")}
                </Typography>
               </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
               sx={{
                flexShrink: 0,
                flexWrap: "wrap",
                rowGap: 1.5,
                columnGap: 1.5
              }}
             >
             <Button variant="contained" startIcon={<AddIcon />} onClick={goNew} sx={{ px: 3, gap: 0.7 }}>
               {t("newGoal")}
             </Button>

             <Button variant="outlined" startIcon={<ViewModuleIcon />} onClick={goDashboard} sx={{ px: 2,gap: 0.7 }}>
                {t("viewDashboard")}
             </Button>

           </Stack>
       
         </Paper>

     <StatsCards items={statItems} />

     {/* //filters + search */}
   <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, mb: 3 }}>
    <Stack spacing={2}>

    <Box sx={{ mb: 2 }}>
       <Typography variant="h3" fontWeight={700}  sx={{ letterSpacing: "0.04em" }}>
         {t("search.title")}
       </Typography>
   
    </Box>

    <Stack direction={{ xs: "column", md: "row" }}spacing={2} sx={{ mt: 2, flexWrap: "wrap", gap: 4 }}>

      <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
       <TextField
         placeholder=  {t("search.placeholder")}
         size="medium"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         fullWidth
         sx={{
         "& .MuiOutlinedInput-root": {
          borderRadius: 3
          }
         }}
         InputProps={{
           startAdornment: <SearchIcon color="action" sx={{ mr: 1 }}  />
        }}
       />
      </Box>
       
      {/* sortselect */}
      <Box sx={{ width: { xs: "100%", md: 220, flexShrink: 0 } }}>
        <FormControl fullWidth size="small">
          <InputLabel id="sort-by-label"> {t("sort.label")} </InputLabel>

          <Select
            labelId="sort-by-label"
            value={sort}
            label= {t("sort.sort")}
            onChange={(e) => setSort(e.target.value)}
          >
             <MenuItem value="progress"> {t("sort.progress")} </MenuItem>
             <MenuItem value="newest"> {t("sort.newest")} </MenuItem>
             <MenuItem value="category"> {t("sort.category")} </MenuItem>
           </Select>
         </FormControl>
       </Box>
      </Stack>

      <Tabs
        value={filter}
        onChange={(e, v) => setFilter(v)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label={ tCommon("status.all")} value="all" />
        <Tab label={tCommon("status.active")} value="active" />
        <Tab label={tCommon("status.paused")} value="paused" />
        <Tab label={tCommon("status.completed")} value="completed" />
      </Tabs>

      </Stack>
     </Paper>

     <Box>

        {filteredGoals.length === 0 ? (
            <Box
             sx={{
               textAlign: "center",
               py: 8,
               border: "2px dashed",
               borderColor: "divider",
               borderRadius: 2,
               bgcolor: "background.default",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               gap: 1.5
             }}
             >
               <InfoOutlinedIcon sx={{ fontSize: 48, color: "text.disabled" }} />
          
             <Typography variant="h4" color="text.secondary"> {t("empty.title")} </Typography>
             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
               {t("empty.subtitle")}
             </Typography> 
             </Box>
        ):(
         <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4 }}>
          
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
             <Chip
               label={t("count",{count: filteredGoals.length})}
               sx={{
                 color: "#fff",
                 border: '1px solid #1976d2',
                 bgcolor: "#4c9ae7",
                 fontWeight: 600,
                 borderRadius: "10"
               }}
             />
          </Box>

            {categoryFilter && (
            <Typography variant="h4" fontWeight={600} sx={{ mb: 4 }}>
               {t("categoryTitle",{category: categoryFilter } )}
            </Typography>
              )}
          <Grid container spacing={3}> 
         
           {filteredGoals.map((g)=> (
             <Grid key={g.id} item xs={{ xs: 12, sm: 6, md: 4 }}>

               <GoalCard
                key={g.id}
                goal={g}
                addProgress={() => addProgress(g.id, 1)}
                togglePause={() => togglePause(g.id)}
                onDelete={handleDelete} 
              />

             </Grid>
           ))}
          </Grid>
        </Paper>
        )}
        {selectedGoal && (
         <ConfirmDelete
           open={openConfirm}
           title={t("delete.title",{ title: selectedGoal.title })}
           message={t("delete.message")}
           onClose={() => setOpenConfirm(false)}
           onConfirm={confirmDelete}
         />
       )}

     </Box>
     
      </Box>
     </Box>

  );
}
