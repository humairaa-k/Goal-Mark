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

import AddIcon from "@mui/icons-material/Add";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SearchIcon from "@mui/icons-material/Search";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';     
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined'; 
import { useState, useContext, useMemo } from "react";
import { GoalContext } from "../../contexts/GoalContext";
import ArchiveGoalCard from "../../ui-component/archive/archiveGoalCard";
import ConfirmDelete from "../../ui-component/common/confirmDelete";
import StatsCards from '../../ui-component/common/StatsCards';

import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import { useTranslation } from "react-i18next";



export default function Archive() {

    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState('date');

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);

   const { archivedGoals, deletedGoals, restoreGoal, permanentDeleteGoal, clearArchive, restoredCount } = useContext(GoalContext);

   const { t } = useTranslation("archive");
   const { t: tCommon } = useTranslation("common");

   const archivedCount = archivedGoals.length;
   const deletedCount = deletedGoals.length;

   const lastCompleted = archivedGoals.length ? [...archivedGoals].sort(
    (a,b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt))[0] : null;

   const statItems = [
    {
      title: t("stats.archived"),
      value: archivedCount,
      icon: <ArchiveOutlinedIcon />,
      color: "primary.main"
    },
    {
      title: t("stats.deleted"),
      value: deletedCount,
      icon: <DeleteOutlineIcon />,
      color: "warning.main"
    },
    {
      title: t("stats.lastCompleted"),
      value: lastCompleted ? lastCompleted.title : "-",
      icon: <ArchiveOutlinedIcon />,
      color: "success.main"
    },
    {
      title: t("stats.restored"),
      value: restoredCount,
      icon: <RestoreOutlinedIcon />,
      color: "info.main"
    }
   ];


   const filterArchiveGoals = useMemo(() => {
     let data = [];

     if(filter === "archived") {
      data = [...archivedGoals];

     }else if(filter === "deleted"){
      data = [...deletedGoals];

     }else {
      data = [...archivedGoals, ...deletedGoals];
     }

     if(search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(g => (g.title || "").toLowerCase().includes(query));
     }

       if (sort === "newest") {
       data.sort((a, b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt));
     } else if (sort === "oldest") {
       data.sort((a, b) => new Date(a.completedAt || a.createdAt) - new Date(b.completedAt || b.createdAt));
     }

     return data;
   }, [archivedGoals, deletedGoals, filter, search, sort]);


   const confirmDelete = () => {
     if (!selectedGoal) return;
     permanentDeleteGoal(selectedGoal.id);
     setSelectedGoal(null);
     setOpenConfirm(false);
   }

   const handleRestoreAll = () => {
    const allGoals = [...archivedGoals, ...deletedGoals];

    allGoals.forEach((g) => {
      restoreGoal(g.id);
    });
   }



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
                   p: { xs: 2, md: 4 },
                   borderRadius: 4,
                   mb: 3,
                   mt: -4,
                   flexWrap: "wrap",
                   bgcolor: 'background.paper'
                 }}>
                 <Stack direction="column" spacing={1.5} alignItems="left" sx={{ minWidth: 0 }}>
                    <Typography variant="h1" component="div" fontWeight={800} sx={{ letterSpacing: "0.02em"}}>
                      {t("title")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml:1 }}>
                      {t("subtitle")}
                    </Typography>
                 </Stack>

               <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
                 <Button variant="outlined" startIcon={<RestoreIcon />} sx={{ px: 3, gap: 0.7 }}
                  onClick={handleRestoreAll}>
                    {t("actions.restoreAll")}
                 </Button>
    
                 <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} sx={{ px: 2, gap: 0.7 }}
                  onClick={clearArchive}>
                   {t("actions.clearArchive")}
                 </Button>
               </Stack>
             </Paper>

             <StatsCards items={statItems} />

             {/* //filters + search */}
             <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, mb: 3 }}>
                 <Stack spacing={2}>
              
                  <Box sx={{ mb: 2 }}>
                     <Typography variant="h5" fontWeight={700}  sx={{ letterSpacing: "0.04em" }}>
                       {t("search.title")}
                     </Typography>
                 
                  </Box>
              
                  <Stack direction={{ xs: "column", md: "row" }}spacing={2} sx={{ mt: 2, flexWrap: "wrap", gap: 4 }}>

                    <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                     <TextField
                       placeholder= {t("search.placeholder")}
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
                         startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
                      }}
                     />
                    </Box>
                     
                    {/* sortselect */}
                    <Box sx={{ width: { xs: "100%", md: 220, flexShrink: 0 } }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="sort-by-label">{t("sort.label")}</InputLabel>
              
                        <Select
                          labelId="sort-by-label"
                          value={sort}
                          label={t("sort.label")}
                          onChange={(e) => setSort(e.target.value)}
                        >
                           <MenuItem value="newest">{t("sort.newest")}</MenuItem>
                           <MenuItem value="oldest">{t("sort.oldest")}</MenuItem>

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
                      <Tab label={tCommon("status.all")} value="all" />
                      <Tab label={tCommon("status.archived")} value="archived" />
                      <Tab label={tCommon("status.deleted")} value="deleted" />
                    </Tabs>
              
                    </Stack>
                </Paper>
    
              {(filterArchiveGoals || []).length === 0 ? (

                 <Box
                    sx={{
                        textAlign: "center",
                        py: 10,
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
                      <FolderOpenRoundedIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
                      <Typography variant="h6" color="text.secondary">
                        {t("empty.title")}
                     </Typography>
                   </Box>
                  ) : (
                   <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
                     <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                       <Chip
                         label={t("count", { count: filterArchiveGoals.length })}
                         sx={{
                           color: "#fff",
                           border: '1px solid #1976d2',
                           bgcolor: "#4c9ae7",
                           fontWeight: 600,
                           borderRadius: "10"
                         }}
                       />
                     </Box>
                  
                     <Grid container spacing={3}>
                       {filterArchiveGoals.map(goal => (
                         <Grid item xs={12} sm={6} md={4} key={goal.id}>
                           <ArchiveGoalCard
                             goal={goal}
                             onRestore={restoreGoal}
                             onDelete={()=> {
                             setSelectedGoal(goal);
                             setOpenConfirm(true);
                             }}
                             showDelete={true}
                           />
                         </Grid>
                       ))}
                     </Grid>
    
                   {selectedGoal &&
                    <ConfirmDelete
                    open={openConfirm}
                    title={t("delete.title",{ title: selectedGoal.title })}
                    message={t("delete.message")}
                    onClose={() => setOpenConfirm(false)}
                    onConfirm={confirmDelete}
                    />
                   }
                 </Paper>
               )}
               
                  </Box>
               </Box>
               );
             }
  

