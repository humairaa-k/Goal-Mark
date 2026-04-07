import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ProgressBar({ progress, target, color }) {

  const percentage = Math.min((progress / target) * 100, 100 );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={percentage}
           sx={{
            height: 5,
            borderRadius: 5,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: color
            }
          }} />
        <Typography variant="caption">
          {progress} / {target}
        </Typography>
      </Box>

      <Typography variant="body2">
        {Math.round(percentage)}%
      </Typography>

    </Box>
  );
}