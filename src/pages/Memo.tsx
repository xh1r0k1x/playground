// --- React Hooks ---
import { useState } from 'react';

// --- MUI ---
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

// --- Others ---
import { memos } from '@/data/memos';

export const Memo = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredMemos = selectedTag
    ? memos.filter((memo) => memo.tags?.includes(selectedTag))
    : memos;

  return (
    <>
      <Typography variant="h4">メモ</Typography>

      {selectedTag && (
        <Button onClick={() => setSelectedTag(null)}>すべて表示</Button>
      )}

      <Stack spacing={2}>
        {filteredMemos.map((memo) => (
          <Card key={memo.title}>
            <CardContent>
              <Typography variant="h6">{memo.title}</Typography>

              <Stack direction="row" spacing={1}>
                {memo.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant={selectedTag === tag ? 'filled' : 'outlined'}
                    onClick={() => setSelectedTag(tag)}
                  />
                ))}
              </Stack>
              <Typography>{memo.solution}</Typography>

              <Typography variant="body2" color="text.secondary">
                原因：{memo.cause}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};
