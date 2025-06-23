"use client";

import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Tag, 
  List, 
  Row, 
  Col, 
  Typography, 
  Space,
  Divider,
  Select,
  Tabs,
  Layout
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  VideoCameraOutlined,
  BellOutlined,
  StarOutlined,
  DollarOutlined,
  SettingOutlined,
  PlusOutlined,
  UserAddOutlined
} from '@ant-design/icons';
// Make sure the file exists at this path, or update the path if needed
// import SideHeader from '../component/sideheader';
import Header from "../../Admin/components/header"

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Sider, Content } = Layout;

const DoctorDashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Sample data for appointments
  const appointmentData = [
    {
      key: '1',
      id: '#Apt0001',
      name: 'Adrian Marshall',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=50',
      time: '11 Nov 2024 10.45 AM',
      type: 'General',
      typeColor: '#1890ff'
    },
    {
      key: '2',
      id: '#Apt0002', 
      name: 'Kelly Stevens',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1-af?w=40&h=40&fit=crop&crop=face&round=50',
      time: '10 Nov 2024 11.00 AM',
      type: 'Clinic Consulting',
      typeColor: '#1890ff'
    },
    {
      key: '3',
      id: '#Apt0003',
      name: 'Samuel Anderson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=50',
      time: '03 Nov 2024 02.00 PM',
      type: 'General',
      typeColor: '#1890ff'
    },
    {
      key: '4',
      id: '#Apt0004',
      name: 'Catherine Griffin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=50',
      time: '01 Nov 2024 04.00 PM',
      type: 'Clinic Consulting',
      typeColor: '#1890ff'
    },
    {
      key: '5',
      id: '#Apt0005',
      name: 'Robert Hutchinson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&round=50',
      time: '28 Oct 2024 05.30 PM',
      type: 'General',
      typeColor: '#1890ff'
    }
  ];

  const recentPatientsData = [
    {
      key: '1',
      id: 'P0001',
      name: 'Adrian Marshall',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&round=50',
      lastAppointment: 'Last Appointment 15 Mar 2024'
    },
    {
      key: '2',
      id: 'P0002',
      name: 'Kelly Stevens', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=60&h=60&fit=crop&crop=face&round=50',
      lastAppointment: 'Last Appointment 13 Mar 2024'
    }
  ];

  const invoiceData = [
    {
      key: '1',
      id: '#Apt0001',
      name: 'Adrian',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=50',
      amount: '$450',
      paidOn: '11 Nov 2024'
    },
    {
      key: '2',
      id: '#Apt0002',
      name: 'Kelly',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=40&h=40&fit=crop&crop=face&round=50',
      amount: '$500',
      paidOn: '10 Nov 2024'
    },
    {
      key: '3',
      id: '#Apt0003',
      name: 'Samuel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=50',
      amount: '$320',
      paidOn: '03 Nov 2024'
    },
    {
      key: '4',
      id: '#Apt0004',
      name: 'Catherine',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=50',
      amount: '$240',
      paidOn: '01 Nov 2024'
    },
    {
      key: '5',
      id: '#Apt0005',
      name: 'Robert',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&round=50',
      amount: '$380',
      paidOn: '28 Oct 2024'
    }
  ];

  const appointmentColumns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 60,
      render: (avatar: string | Blob | undefined, record: { id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <div>
            <div style={{ color: '#1890ff', fontSize: '12px', fontWeight: '500' }}>{record.id}</div>
            <div style={{ fontWeight: '500', fontSize: '14px' }}>{record.name}</div>
          </div>
        </div>
      )
    },
    {
      title: '',
      dataIndex: 'time',
      key: 'time',
      render: (time: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, record: { typeColor: string | (string & {}) | undefined; type: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
        <div>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>{time}</div>
          <Tag color={record.typeColor} style={{ fontSize: '11px' }}>{record.type}</Tag>
        </div>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 80,
      render: () => (
        <Space>
          <Button 
            type="text" 
            shape="circle" 
            icon={<CheckCircleOutlined />} 
            style={{ color: '#52c41a', borderColor: '#52c41a' }}
          />
          <Button 
            type="text" 
            shape="circle" 
            icon={<CloseCircleOutlined />} 
            style={{ color: '#ff4d4f', borderColor: '#ff4d4f' }}
          />
        </Space>
      )
    }
  ];

  const ChartData = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const values = [40, 38, 15, 43, 32, 45, 62];
    const colors = ['#1890ff', '#1890ff', '#1890ff', '#faad14', '#1890ff', '#1890ff', '#1890ff'];
    
    return (
      <div style={{ display: 'flex', alignItems: 'end', height: '120px', gap: '8px', justifyContent: 'center' }}>
        {values.map((value, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div 
              style={{ 
                width: '20px', 
                height: `${value}px`, 
                backgroundColor: colors[index],
                borderRadius: '2px'
              }}
            />
            <Text style={{ fontSize: '11px', color: '#8c8c8c' }}>{days[index]}</Text>
          </div>
        ))}
      </div>
    );
  };

  const handleAddWalkin = () => {
    window.location.href = '/Receptionist/walk-in/page';
  };

  // Check window size for responsive behavior
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header />
      
      <Layout>
        {/* Sidebar - Hide on mobile */}
        {!isMobile && (
          <Sider 
            width={250} 
            style={{ 
              background: '#fff', 
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 100,
              paddingTop: '64px' // Adjust based on your header height
            }}
          >
            {/* <SideHeader /> */}
          </Sider>
        )}

        {/* Main Content */}
        <Layout style={{ marginLeft: isMobile ? 0 : 250 }}>
          <Content style={{ 
            padding: isMobile ? '16px 12px' : '24px', 
            backgroundColor: '#f5f5f5', 
            minHeight: '100vh', 
            marginTop: '84px' 
          }}>
            {/* Add Walk-in Button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <Title level={2} style={{ margin: 0, fontSize: isMobile ? '20px' : '24px' }}>
              Receptionist Dashboard
              </Title>
              <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={() => window.location.href = '/Receptionist/walk-in'}
              size={isMobile ? 'middle' : 'large'}
              style={{
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              >
              Add Walk-in
              </Button>
            </div>

            <Row gutter={[16, 16]}>
              {/* Top Stats Cards */}
              <Col xs={24} sm={12} md={6}>
                <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <Text type="secondary" style={{ fontSize: '14px' }}>Total Patient</Text>
                      <div style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#2c5aa0', margin: '8px 0' }}>978</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: '#52c41a' }}>↗</span>
                        <Text style={{ color: '#52c41a', fontSize: '12px' }}>15% From Last Week</Text>
                      </div>
                    </div>
                    <div style={{ 
                      width: isMobile ? '50px' : '60px', 
                      height: isMobile ? '50px' : '60px', 
                      backgroundColor: '#f0f5ff', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <UserOutlined style={{ fontSize: isMobile ? '24px' : '28px', color: '#2c5aa0' }} />
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <Text type="secondary" style={{ fontSize: '14px' }}>Patients Today</Text>
                      <div style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#2c5aa0', margin: '8px 0' }}>80</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: '#ff4d4f' }}>↗</span>
                        <Text style={{ color: '#ff4d4f', fontSize: '12px' }}>15% From Yesterday</Text>
                      </div>
                    </div>
                    <div style={{ 
                      width: isMobile ? '50px' : '60px', 
                      height: isMobile ? '50px' : '60px', 
                      backgroundColor: '#f0f5ff', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <UserOutlined style={{ fontSize: isMobile ? '24px' : '28px', color: '#2c5aa0' }} />
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <Text type="secondary" style={{ fontSize: '14px' }}>Appointments Today</Text>
                      <div style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#2c5aa0', margin: '8px 0' }}>50</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: '#52c41a' }}>↗</span>
                        <Text style={{ color: '#52c41a', fontSize: '12px' }}>20% From Yesterday</Text>
                      </div>
                    </div>
                    <div style={{ 
                      width: isMobile ? '50px' : '60px', 
                      height: isMobile ? '50px' : '60px', 
                      backgroundColor: '#f0f5ff', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CalendarOutlined style={{ fontSize: isMobile ? '24px' : '28px', color: '#2c5aa0' }} />
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Text style={{ fontSize: '16px', fontWeight: '500' }}>Weekly Overview</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>Mar 14 - Mar 21</Text>
                    </div>
                    <Tabs defaultActiveKey="1" size="small">
                      <TabPane tab="Revenue" key="1">
                        <ChartData />
                      </TabPane>
                      <TabPane tab="Appointments" key="2">
                        <ChartData />
                      </TabPane>
                    </Tabs>
                  </div>
                </Card>
              </Col>

              {/* Main Content */}
              <Col xs={24} lg={16}>
                {/* Appointments Table */}
                <Card 
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Appointment</Text>
                      <Select defaultValue="Last 7 Days" style={{ width: 120 }}>
                        <Option value="Last 7 Days">Last 7 Days</Option>
                      </Select>
                    </div>
                  }
                  style={{ marginBottom: '16px', borderRadius: '12px' }}
                >
                  <Table 
                    columns={appointmentColumns} 
                    dataSource={appointmentData}
                    pagination={false}
                    showHeader={false}
                    rowClassName={() => 'appointment-row'}
                    scroll={{ x: 'max-content' }}
                  />
                </Card>

                {/* Upcoming Appointment Card */}
                <Card 
                  title={<Text style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>Upcoming Appointment</Text>}
                  style={{ 
                    background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}
                  styles={{ header: { backgroundColor: 'transparent', borderBottom: 'none' } }}
                  bodyStyle={{ backgroundColor: 'transparent' }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: isMobile ? 'flex-start' : 'center', 
                    gap: '16px',
                    flexDirection: isMobile ? 'column' : 'row'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&round=50" 
                        alt="Adrian Marshall" 
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#1890ff', fontSize: '12px', fontWeight: '500', marginBottom: '2px' }}>#Apt0001</div>
                        <Text style={{ color: 'white', fontSize: '18px', fontWeight: '600', display: 'block' }}>Adrian Marshall</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
                          <Text style={{ color: 'white', fontSize: '14px' }}>General Visit</Text>
                          <Text style={{ color: 'white', fontSize: '14px' }}>Today, 10:45 AM</Text>
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      flexWrap: 'wrap',
                      justifyContent: isMobile ? 'center' : 'flex-end'
                    }}>
                      <Button 
                        type="primary" 
                        ghost 
                        icon={<VideoCameraOutlined />}
                        style={{ borderColor: 'white', color: 'white' }}
                        size={isMobile ? 'small' : 'middle'}
                      >
                        {isMobile ? 'Video' : 'Video Appointment'}
                      </Button>
                      <Button 
                        type="primary" 
                        ghost
                        style={{ borderColor: 'white', color: 'white' }}
                        size={isMobile ? 'small' : 'middle'}
                      >
                        Chat Now
                      </Button>
                      <Button 
                        type="primary" 
                        ghost
                        style={{ borderColor: 'white', color: 'white' }}
                        size={isMobile ? 'small' : 'middle'}
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Recent Invoices */}
                <Card 
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Recent Invoices</Text>
                      <Button type="link">View All</Button>
                    </div>
                  }
                  style={{ borderRadius: '12px' }}
                >
                  <List
                    dataSource={invoiceData}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px', 
                          width: '100%',
                          flexWrap: isMobile ? 'wrap' : 'nowrap'
                        }}>
                          <img src={item.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                          <div style={{ flex: 1, minWidth: '120px' }}>
                            <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                            <div style={{ color: '#1890ff', fontSize: '12px' }}>{item.id}</div>
                          </div>
                          <div style={{ textAlign: 'center', minWidth: '80px' }}>
                            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Amount</div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.amount}</div>
                          </div>
                          <div style={{ textAlign: 'center', minWidth: '100px' }}>
                            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Paid On</div>
                            <div style={{ fontSize: '12px', color: '#1890ff' }}>{item.paidOn}</div>
                          </div>
                          <Button type="text" icon={<SettingOutlined />} />
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              {/* Right Sidebar */}
              <Col xs={24} lg={8}>
                {/* Recent Patients */}
                <Card 
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Recent Patients</Text>
                      <Button type="link">View All</Button>
                    </div>
                  }
                  style={{ marginBottom: '16px', borderRadius: '12px' }}
                >
                  <div style={{ 
                    display: 'flex', 
                    gap: '16px',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'center' : 'flex-start'
                  }}>
                    {recentPatientsData.map((patient) => (
                      <div key={patient.key} style={{ textAlign: 'center', flex: 1 }}>
                        <img 
                          src={patient.avatar} 
                          alt={patient.name}
                          style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '8px' }}
                        />
                        <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>{patient.name}</div>
                        <div style={{ color: '#1890ff', fontSize: '12px', marginBottom: '4px' }}>Patient ID : {patient.id}</div>
                        <div style={{ fontSize: '11px', color: '#8c8c8c' }}>{patient.lastAppointment}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Notifications */}
                <Card 
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>Notifications</Text>
                      <Button type="link">View All</Button>
                    </div>
                  }
                  style={{ marginBottom: '16px', borderRadius: '12px' }}
                >
                  <List
                    size="small"
                    dataSource={[
                      {
                        icon: <BellOutlined style={{ color: '#722ed1' }} />,
                        title: 'Booking Confirmed on 21 Mar 2024 10:30 AM',
                        time: 'Just Now',
                        bgColor: '#f9f0ff'
                      },
                      {
                        icon: <StarOutlined style={{ color: '#1890ff' }} />,
                        title: 'You have a New Review for your Appointment',
                        time: '5 Days ago',
                        bgColor: '#f0f5ff'
                      },
                      {
                        icon: <CalendarOutlined style={{ color: '#ff4d4f' }} />,
                        title: 'You have Appointment with Ahmed by 01:20 PM',
                        time: '12:55 PM',
                        bgColor: '#fff2f0'
                      },
                      {
                        icon: <DollarOutlined style={{ color: '#faad14' }} />,
                        title: 'Sent an amount of $200 for an Appointment by 01:20 PM',
                        time: '2 Days ago',
                        bgColor: '#fffbe6'
                      },
                      {
                        icon: <StarOutlined style={{ color: '#1890ff' }} />,
                        title: 'You have a New Review for your Appointment',
                        time: '5 Days ago',
                        bgColor: '#f0f5ff'
                      }
                    ]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '12px 0', borderBottom: 'none' }}>
                        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            backgroundColor: item.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {item.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <Text style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>{item.title}</Text>
                            <Text type="secondary" style={{ fontSize: '11px' }}>{item.time}</Text>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>

                {/* Clinics & Availability */}
                <Card 
                  title={<Text style={{ fontSize: '18px', fontWeight: '600' }}>Clinics & Availability</Text>}
                  style={{ borderRadius: '12px' }}
                >
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=50&h=50&fit=crop&crop=center" 
                        alt="clinic" 
                        style={{ width: '50px', height: '50px', borderRadius: '8px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ fontSize: '14px' }}>Sofi's Clinic</Text>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c5aa0' }}>$900</div>
                      </div>
                      <Button type="link" size="small">Change</Button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', lineHeight: '1.4' }}>
                      <div><strong>Tue :</strong> 07:00 AM - 09:00 PM</div>
                      <div><strong>Wed :</strong> 07:00 AM - 09:00 PM</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=50&h=50&fit=crop&crop=center" 
                        alt="clinic" 
                        style={{ width: '50px', height: '50px', borderRadius: '8px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ fontSize: '14px' }}>The Family Dentistry Clinic</Text>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c5aa0' }}>$600</div>
                      </div>
                      <Button type="link" size="small">Change</Button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', lineHeight: '1.4' }}>
                      <div><strong>Sat :</strong> 07:00 AM - 09:00 PM</div>
                      <div><strong>Tue :</strong> 07:00 AM - 09:00 PM</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <style jsx>{`
              .appointment-row:hover {
                background-color: #f5f5f5;
              }
              .ant-card {
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
              }
              .ant-list-item {
                border-bottom: none !important;
              }
            `}</style>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DoctorDashboardPage;