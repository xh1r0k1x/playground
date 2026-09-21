// --- React Hooks ---
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// --- MUI ---
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- Others ---
import { contents, contentTypeLabels } from '@/data/contents';

export const ContentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchText = location.state?.searchText ?? '';
  const from = location.state?.from ?? '/discover';
  const { id } = useParams();
  const content = contents.find((content) => content.id === id);

  if (!content) {
    return <Typography>コンテンツが見つかりません</Typography>;
  }

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(from, { state: { searchText } })}
      >
        戻る
      </Button>
      <Chip label={contentTypeLabels[content.type]} size="small" />
      <Typography variant="h4" sx={{ mt: 2 }}>
        {content.title}
      </Typography>
      <Typography
        sx={{
          mt: 2,
          lineHeight: 1.8,
        }}
      >
        {content.body}
      </Typography>
    </>
  );
};
