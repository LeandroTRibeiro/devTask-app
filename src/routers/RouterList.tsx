import { useState, useEffect } from 'react';

import { useRoutes } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Signin } from '../pages/Signin';
import { Dashboard } from '../pages/Dashboard';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { ForgotPassword } from '../pages/ForgotPassword';
import { RecoverPassword } from '../pages/RecoverPassword';

export const RouterList = () => {

    const logged = useAppSelector(state => state.LoggedReducer.status);

    return useRoutes([
        {path: '/', element: <Home />},
        {path: '/signin', element: <Signin />},
        {path: '/dashboard', element: logged ? <Dashboard /> : <Signin />},
        {path: '/forgotpassword', element: <ForgotPassword />},
        {path: '/recoverpassword', element: <RecoverPassword />},
    ]);
};