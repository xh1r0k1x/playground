import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

export const App = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.100',
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        playground
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
        今日のピックアップ
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="body2">歴史</Typography>

            <Typography variant="h6">
              信長が生きていた頃、ヨーロッパでは何が起きていた？
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="body2">Devメモ</Typography>

            <Typography variant="h6">
              VS CodeでformatOnSaveが効かなかった原因
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <BottomNavigation
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigationAction label="ホーム" />
        <BottomNavigationAction label="見つける" />
        <BottomNavigationAction label="メモ" />
      </BottomNavigation>
    </Box>
  );
};
