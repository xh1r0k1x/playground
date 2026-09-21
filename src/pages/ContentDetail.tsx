// --- React Hooks ---
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// --- MUI ---
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- Others ---
import { contents } from '@/data/contents';

export const ContentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchText = location.state?.searchText ?? '';
  const { id } = useParams();
  const content = contents.find((content) => content.id === id);

  if (!content) {
    return <Typography>コンテンツが見つかりません</Typography>;
  }

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/discover', { state: { searchText } })}
      >
        戻る
      </Button>
      <Chip label={content.type} size="small" />
      <Typography variant="h4">{content.title}</Typography>
      <Typography>{content.body}</Typography>
    </>
  );
};
