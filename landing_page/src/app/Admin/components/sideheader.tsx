// components/sideheader.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  TeamOutlined, 
  ScheduleOutlined, 
  MoneyCollectOutlined, 
  FileTextOutlined, 
  SettingOutlined,
  HomeOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

export const SideHeader = () => {
  const router = useRouter();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard')
    },
    {
      key: 'doctors',
      icon: <TeamOutlined />,
      label: 'Doctors',
      onClick: () => router.push('/doctors')
    },
    {
      key: 'patients',
      icon: <UserOutlined />,
      label: 'Patients',
      onClick: () => router.push('/patients')
    },
    {
      key: 'clinics',
      icon: <HomeOutlined />,
      label: 'Clinics',
      onClick: () => router.push('/clinics')
    },
    {
      key: 'appointments',
      icon: <ScheduleOutlined />,
      label: 'Appointments',
      onClick: () => router.push('/appointments')
    },
    {
      key: 'billing',
      icon: <MoneyCollectOutlined />,
      label: 'Billing',
      onClick: () => router.push('/billing')
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
      onClick: () => router.push('/reports')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/settings')
    }
    
  ];

  return (
    <Sider 
      width={200} 
      theme="light"
      style={{
        boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
        borderRight: '1px solid #f0f0f0',marginTop: '5rem', // Adjust based on your header height
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={menuItems}
        style={{ border: 'none' }}
      />
    </Sider>
  );
};