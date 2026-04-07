import { Box, Typography, Button, Stack, Paper, Card } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";

import errorImg from "../../assets/images/error.png"
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const navigate = useNavigate();

  const {t} = useTranslation("error");

  return (
    <Paper
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mt: -6
        }}
      >
        
       <Box
         component="img"
         src={errorImg}
         alt="404 Not Found"
         sx={{
           width: { xs: 180, sm: 240, md: 300 },
           height: "auto",
           mx: "auto",
           mb: 3,
           display: "block",
         }}
       />

        <Typography variant="h2" fontWeight={800} sx={{ mb: 1.3 }}>
          {t("title")}
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t("subtitle")}
        </Typography>

        {/* btns */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{gap:2, mt:3}}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate("/goals")}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              boxShadow: 2,
              gap:2,
              "&:hover": { boxShadow: 5 },
            }}
          >
          {t("actions.back")}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
          {t("actions.home")}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}