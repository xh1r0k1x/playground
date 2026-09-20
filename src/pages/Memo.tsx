// --- React Hooks ---
import { useState } from 'react';

// --- MUI ---
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

type MemoItem = {
  title: string;
  solution: string;
  cause: string;
  tags?: string[];
};

const memos: MemoItem[] = [
  {
    title: 'VS CodeでformatOnSaveが効かない',
    solution: 'プロジェクトフォルダ自体をVS Codeのワークスペースとして開く。',
    cause:
      '.vscode/settings.json は、そのプロジェクトをVS Codeのワークスペースとして開いていないと適用されない。',
    tags: ['VS Code', '設定'],
  },
  {
    title: 'MUIのレイアウトが意図せず中央寄せになる',
    solution: 'グローバルCSSの#rootに不要なスタイルが残っていないか確認する。',
    cause: 'Viteの初期CSSにあったtext-align: centerが子要素にも影響していた。',
    tags: ['MUI', 'CSS'],
  },
  {
    title: 'MUIのCardとListの使い分け',
    solution:
      '一覧として連続して見せたい情報はList、各項目を独立したコンテンツとして見せたい場合はCardを検討する。',
    cause:
      'CardはChip・操作ボタン・画像などを含む独立した情報のまとまりと相性がよく、Listは同種の項目を一覧として並べるのに向いている。',
    tags: ['MUI', '設計'],
  },
];

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
