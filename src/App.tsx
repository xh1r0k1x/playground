// --- React Hooks ---
import { Route, Routes } from 'react-router-dom';

// --- Local Components ---
import { Layout } from '@/layouts/Layout';
import { Home } from '@/pages/Home';
import { Memo } from '@/pages/Memo';
import { Discover } from '@/pages/Discover';
import { ContentDetail } from '@/pages/ContentDetail';
import { NewsDetail } from '@/pages/NewsDetail';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/memo" element={<Memo />} />
        <Route path="/contents/:id" element={<ContentDetail />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Route>
    </Routes>
  );
};
