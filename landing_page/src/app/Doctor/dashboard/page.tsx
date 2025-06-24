"use client";
import React, { useState } from 'react';
import {
  Layout,
  Card,
  Avatar,
  Button,
  List,
  Typography,
  Row,
  Col,
  Menu,
  Badge,
  Statistic,
  Progress,
  Divider,
  Tag,
  Select,
  Space,
  Calendar,
  Timeline,
  notification,
  Table
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined
} from '@ant-design/icons';
import AppHeader from '@/app/Admin/components/header';
import { useRouter } from 'next/navigation';
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
export default function MedicalDashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const router = useRouter();

  // Sample data
  const appointments = [
    {
      id: 1,
      name: 'Adrian Marshall',
      time: '11 Nov 2024 10:45 AM',
      type: 'General Visit',
      status: 'confirmed',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Kelly Stevens',
      time: '10 Nov 2024 11:30 AM',
      type: 'Routine Checkup',
      status: 'confirmed',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'Samuel Anderson',
      time: '09 Nov 2024 02:00 PM',
      type: 'Follow-up',
      status: 'pending',
      avatar: '👨‍💻'
    },
    {
      id: 4,
      name: 'Catherine Griffin',
      time: '07 Nov 2024 04:00 PM',
      type: 'Consultation',
      status: 'completed',
      avatar: '👩‍🦳'
    },
    {
      id: 5,
      name: 'Robert Hutchinson',
      time: '28 Oct 2024 05:30 PM',
      type: 'Surgery',
      status: 'completed',
      avatar: '👨‍🦲'
    }
  ];

  const recentPatients = [
    { name: 'Adrian Marshall', lastVisit: 'Mar 2024', id: 'P0001' },
    { name: 'Kelly Stevens', lastVisit: 'Mar 2024', id: 'P0002' },
    { name: 'Samuel Anderson', lastVisit: 'Mar 2024', id: 'P0003' },
    { name: 'Catherine Griffin', lastVisit: 'Mar 2024', id: 'P0004' },
    { name: 'Robert Hutchinson', lastVisit: 'Feb 2024', id: 'P0005' }
  ];

  const recentInvoices = [
    { patient: 'Adrian', amount: '$450', date: '11 Nov 2024', status: 'paid' },
    { patient: 'Kelly', amount: '$500', date: '10 Nov 2024', status: 'pending' },
    { patient: 'Samuel', amount: '$320', date: '09 Nov 2024', status: 'paid' },
    { patient: 'Catherine', amount: '$245', date: '01 Nov 2024', status: 'overdue' },
    { patient: 'Robert', amount: '$380', date: '28 Oct 2024', status: 'paid' }
  ];

  const notifications = [
    {
      type: 'success',
      title: 'Booking Confirmed',
      message: 'on 21 Mar 2024 10:30 AM',
      time: '1 min ago'
    },
    {
      type: 'info',
      title: 'You have a New Review',
      message: 'for your Appointment',
      time: '2 Days ago'
    },
    {
      type: 'warning',
      title: 'You have Appointment',
      message: 'with Ahmed by 01:20 PM',
      time: '12:56 PM'
    },
    {
      type: 'error',
      title: 'You have missed $200',
      message: 'for an Appointment by 01:20 PM',
      time: '2 Days ago'
    }
  ];

  const clinics = [
    {
      name: "Sofia Clinic",
      price: "$900",
      hours: "07:00 AM - 09:00 PM",
      days: "Tue: 07:00 AM - 09:00 PM, Wed: 07:00 AM - 09:00 PM"
    },
    {
      name: "The Family Dentistry Clinic",
      price: "$600",
      hours: "07:00 AM - 09:00 PM",
      days: "Sat: 07:00 AM - 09:00 PM, Tue: 07:00 AM - 09:00 PM"
    }
  ];

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', path: '/Doctor/dashboard' },
    { key: 'appointments', icon: <CalendarOutlined />, label: 'Appointments', path: '/Doctor/appointments' },
    { key: 'patients', icon: <TeamOutlined />, label: 'My Patients', path: '/Doctor/patients' },
    { key: 'reviews', icon: <UserOutlined />, label: 'Walkin Patients', path: '/Doctor/walkin' },
    { key: 'services', icon: <SettingOutlined />, label: 'Staff Management', path: '/Doctor/staffManagement' },
    { key: 'availability', icon: <DashboardOutlined />, label: 'Availability', path: '/Doctor/availability' },
    { key: 'accounts', icon: <FileTextOutlined />, label: 'Accounts', path: '/Doctor/accounts' },
    { key: 'invoices', icon: <FileTextOutlined />, label: 'Invoices', path: '/Doctor/invoices' },
    { key: 'messages', icon: <MailOutlined />, label: 'Messages', path: '/Doctor/messages' },
    { key: 'logout', icon: <UserOutlined />, label: 'Logout', path: '/logout' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'green';
      case 'pending': return 'orange';
      case 'completed': return 'blue';
      default: return 'default';
    }
  };

  const getInvoiceStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'green';
      case 'pending': return 'orange';
      case 'overdue': return 'red';
      default: return 'default';
    }
  };

  return (

    <>
    <AppHeader />
    <Layout style={{ minHeight: '100vh' ,marginTop: '4rem'}}>
      <Sider width={250} style={{ background: '#fff' }}>
        <div style={{ padding: '20px', textAlign: 'center', background: '#1890ff', color: 'white' }}>
          <Avatar size={64} style={{ marginBottom: '10px' }}>
            <UserOutlined />
          </Avatar>
          <Title level={5} style={{ color: 'white', margin: 0 }}>Dr Edalin Hendry</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
            BDS, MDS - Oral & Maxillofacial Surgery
          </Text>
          <div style={{ marginTop: '10px' }}>
            <Tag color="blue">Dentist</Tag>
          </div>
        </div>



        <Menu
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onSelect={({ key }) => setSelectedMenuItem(key)}
          style={{ borderRight: 0, height: 'calc(100vh - 200px)', overflowY: 'auto' }}
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <span>{item.label}</span>
              {item.badge && <Badge count={item.badge} size="small" style={{ marginLeft: '8px' }} />}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>Dashboard</Title>
          </div>
        
        </Header>

        <Content style={{ margin: '20px', background: '#f0f2f5' }}>
          <Row gutter={[16, 16]}>
            {/* Stats Cards */}
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Patient"
                  value={978}
                  valueStyle={{ color: '#1890ff' }}
                  prefix={<UserOutlined />}
                />
                <div style={{ marginTop: '10px' }}>
                  <Text type="success">+4% From Last Week</Text>
                </div>
              </Card>
            </Col>

            <Col span={6}>
              <Card>
                <Statistic
                  title="Patients Today"
                  value={80}
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<TeamOutlined />}
                />
                <div style={{ marginTop: '10px' }}>
                  <Text type="success">+8% From Yesterday</Text>
                </div>
              </Card>
            </Col>

            <Col span={6}>
              <Card>
                <Statistic
                  title="Appointments Today"
                  value={50}
                  valueStyle={{ color: '#fa8c16' }}
                  prefix={<CalendarOutlined />}
                />
                <div style={{ marginTop: '10px' }}>
                  <Text type="success">+2% From Yesterday</Text>
                </div>
              </Card>
            </Col>

            <Col span={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={4} style={{ margin: 0 }}>Next Appointment</Title>
                  <div style={{ margin: '10px 0' }}>
                    <div>
                      <Text strong>Adrian Marshall</Text>
                      <br />
                      <Text type="secondary">11 Nov 2024 10:45 AM</Text>
                    </div>
                  </div>
                  <Space>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            {/* Appointments List */}
            <Col span={12}>
              <Card title="Appointments" extra={<Button type="link">View All</Button>}>
                <List
                  itemLayout="horizontal"
                  dataSource={appointments}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button type="text" icon={<PhoneOutlined />} />,
                        <Button type="text" icon={<VideoCameraOutlined />} />,
                        <Button type="text" icon={<MoreOutlined />} />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar>{item.avatar}</Avatar>}
                        title={
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>{item.name}</Text>
                            <Tag color={getStatusColor(item.status)}>
                              {item.status}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <Text type="secondary">{item.time}</Text>
                            <br />
                            <Text>{item.type}</Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Weekly Overview Chart */}
            <Col span={12}>
              <Card title="Weekly Overview" extra="Mar 15 - Mar 21">
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', background: '#e6f7ff', marginBottom: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '60px', background: '#1890ff' }}></div>
                    </div>
                    <Text>M</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', background: '#e6f7ff', marginBottom: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '40px', background: '#1890ff' }}></div>
                    </div>
                    <Text>T</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', background: '#e6f7ff', marginBottom: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '80px', background: '#faad14' }}></div>
                    </div>
                    <Text>W</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', background: '#e6f7ff', marginBottom: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '30px', background: '#1890ff' }}></div>
                    </div>
                    <Text>T</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', background: '#e6f7ff', marginBottom: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '70px', background: '#1890ff' }}></div>
                    </div>
                    <Text>F</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', background: '#e6f7ff', marginBottom: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '20px', background: '#1890ff' }}></div>
                    </div>
                    <Text>S</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '100px', background: '#e6f7ff', marginBottom: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '50px', background: '#1890ff' }}></div>
                    </div>
                    <Text>S</Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', background: '#1890ff', marginRight: '8px' }}></div>
                    <Text>Appointments</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', background: '#faad14', marginRight: '8px' }}></div>
                    <Text>Patients</Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            {/* Recent Patients */}
            <Col span={8}>
              <Card title="Recent Patients" extra={<Button type="link">View All</Button>}>
                <List
                  size="small"
                  dataSource={recentPatients}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ background: '#87d068' }}>{item.name.charAt(0)}</Avatar>}
                        title={item.name}
                        description={`Patient ID: ${item.id} | Last Appointment: ${item.lastVisit}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>


          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            {/* Clinics & Availability */}
            <Col span={24}>
              <Card title="Clinics & Availability">
                <Row gutter={16}>
                  {clinics.map((clinic, index) => (
                    <Col span={12} key={index}>
                      <Card size="small" style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <Text strong>{clinic.name}</Text>
                            <br />
                            <Text type="secondary">{clinic.hours}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>{clinic.days}</Text>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>{clinic.price}</Text>
                            <br />
                            <Button size="small" style={{ marginTop: '5px' }}>Change</Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout></>
    
  );
}