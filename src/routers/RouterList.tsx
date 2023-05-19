import { useRoutes } from 'react-router';
import { Home } from '../pages/Home';

export const RouterList = () => {
    return useRoutes([
        {path: '/', element: <Home />}
    ]);
};