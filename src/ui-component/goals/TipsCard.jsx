import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import bgImage from '../../assets/images/abstract.avif'

export default function TipsCard() {
  const { t } = useTranslation("goalForm");

  return (
    <Card sx={{ 
    borderRadius: 3,
    transition: "0.3s",
    backgroundImage: `url(${bgImage})`, 
    backgroundSize: 'cover',            
    backgroundPosition: 'center', 
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 6
     }
   }}>
      <CardContent>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t("tips.title")}
        </Typography>

        <List dense>
          <ListItem>• {t("tips.tip1")}</ListItem>
          <ListItem>• {t("tips.tip2")}</ListItem>
          <ListItem>• {t("tips.tip3")}</ListItem>
        </List>

      </CardContent>
    </Card>
  );
}