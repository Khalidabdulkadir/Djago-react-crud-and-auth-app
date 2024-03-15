import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RootState } from '../redux/store';
import { setAuth } from '../redux/authSlice';
import Sidebar from '../Sidebar';
import Proj from './Proj';

export default function Projects() {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
    const auth = useSelector((state: RootState) => state.auth.value);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('user');

                setUserInfo({ firstName: data.first_name, lastName: data.last_name });

                dispatch(setAuth(true));
            } catch (e) {
                dispatch(setAuth(false));
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="container mt-5 text-center">
            {auth ? (
                <div>
                    <Sidebar userName={`${userInfo.firstName} ${userInfo.lastName}`} />
                    <Proj/>
                </div>
            ) : (
                <div>
                    <h3>You are not authenticated</h3>
                </div>
            )}
        </div>
    );
}
