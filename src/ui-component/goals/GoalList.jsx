import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';

import MainCard from 'ui-component/cards/MainCard';
import GoalCard from './GoalCard';
import { Grid } from '@mui/material';


export default function GoalsList({ goals, addProgress, togglePause, onDelete }) {
  return (
    <>
      {goals.map((goal) => (
        <Grid item key={goal.id} xs={12} sm={6} md={6} lg={4}>
          <GoalCard
            goal={goal}
            addProgress={() => addProgress(goal.id, 1)}
            togglePause={() => togglePause(goal.id)}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </>
  );
}

