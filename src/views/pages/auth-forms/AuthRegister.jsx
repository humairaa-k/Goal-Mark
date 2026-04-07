import { useEffect, useState } from 'react';
import { Link,Navigate, useNavigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {

 const [showPassword, setShowPassword] = useState(false);
 const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  const { register, handleSubmit, formState: { errors },} = useForm();

  const onSubmit = async (data) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log("User created");
    navigate("/dashboard"); 

  } catch (error) {
    console.error(error.message);
  }
};
 
return (
    <>
      <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">Sign up with Email address </Typography>
      </Stack>

    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={{ xs: 0, sm: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomFormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-first-register">First Name</InputLabel>
         
            <OutlinedInput id="outlined-adornment-first-register"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <Typography color="error" variant="caption">
                {errors.firstName.message}
              </Typography>
            )}
          </CustomFormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomFormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-last-register">Last Name</InputLabel>

            <OutlinedInput d="outlined-adornment-last-register"
            {...register("lastName", {
              required: "Last name is required",
            })}
           />
           {errors.lastName && (
              <Typography color="error" variant="caption">
                {errors.lastName.message}
              </Typography>
            )}
          </CustomFormControl>
        </Grid>
      </Grid>
      <CustomFormControl fullWidth error={!!errors.email}>
        <InputLabel htmlFor="outlined-adornment-email-register">Email Address </InputLabel>
        <OutlinedInput id="outlined-adornment-email-register" 
        type="email" 
        {...register("email", {
          required: "Email is required",
          pattern: {
           value: /^\S+@\S+$/i,
           message: "Invalid email format"
          },
        })}
        />
       {errors.email && (
         <Typography color="error" variant="caption">
           {errors.email.message}
         </Typography>
       )}
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                  
        <OutlinedInput id="outlined-adornment-password-register"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          onChange={(e) => {
            changePassword(e.target.value); 
          }}
        />
      </CustomFormControl>

      {strength !== 0 && (
        <FormControl fullWidth>
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
              <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>
                {level?.label}
              </Typography>
            </Stack>
          </Box>
        </FormControl>
      )}

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Sign up
          </Button>
        </AnimateButton>
      </Box>

      </form>
    </>
  );
}
