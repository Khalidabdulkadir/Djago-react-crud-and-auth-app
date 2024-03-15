import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from './redux/authSlice';
import { RootState } from './redux/store';
import Sidebar from './Sidebar';

export default function Dashboard() {
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
                   <p> Hi {userInfo.firstName} {userInfo.lastName}👋</p>
                    <Sidebar userName={`${userInfo.firstName} ${userInfo.lastName}`} />
                    <div className="upper-Hero">
        <div className="left-hero">
          <h2>Default Dashboard</h2>
          <p>Welcome back, Lucy! We've missed you. 👋</p>
        </div>
        <div className="right-hero">
        <i className="fa-solid fa-recycle right"></i>
      <i className="fa-solid fa-recycle right"/>
          <button className='btn-hero'>
            Today: april 26
          </button>
        </div>
      </div>
      <div className="middle-hero">
      <div className='Sales-today'>
          <div>
            <p>Sales Today</p>
            <button className='sales-btn'>
              Today
            </button>
          </div>
          <h2>2.532</h2>
          <section>
            <span>+26%</span> <p>Since last month</p>
            </section>
        </div>

        <div className='Visitors-today'>
          <div>
            <p>Visitors Today</p>
            <button className='sales-btn'>
              anual
            </button>
          </div>
          <h2>99.532</h2>
          <section>
            <span>-6%</span> <p>Since last month</p>
            </section>
        </div>

        <div className='Earnings-today'>
          <div>
            <p>Total Earnings </p>
            <button className='sales-btn'>
              monthly
            </button>
          </div>
          <h2>868.532</h2>
          <section>
            <span>+16%</span> <p>Since last month</p>
            </section>
        </div>

        <div className='pending-today'>
          <div>
            <p>pending Orders</p>
          </div>
          <h2>47</h2>
          <section>
            <span>-3%</span> <p>Since last month</p>
            </section>
        </div>
      </div>
                   
                </div>
            ) : (
                <div>
                    <h3>You are not authenticated</h3>
                </div>
            )}
        </div>
    );
}
