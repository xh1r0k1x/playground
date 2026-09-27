// --- MUI ---
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

// --- Local Hooks ---
import { useLanguageContent } from '@/hooks/useLanguageContent';

export const Language = () => {
  const { data: content } = useLanguageContent();

  if (!content) {
    return null;
  }

  const speak = (text: string, rate = 1) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = content.language;
    utterance.rate = rate;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Typography variant="h4">Language</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3 }}>
        <Typography variant="h5">{content.text}</Typography>

        <IconButton aria-label="発音を聞く" onClick={() => speak(content.text)}>
          <VolumeUpIcon />
        </IconButton>

        <Button size="small" onClick={() => speak(content.text, 0.8)}>
          ゆっくり
        </Button>
      </Box>

      <Typography sx={{ mt: 1 }}>{content.translation}</Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>
        単語・表現
      </Typography>

      {content.expressions.map((expression) => (
        <Box key={expression.text} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              <strong>{expression.text}</strong>：{expression.meaning}
            </Typography>

            <IconButton
              size="small"
              aria-label={`${expression.text} の発音を聞く`}
              onClick={() => speak(expression.text, 0.8)}
            >
              <VolumeUpIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            発音
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {expression.pronunciationParts.map((part) => (
              <Box key={part} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>{part}</Typography>

                <IconButton
                  size="small"
                  aria-label={`${part} の発音を聞く`}
                  onClick={() => speak(part, 0.8)}
                >
                  <VolumeUpIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, whiteSpace: 'pre-line' }}
          >
            {expression.explanation}
          </Typography>
        </Box>
      ))}
    </>
  );
};
