import { Card, CardContent, Typography, Box, LinearProgress, Chip } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

import myImage from '../../assets/images/gradient-blur.jpg'

export default function GoalPreview({ values }) {
  const { t } = useTranslation("goalForm");

  if (!values) return null;

  return (
    <Card
    sx={{
    borderRadius: 3,
    backgroundImage: `url(${myImage})`, 
    backgroundSize: 'cover',            
    backgroundPosition: 'center',      
     color: 'black',                    
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 6
      }
    }}
    >
      <CardContent>

        <Typography variant="h3" fontWeight="bold"sx={{ color: 'black' }} gutterBottom>
          {t("preview.title")}
        </Typography>

        <Typography variant="h4" sx={{ mb: 1, color: 'black' }}>
          {values.title || t("preview.noTitle")}
        </Typography>

        <Typography   sx={{  mb: 1 }}>
          {values.category || "—"}
        
        </Typography>

        <Typography variant="h5"sx={{ color: 'black' }}>
          {t("fields.type")}: {values.type}
        </Typography>

        <Typography variant="body2" sx={{ color: 'black' }}>
          {t("fields.target")}: {values.target || 0}
        </Typography>

        <Typography variant="body2" sx={{ color: 'black' }}>
          {values.startDate} → {values.endDate}
        </Typography>

      </CardContent>
    </Card>
  );
}