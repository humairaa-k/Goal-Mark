import React from 'react'

export default function GoalStats() {
    const { goals, addProgress, togglePause, deleteGoal } = useContext(GoalContext);

  return (
      <Box elevation={2}
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              flexWrap: "wrap"
            }}>
        
          <Box
           sx={{
             minWidth: 160,
             bgcolor: "background.paper",
             p: 2,
             borderRadius: 2,
             boxShadow: 1,
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center"
           }}
         >
           <Box>
             <Typography variant="caption" color="text.secondary">
               Total Goals
             </Typography>
         
             <Typography variant="h4" fontWeight={900} sx={{ mt: 1 }}>
              {totalgoals}
             </Typography>
           </Box>
   
         <TrendingUpRoundedIcon sx={{ color: "primary.main" }} />
         </Box>
   
         <Box
          sx={{
            minWidth: 160,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
            boxShadow: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>     
          <Box>
            <Typography variant="caption" color="text.secondary">
              Active
            </Typography>
        
            <Typography variant="h4" fontWeight={900} sx={{ mt: 1 }}>
              {activegoals}
            </Typography>
          </Box>
   
           <HourglassBottomRoundedIcon sx={{ color: "warning.main" }} />
         </Box>
   
         <Box
           sx={{
             minWidth: 160,
             bgcolor: "background.paper",
             p: 2,
             borderRadius: 2,
             boxShadow: 1,
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center"
           }}
         >
           <Box>
             <Typography variant="caption" color="text.secondary">
               Completed
             </Typography>
         
             <Typography variant="h4" fontWeight={900} sx={{ mt: 1 }}>
               {completedgoals}
             </Typography>
           </Box>
          
           <HistoryRoundedIcon sx={{ color: "success.main" }} />
          </Box>
   
          <Box
           sx={{
             minWidth: 160,
             bgcolor: "background.paper",
             p: 2,
             borderRadius: 2,
             boxShadow: 1,
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center"
           }}
         >
           <Box>
             <Typography variant="caption" color="text.secondary">
               Overall Progress
             </Typography>
         
             <Typography variant="h4" fontWeight={900} sx={{ mt: 1 }}>
               {overallProgress}%
             </Typography>
           </Box>
   
             <TrendingUpRoundedIcon sx={{ color: "info.main" }} />
           </Box>
           
           </Box>
  )
}

