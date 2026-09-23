// --- React Hooks ---
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MUI ---
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

// --- Local Types ---
import type { NewsItem } from '@/types/news';

// --- Others ---
import { contents, contentTypeLabels } from '@/data/contents';

export const Home = () => {
  const navigate = useNavigate();

  const savedCache = sessionStorage.getItem('newsCache');
  const cache = savedCache ? JSON.parse(savedCache) : null;

  const [news, setNews] = useState<NewsItem[]>(cache?.news ?? []);
  const [generatedArticles, setGeneratedArticles] = useState<string[]>(
    cache?.generatedArticles ?? [],
  );
  const [newsPage, setNewsPage] = useState(0);

  const [newsError, setNewsError] = useState(false);

  const newsCarouselRef = useRef<HTMLDivElement>(null);

  const generateNewsArticles = useCallback(async () => {
    const response = await fetch('/api/generate-news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate news: ${response.status}`);
    }

    const data = await response.json();

    if (!data.outputText) {
      throw new Error('AI digest was not returned');
    }

    return JSON.parse(data.outputText);
  }, [news]);

  useEffect(() => {
    if (news.length === 0 || generatedArticles.length > 0) {
      return;
    }

    generateNewsArticles()
      .then((articles) => {
        setGeneratedArticles(articles);

        sessionStorage.setItem(
          'newsCache',
          JSON.stringify({
            news,
            generatedArticles: articles,
          }),
        );
      })
      .catch((error) => {
        console.log(error);
        setNewsError(true);
      });
  }, [news, generatedArticles, generateNewsArticles]);

  useEffect(() => {
    if (news.length > 0) {
      return;
    }

    fetch('https://freenewsapi.ai/v1/search?q=technology&size=3')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`ニュースAPIエラー: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setNews(data.results);
      })
      .catch((error) => {
        console.error(`ニュースの取得に失敗しました`, error);
      });
  }, [news.length]);

  useEffect(() => {
    const container = newsCarouselRef.current;

    if (!container || news.length === 0) {
      return;
    }

    const firstCard = container.children[1] as HTMLElement;

    firstCard.scrollIntoView({
      behavior: 'instant',
      inline: 'center',
      block: 'nearest',
    });
  }, [news]);

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

  const loopNews =
    news.length > 0 ? [news[news.length - 1], ...news, news[0]] : [];
  const loopGeneratedArticles =
    generatedArticles.length > 0
      ? [
          generatedArticles[generatedArticles.length - 1],
          ...generatedArticles,
          generatedArticles[0],
        ]
      : [];

  return (
    <Box>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mt: 1, mb: 2, fontWeight: 'bold' }}>
          今日のニュース
        </Typography>

        <Box
          ref={newsCarouselRef}
          onScrollEnd={(event) => {
            const container = event.currentTarget;
            const cards = Array.from(container.children) as HTMLElement[];

            const containerCenter =
              container.scrollLeft + container.clientWidth / 2;

            const closestIndex = cards.reduce((closest, card, index) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2;
              const closestCard = cards[closest];
              const closestCenter =
                closestCard.offsetLeft + closestCard.offsetWidth / 2;

              return Math.abs(cardCenter - containerCenter) <
                Math.abs(closestCenter - containerCenter)
                ? index
                : closest;
            }, 0);

            if (closestIndex === 0) {
              setNewsPage(news.length - 1);
            } else {
              setNewsPage(closestIndex - 1);
            }

            const isRightEdge =
              container.scrollLeft >=
              container.scrollWidth - container.clientWidth - 1;

            if (isRightEdge) {
              cards[1].scrollIntoView({
                behavior: 'instant',
                inline: 'center',
                block: 'nearest',
              });
            }

            if (closestIndex === 0) {
              cards[cards.length - 2].scrollIntoView({
                behavior: 'instant',
                inline: 'center',
                block: 'nearest',
              });
            }
          }}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {loopNews.map((item, index) => (
            <Card
              key={`${item.id}-${index}`}
              variant="outlined"
              sx={{ minWidth: '65%', scrollSnapAlign: 'center' }}
            >
              <CardActionArea onClick={() => navigate(`/news/${item.id}`)}>
                {item.image && (
                  <CardMedia
                    component="img"
                    height="110"
                    image={item.image}
                    alt=""
                    sx={{ objectFit: 'cover' }}
                  />
                )}

                <CardContent>
                  <Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      color: 'text.secondary',
                      mt: 0.5,
                    }}
                  >
                    Source: {item.host}
                  </Typography>

                  {loopGeneratedArticles[index] ? (
                    <>
                      <Chip
                        label="AIダイジェスト"
                        size="small"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {loopGeneratedArticles[index]}
                      </Typography>
                    </>
                  ) : newsError ? (
                    <Alert
                      severity="error"
                      action={
                        <Button
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setNewsError(false);
                            generateNewsArticles();
                          }}
                        >
                          再試行
                        </Button>
                      }
                    >
                      AIダイジェストを取得できませんでした
                    </Alert>
                  ) : (
                    <>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="70%" />
                    </>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 1,
          }}
        >
          {news.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                const container = newsCarouselRef.current;

                if (!container) {
                  return;
                }

                const cards = Array.from(container.children) as HTMLElement[];

                cards[index + 1].scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor:
                  newsPage === index ? 'text.primary' : 'action.disabled',
              }}
            />
          ))}
        </Box>

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
