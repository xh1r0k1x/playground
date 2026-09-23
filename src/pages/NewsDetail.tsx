// --- React Hooks ---
import { useParams, Link as RouterLink } from 'react-router-dom';

// --- MUI ---
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// --- Local Types ---
import type { NewsCache } from '@/types/news';

export const NewsDetail = () => {
  const { id } = useParams();

  const savedCache = sessionStorage.getItem('newsCache');
  const cache: NewsCache | null = savedCache ? JSON.parse(savedCache) : null;

  const news = cache?.news.find((item) => item.id === id);

  if (!news) {
    return <Typography>ニュースが見つかりません</Typography>;
  }

  const newsIndex = cache?.news.findIndex((item) => item.id === id);

  const generatedArticle =
    newsIndex !== undefined && newsIndex >= 0
      ? cache?.generatedArticles[newsIndex]
      : null;

  return (
    <>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          ホーム
        </Link>

        <Typography color="text.primary">ニュース詳細</Typography>
      </Breadcrumbs>
      <Typography variant="h4">{news.title}</Typography>

      <Typography sx={{ mt: 2 }}>{news.description}</Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1.5,
          mt: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
          }}
        >
          Source: {news.host}
        </Typography>

        <Typography
          component="a"
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="caption"
          sx={{
            color: 'text.secondary',
            textUnderlineOffset: '2px',
          }}
        >
          元記事
          <OpenInNewIcon
            sx={{
              ml: 0.25,
              fontSize: '0.8rem',
              verticalAlign: 'middle',
            }}
          />
        </Typography>
      </Box>

      {generatedArticle && (
        <>
          <Chip
            label="AIダイジェスト"
            size="small"
            variant="outlined"
            sx={{ mt: 3, mb: 1 }}
          />

          <Typography>{generatedArticle}</Typography>
        </>
      )}
    </>
  );
};
