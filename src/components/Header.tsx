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

const getWeatherCache = () => {
  const savedCache = sessionStorage.getItem('weatherCache');

  if (!savedCache) {
    return null;
  }

  const cache = JSON.parse(savedCache);
  const fifteenMinutes = 15 * 60 * 1000;
  const isFresh = cache && Date.now() - cache.savedAt < fifteenMinutes;

  return isFresh ? cache : null;
};

export const Header = () => {
  const [temperature, setTemperature] = useState<number | null>(() => {
    const cache = getWeatherCache();
    return cache?.temperature ?? null;
  });
  const [weatherCode, setWeatherCode] = useState<number | null>(() => {
    const cache = getWeatherCache();
    return cache?.weatherCode ?? null;
  });

  useEffect(() => {
    const cache = getWeatherCache();

    if (cache) {
      return;
    }

    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=35.6917&longitude=139.7500&current=temperature_2m,weather_code&timezone=Asia%2FTokyo',
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`天気APIエラー: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setTemperature(data.current.temperature_2m);
        setWeatherCode(data.current.weather_code);

        sessionStorage.setItem(
          'weatherCache',
          JSON.stringify({
            temperature: data.current.temperature_2m,
            weatherCode: data.current.weather_code,
            savedAt: Date.now(),
          }),
        );
      })
      .catch((error) => {
        console.error('天気情報の取得に失敗しました', error);
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
      <AppBar
        position="sticky"
        color="transparent"
        elevation={1}
        sx={{ bgcolor: 'grey.50' }}
      >
        <Toolbar variant="dense">
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
            label={temperature === null ? '--\u00B0' : `${temperature}\u00B0`}
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
