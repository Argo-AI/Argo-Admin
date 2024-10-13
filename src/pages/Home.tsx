// import React from 'react';
import TopDealsBox from '../components/topDealsBox/TopDealsBox';
import ChartBox from '../components/charts/ChartBox';

import {
  MdGroup,
  MdInventory2,
  MdAssessment,
} from 'react-icons/md';

import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
const Home = () => {


  const [users,setUsers] = useState({
    data: {
      color: 'gold',
      number: '2.6',
      dataKey: 'ratio',
      percentage: 10,
      chartData: [
        {name: 'Sun', ratio: 400},
        {name: 'Mon', ratio: 600},
        {name: 'Tue', ratio: 500},
        {name: 'Wed', ratio: 700},
        {name: 'Thu', ratio: 400},
        {name: 'Fri', ratio: 500},
        {name: 'Sat', ratio: 450},
      ],
    },
    isLoading: true,
    isSuccess: true,
  });
  const [activeUsers,setActiveUsers] = useState({
    data: {
      color: 'gold',
      number: '2.6',
      dataKey: 'ratio',
      percentage: 50,
      chartData: [
        {name: 'Sun', ratio: 400},
        {name: 'Mon', ratio: 600},
        {name: 'Tue', ratio: 500},
        {name: 'Wed', ratio: 700},
        {name: 'Thu', ratio: 400},
        {name: 'Fri', ratio: 500},
        {name: 'Sat', ratio: 450},
      ],
    },
    isLoading: true,
    isSuccess: true,
  });
  const [inactiveUsers,setInActiveUsers] = useState({
    data: {
      color: 'gold',
      number: '2.6',
      dataKey: 'ratio',
      percentage: 50,
      chartData: [
        {name: 'Sun', ratio: 400},
        {name: 'Mon', ratio: 600},
        {name: 'Tue', ratio: 500},
        {name: 'Wed', ratio: 700},
        {name: 'Thu', ratio: 400},
        {name: 'Fri', ratio: 500},
        {name: 'Sat', ratio: 450},
      ],
    },
    isLoading: true,
    isSuccess: true,
  });

  const navigate = useNavigate();

  useEffect(()=>{
     if(!localStorage.getItem('user')){
       navigate('/login');
     }
     const user = localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user') || '{}') : null;
     if(user){
       getDashboardCount();
     }

  },[])

  const getDashboardCount = () => {
    axiosInstance.get('/admin/dashboard/user-count').then((res)=>{
      setUsers({
        ...users,
        data: {
          ...users.data,
          number: res?.data?.data?.nonAdminUsers
        },
        isLoading: false
      })
      setActiveUsers({
        ...activeUsers,
        data: {
          ...activeUsers.data,
          number:res?.data?.data?.activeUsers
        },
        isLoading: false
      })
      setInActiveUsers({
        ...inactiveUsers,
        data: {
          ...inactiveUsers.data,
          number:res?.data?.data?.inActiveUsers
        },
        isLoading: false
      })

    }).catch((err)=>{
      toast(err?.message);
    })
  };



  return (
    // screen
    <div className="home w-full p-0 m-0">
      {/* grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 grid-flow-dense auto-rows-[minmax(200px,auto)] xl:auto-rows-[minmax(150px,auto)] gap-3 xl:gap-3 px-0">
        <div className="box col-span-full sm:col-span-1 xl:col-span-1 row-span-3 3xl:row-span-5">
          <TopDealsBox />
        </div>
        <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
          <ChartBox
            chartType={'line'}
            IconBox={MdGroup}
            title="Total Users"
            {...users.data}
            isLoading={users.isLoading}
            isSuccess={users.isSuccess}
          />
        </div>
        <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
          <ChartBox
              chartType={'line'}
              IconBox={MdAssessment}
              title="Active Users"
              {...activeUsers.data}
              isLoading={activeUsers.isLoading}
              isSuccess={activeUsers.isSuccess}
          />
        </div>
        <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2">
          <ChartBox
            chartType={'line'}
            IconBox={MdInventory2}
            title="In Active Users"
            {...inactiveUsers.data}
            isLoading={inactiveUsers.isLoading}
            isSuccess={inactiveUsers.isSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
