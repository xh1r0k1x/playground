// --- MUI ---
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.100',
      }}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
          今日のピックアップ
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="body2">歴史</Typography>

            <Typography variant="h6">
              信長が生きていた頃、ヨーロッパでは何が起きていた？
            </Typography>
          </CardContent>
        </Card>

        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontWeight: 'bold',
          }}
        >
          ちょっと気になる
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
              <Typography variant="body2">外国語</Typography>
              <Typography variant="h6">Me encanta la playa.</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="body2">雑学</Typography>
              <Typography variant="h6">飛行機の窓はなぜ丸い？</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
