import React, { useContext, useState } from 'react'
import GoalForm from '../../ui-component/goals/GoalForm'
import { createNewGoal } from "../../services/models";
import { GoalContext } from '../../contexts/GoalContext';
import { useNavigate } from 'react-router';
import { useTranslation } from "react-i18next";

import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";

import GoalPreview from '../../ui-component/goals/goalPreview';
import TipsCard from '../../ui-component/goals/TipsCard';


function NewGoal() {

  const { t } = useTranslation("goalForm");

  const { addGoal } = useContext(GoalContext);
  const navigate = useNavigate();

    const handleCreate = (data) => {
  
      const goal = createNewGoal({
      title: data.title,
      category: data.category,
      type: data.type,
      target: Number(data.target),
      startDate: data.startDate,
      endDate: data.endDate,
      deadline: data.deadline,
      startTime: data.startTime,
      endTime: data.endTime,
      color: data.color,
      icon: data.icon,
      notes: data.notes,
      reminder: data.reminder
  });
  
      addGoal(goal);
      navigate("/goals");
    };

 const [formValues, setFormValues] = useState({});

    

  return (
  <Grid container spacing={2}>   
   <Grid xs={12} md={8}>
    <GoalForm
     onSubmit={handleCreate}
     formTitle={t("title.create")}
     subTitle={t("subtitle.create")}
     submitButtonText={t("actions.submit")}
     onChangeValues={setFormValues}
    />
   </Grid>
     <Grid item xs={12} md={4}>
        <Stack spacing={2} sx={{ mt:4 }}>

          <GoalPreview values={formValues} />
          <TipsCard />
        
        </Stack>
    </Grid>
  </Grid>
  )
}

export default NewGoal
