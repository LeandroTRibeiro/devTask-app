import { useRoutes } from 'react-router';


import { Home } from '../pages/Home';
import { Signin } from '../pages/Signin';
import { Dashboard } from '../pages/Dashboard';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { ForgotPassword } from '../pages/ForgotPassword';
import { RecoverPassword } from '../pages/RecoverPassword';
import InputList from '../pages/test';


export const RouterList = () => {

    const logged = useAppSelector(state => state.LoggedReducer.status);

    return useRoutes([
        {path: '/', element: <Home />},
        {path: '/signin', element: <Signin />},
        {path: '/:id/dashboard', element: logged ? <Dashboard /> : <Home />},
        {path: '/forgotpassword', element: <ForgotPassword />},
        {path: '/recoverpassword', element: <RecoverPassword />},
        {path: '/test', element: <InputList />}
    ]);
};