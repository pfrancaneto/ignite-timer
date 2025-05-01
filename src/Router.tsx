import { Routes, Route } from 'react-router';

import { Home } from './pages/Home';
import { Historico } from './pages/Historico';
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/historico" element={<Historico />} />
      </Route>
    </Routes>
  );
}
