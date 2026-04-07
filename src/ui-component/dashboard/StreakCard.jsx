import { Card, Box, Typography } from "@mui/material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import bgImage from '../../assets/images/abstract.avif'
import { useTranslation } from "react-i18next";


export default function StreakCard({ streak }) {

  const { t } = useTranslation("dashboard");

  const message =
    streak === 0
      ? t("streak.messages.start")
      : streak < 5
      ? t("streak.messages.goodStart")
      : streak < 10
      ? t("streak.messages.onFire")
      : t("streak.messages.unstoppable");

  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover',            
        backgroundPosition: 'center', 
        color: "#1a1a1a"
      }}
    >
      <Box display="flex" alignItems="center" gap={1.5}>
        <LocalFireDepartmentRoundedIcon sx={{ fontSize: 32 }} />
        <Typography variant="h5" fontWeight={800}>
          {t("streak.title", { count: streak})}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ mt: 1.2, opacity: 0.8, color: '#fff' }}>
         {message}
      </Typography>
    </Card>
  );
}