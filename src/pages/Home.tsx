// --- React Hooks ---
import { useNavigate } from 'react-router-dom';

// --- MUI ---
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

// --- Others ---
import { contents, contentTypeLabels } from '@/data/contents';

export const Home = () => {
  const navigate = useNavigate();
  const pickup = contents.find(
    (content) => content.id === 'history-nobunaga-europe',
  );
  const curiousContents = contents.filter(
    (content) =>
      content.id === 'language-spanish-playa' ||
      content.id === 'science-airplane-window',
  );

  if (!pickup) {
    return <Typography>コンテンツが見つかりません</Typography>;
  }

  return (
    <Box>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
          今日のピックアップ
        </Typography>

        <Card>
          <CardActionArea
            onClick={() =>
              navigate(`/contents/${pickup.id}`, { state: { from: '/' } })
            }
          >
            <CardContent>
              <Typography variant="body2">
                {contentTypeLabels[pickup.type]}
              </Typography>

              <Typography variant="h6">{pickup.title}</Typography>
            </CardContent>
          </CardActionArea>
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
          {curiousContents.map((content) => (
            <Card key={content.id}>
              <CardActionArea
                onClick={() =>
                  navigate(`/contents/${content.id}`, { state: { from: '/' } })
                }
              >
                <CardContent>
                  <Typography variant="body2">
                    {contentTypeLabels[content.type]}
                  </Typography>

                  <Typography variant="h6">{content.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
