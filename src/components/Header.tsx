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

export const Header = () => {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar disableGutters>
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
            icon={<WbSunnyOutlinedIcon />}
            label={'--\u00B0'}
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
