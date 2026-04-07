import { Card, Box, Typography, Grid } from "@mui/material";

export default function MiniCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider"
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
        {today.toLocaleString("default", { month: "long" })}
      </Typography>

      <Grid container spacing={1}>
        {days.map((day, index) => (
          <Grid key={index} size={1.7}>
            <Box
              sx={{
                textAlign: "center",
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                bgcolor:
                  day === today.getDate()
                    ? "primary.main"
                    : "transparent",
                color:
                  day === today.getDate()
                    ? "primary.contrastText"
                    : "text.secondary"
              }}
            >
              {day || ""}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}