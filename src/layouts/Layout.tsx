// --- React Hooks ---
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// --- MUI ---
import Container from '@mui/material/Container';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// --- Local Components ---
import { Header } from '@/components/Header';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ pt: 3, pb: 10 }}>
        <Outlet />
      </Container>

      <BottomNavigation
        value={location.pathname}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigationAction
          label="ホーム"
          value="/"
          onClick={() => navigate('/')}
        />
        <BottomNavigationAction
          label="見つける"
          value="/discover"
          onClick={() => navigate('/discover')}
        />
        <BottomNavigationAction
          label="メモ"
          value="/memo"
          onClick={() => navigate('/memo')}
        />
      </BottomNavigation>
    </>
  );
};
