// --- React Hooks ---
import { useState, useEffect } from 'react';

// --- MUI ---
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';

export const Header = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=35.6917&longitude=139.7500&current=temperature_2m,weather_code',
    )
      .then((response) => response.json())
      .then((data) => {
        setTemperature(data.current.temperature_2m);
        setWeatherCode(data.current.weather_code);
      });
  }, []);

  let weatherIcon = <WbSunnyOutlinedIcon />;

  if (weatherCode !== null) {
    if (weatherCode >= 95) {
      weatherIcon = <ThunderstormOutlinedIcon />;
    } else if (
      (weatherCode >= 71 && weatherCode <= 77) ||
      (weatherCode >= 85 && weatherCode <= 86)
    ) {
      weatherIcon = <AcUnitIcon />;
    } else if (
      (weatherCode >= 51 && weatherCode <= 67) ||
      (weatherCode >= 80 && weatherCode <= 82)
    ) {
      weatherIcon = <WaterDropOutlinedIcon />;
    } else if (
      (weatherCode >= 1 && weatherCode <= 3) ||
      weatherCode === 45 ||
      weatherCode === 48
    ) {
      weatherIcon = <CloudOutlinedIcon />;
    }
  }

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
            }}
          >
            playground
          </Typography>

          <Chip
            icon={weatherIcon}
            label={temperature === null ? '--\u00B0' : `${temperature}`}
            variant="outlined"
            sx={{ mr: 1 }}
          />

          <IconButton aria-label="アカウント">
            <AccountCircleIcon />
          </IconButton>

          <IconButton aria-label="設定">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Divider />
    </>
  );
};
