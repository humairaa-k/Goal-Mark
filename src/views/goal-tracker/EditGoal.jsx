import { useParams, useNavigate } from 'react-router-dom';
import { GoalContext } from '../../contexts/GoalContext';
import { useContext } from 'react';
import GoalForm from '../../ui-component/goals/GoalForm'

import {
  Box,
  Button,
  Typography
  } from '@mui/material';

import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';


  import { useTranslation } from "react-i18next";

export default function EditGoal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { goals, updateGoal } = useContext(GoalContext);

  const goal = goals.find(g => g.id === Number( id ));

  const handleUpdate = (updatedGoal) => {
    updateGoal(goal.id, updatedGoal);
    navigate(`/goals/${goal.id}`);
  }

  const { t } = useTranslation("goalForm");
  const { t: tCommon } = useTranslation("common");

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
             {/* Icon */}
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
     
             {/* Title */}
             <Typography variant="h2" fontWeight={800} sx={{ mb: 2 }}>
               {tCommon("notFound.title")}
             </Typography>
     
             {/* Subtitle */}
             <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
               {tCommon("notFound.subtitle")}
             </Typography>
     
             {/* Button */}
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
    <GoalForm
    defaultValues={goal}
    onSubmit={handleUpdate}
    formTitle= {t("title.edit")}
    subTitle={t("subtitle.edit")}
    submitButtonText={t("actions.editGoal")}    
    ></GoalForm>
    )}
  </>

  )}

