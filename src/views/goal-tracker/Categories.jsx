import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoalContext } from '../../contexts/GoalContext';
import { defaultCategories } from '../../data/categories';

import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

 import ProgressBar from '../../ui-component/common/ProgressBar';
 import CategoryCard from '../../ui-component/categories/CategoryCard';
 import CategoryForm from '../../ui-component/categories/CategoryForm';
 import IconFor from '../../utils/goal-tracker/icons';
 import ConfirmDelete from '../../ui-component/common/confirmDelete';
 import StatsCards from '../../ui-component/common/StatsCards';

 import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
   Cell,
   PieChart, 
   Pie,
   Tooltip
} from "recharts";

import { useTranslation } from "react-i18next";

export default function Categories() {

  const { goals=[], setGoals} = useContext(GoalContext);
  const navigate = useNavigate();

  const iconMap = {
  Health: "heart",
  Study: "book",
  Work: "star",
  Finance: "money",
  Personal: "favorite"
  };

  const [ categories, setCategories] = useState(() => {
    const raw = localStorage.getItem('categories_V1');
    if(raw) return JSON.parse(raw) ;

    return defaultCategories.map((name) => ({
      name,
      color: null,
      icon: iconMap[name] || "folder"
    }))
  });

  const [editing, setEditing] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { t } = useTranslation("categories");

  //categories fallback
  useEffect(() => {
   if(categories === null) {
    const map = new Map();
    (goals || []).forEach((g) => {
      const key = (g.category || 'Uncategorized').trim();
      if(!map.has(key)) map.set(key, {name: key, color:null, icon: null });
    });
    setCategories(Array.from(map.values()))
   }
  },[goals, categories ]);


  const stats = useMemo(() => {
    const totalCategories = ( categories || []).length;
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;

    const byCategory = {};

    goals.forEach((g) => {
      const key = (g.category || 'Uncategorized').trim();
      if(!byCategory[key]) byCategory[key] = { goals:0, progress: 0, target:0, completed: 0 };

      byCategory[key].goals += 1;
      byCategory[key].progress += Number(g.progress || 0);
      byCategory[key].target += Number(g.target || 0);
      if(g.status === 'completed')byCategory[key].completed += 1;
    });

    let mostActive = null;
    Object.entries(byCategory).forEach(([name, v]) => {
      const percent = v.target > 0 ? v.progress /v.target : 0;
      if(!mostActive || percent > mostActive.percent) mostActive = { name, percent }
    });

    return { totalCategories, totalGoals, completedGoals, byCategory, mostActive };

  },[categories, goals]);


const handleOpenNew = () => {
  setEditing(null);  
  setOpenForm(true);   
};

const handleEdit = (category) => {
  setEditing(category);
  setOpenForm(true);
};

const handleDelete = (catName) => { 
  setSelectedCategory(catName);
  setOpenConfirm(true);
}

const handleSaveCategory = (payload) => {
  setCategories(prev => {

    // editing existing category
    if (editing) {
      return prev.map(c =>
        c.name === editing.name
          ? { ...c, ...payload }
          : c
      );
    }

    // create new category
    return [...prev, payload];
  });

  setEditing(null);
  setOpenForm(false);
};

 useEffect(()=> {
  if(categories !== null ){
    localStorage.setItem('categories_V1', JSON.stringify(categories));
   }
 },[categories]);


   const getCategoryMeta = (name) => {
    const found = (categories || []).find((c) => c.name === name);
    if (found) return found;
    return { name, color: null, icon: null };
  };


  const confirmDelete = () => {
    if (!selectedCategory) return;
    
    setCategories(prev =>prev.filter(c => c.name !== selectedCategory));
    setGoals(prevGoals =>prevGoals.filter( g => g.category !== selectedCategory));
  
    setSelectedCategory(null);
    setOpenConfirm(false);
  }

  const chartData = categories.map((c)=> {
    const data = stats.byCategory[c.name] || {goals: 0, progress: 0, target: 0, completed: 0 };
    const progressPercent = data.target > 0 ? Math.round((data.progress / data.target) *100) : 0;

    return {
      name: c.name,
      progress: progressPercent,
      goals: data.goals
    }
   })

  const shareData = Object.entries(stats.byCategory || {}).map(([name, v]) => ({
  name: name || "Unknown",
  value: v.progress || 0
  }));

  const totalContribution = shareData.reduce((sum, item) => sum + item.value, 0);
  

  const averageProgress = chartData.length? Math.round(chartData.reduce((sum, c) => 
    sum + c.progress, 0) / chartData.length) : 0;

  const statItems = [
    {
      title: t("stats.totalCategories"),
      value: stats.totalCategories,
      icon: <FolderOpenRoundedIcon />,
      color: "primary.main"
    },
    {
      title: t("stats.totalGoals"),
      value: stats.totalGoals,
      icon: <BarChartRoundedIcon />,
      color: "info.main"
    },
    {
      title: t("stats.completedGoals"),
      value: stats.completedGoals,
      icon: <CheckCircleRoundedIcon />,
      color: "success.main"
    },
    {
      title: t("stats.mostActive"),
      value: stats.mostActive ? stats.mostActive.name : "_",
      icon: <TrendingUpRoundedIcon />,
      color: "warning.main"
    }
  ];
      

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 }, minHeight: '80vh' }}>
      <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
     
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
         <Stack direction="column" spacing={1.5} alignItems="left" sx={{ minWidth: 0 }}>
            <Typography variant="h1" component="div" fontWeight={800} sx={{ letterSpacing: "0.02em" }}>
              {t("title")}
            </Typography>
            <Typography variant="body2" color="text.secondary"sx={{ ml: 1 }}>
              {t("subtitle")}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ gap:2, mt: { xs: 2, md: 0 } }}>
            <Button variant="outlined" startIcon={<BarChartRoundedIcon />} sx={{ gap: 0.7}} onClick={() => navigate('/dashboard')}>{t("actions.overview")}</Button>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ gap: 0.7}} onClick={handleOpenNew}>{t("actions.newCategory")}</Button>
          </Stack>
      
     </Paper>
        <StatsCards items={statItems} />

        {/* categories */}
          {(categories || []).length === 0 ? (
           <Box
             sx={{
               textAlign: "center",
               py: 8,
               border: "2px dashed",
               borderColor: "divider",
               borderRadius: 4,
               bgcolor: "background.default",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               gap: 1.5
             }}
             >
              <FolderOpenRoundedIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
              <Typography variant="h6" color="text.secondary"> {t("empty.title")} </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
               {t("empty.subtitle")}
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={handleOpenNew}>{t("createCategory")}</Button>
            </Box>
          ) : (
           <>
            <Box 
             sx={{
              display: "flex",
              gap: 3,
              mb:2,
              flexWrap: "wrap"
             }}
            >

            {/* chart  */}
           <Paper
            elevation={1}
            sx={{
              flex: 1.7,
              p: 3,
              borderRadius: 2,
            }}
           >

            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              {t("charts.comparison")}
            </Typography>

            <Box sx={{ mb: 1, display: 'inline-block', px: 0.8, py: 0.5, bgcolor: 'grey.100', borderRadius: 3 }}>
             {t("charts.avgProgress", { value: averageProgress })}
            </Box>
          
            <Box sx={{ width: "100%", height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#555" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#555" }}
                      tickLine={false}
                      domain={[0, 100]} 
                     />
                     <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      formatter={(value) => [`${value}%`, t("charts.progress")]}
                      labelFormatter={(label) => t("charts.categoryLabel", {name: label }) } 
                    />

                     <Bar
                       dataKey="progress"
                       radius={[5, 5, 0, 0]} 
                       barSize={30} 
                     >
                       {chartData.map((entry, index) => (
                         <Cell
                          key={index}
                          fill={categories[index]?.color || "#8884d8"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
  
         </Paper>

        {/* Insight box */}
           <Paper
           elevation={1}
           sx={{
             flex: 1.5,
             p: 3,
             borderRadius: 2,
           }}>
           <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
             {t("charts.contribution")}
           </Typography>
          
           <Box sx={{ height: 250 }}>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={shareData}        
                   dataKey="value"
                   nameKey="name"
                   cx="50%"
                   cy="50%"
                   innerRadius={60}         
                   outerRadius={80}
                    paddingAngle={3}
                    labelLine
                    label={({ name, percent, x, y, textAnchor }) => (
                      <text
                        x={x}
                        y={y}
                        dy={4}
                        dx={textAnchor === "start" ? 8 : -8}
                        textAnchor={textAnchor}
                        fill="#555"
                        fontSize={12}
                      >
                        {`${name}: ${Math.round(percent * 100)}%`}
                      </text>
                    )}
                  >
                   {shareData.map((cat, index) => {
                     const meta = getCategoryMeta(cat.name);
                     return <Cell key={index} fill={meta.color || "#8884d8"} />;
                   })}
                 </Pie>
                 <Tooltip formatter={(value) => `${value}`} />
               </PieChart>
             </ResponsiveContainer>
           </Box>


        <Box sx={{ mt: 2 }}>
         <Stack spacing={0.5}>
           {shareData.map((cat) => {

             const percent = totalContribution > 0 ? Math.round((cat.value / totalContribution)* 100) : 0;
             const meta = getCategoryMeta(cat.name);
             return (
                 <Box
                 key={cat.name}
                 sx={{
                   display: "flex",
                   justifyContent: "flex-start",
                   pb: 0.5, 
                   alignItems: "center",
                    gap: 1.5
                   }}
                 >
                  
                 <Box
                   sx={{
                     width: 11,
                     height: 11,
                     borderRadius: "50%",     
                     backgroundColor: meta.color || "#1976d2", 
                     flexShrink: 0,            
                    }}
                  />
                  
                   <Typography sx={{}}>
                     {cat.name}
                   </Typography>
                   <Typography sx={{ ml: 6, fontWeight: 700 }}>{percent}%</Typography>
                 </Box>
               );
             })}
           </Stack>
         </Box> 
        </Paper>

       </Box>
           <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
              <Typography variant="h3" fontWeight={600} sx={{  mb: 4 }}>
              {t("list.title")}
            </Typography>
            <Grid container spacing={3}>
              {(categories || []).map((c) => {
                const meta = getCategoryMeta(c.name);
                const data = stats.byCategory[c.name] || { goals: 0, progress: 0, target: 0, completed: 0 };
                const percent = data.target > 0 ? Math.round((data.progress / data.target) * 100) : 0;

                return (
                  <Grid key={c.name} item xs={12} sm={6} md={4}>
                    <CategoryCard
                      category={meta}
                      goalsCount={data.goals}
                      completedCount={data.completed}
                      progressPercent={percent}
                      iconComponent={IconFor(meta.icon)}
                      onView={() => navigate(`/goals?category=${c.name}`)}
                      onEdit={() => handleEdit(meta)}
                      onDelete={() => handleDelete(c.name)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
          </>
          )}
      
        <CategoryForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          editingCategory={editing}
          onSave={handleSaveCategory}
          categories={categories}
        />

        <ConfirmDelete
          open={openConfirm}
          title={t("delete.title")}
          message={t("delete.message")}
          onClose={() => setOpenConfirm(false)}
          onConfirm={confirmDelete}
        />
      </Box>
    </Box>
  );
}


