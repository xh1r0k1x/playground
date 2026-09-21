// --- React Hooks ---
import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// --- MUI ---
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// --- Others ---
import { contents } from '@/data/contents';

export const Discover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState(
    location.state?.searchText ?? '',
  );

  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  let searchResult;
  if (searchText.trim() === '') {
    searchResult = null;
  } else if (filteredContents.length === 0) {
    searchResult = <Typography>該当するコンテンツがありません</Typography>;
  } else {
    searchResult = (
      <List>
        {filteredContents.map((content) => (
          <Fragment key={content.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/contents/${content.id}`, {
                    state: { searchText },
                  });
                }}
              >
                <ListItemText primary={content.title} />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>

            <Divider />
          </Fragment>
        ))}
      </List>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        見つける
      </Typography>

      <TextField
        label="検索"
        placeholder="気になることを検索"
        fullWidth
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      {searchResult}
    </>
  );
};
