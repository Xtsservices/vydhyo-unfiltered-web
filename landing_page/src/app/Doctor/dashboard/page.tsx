"use client";

import React, { useState } from 'react';
import SideHeader from '../components/sideheader';
import AppHeader from '../../Admin/components/header';
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
  Layout,
  Menu,
  Avatar,
  Modal,
  Form,
  Input,
  Upload,
  message,
  DatePicker,
  Spin
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
  DashboardOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  EyeOutlined,
  UploadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Content, Sider, Header } = Layout;

interface ReceptionistFormValues {
  firstname: string;
  lastname: string;
  gender: string;
  DOB: string;
  mobile: string;
  profilePic?: string;
}

interface AppointmentData {
  key: string;
  id: string;
  name: string;
  avatar: string;
  time: string;
  type: string;
  typeColor: string;
}

interface RecentPatient {
  key: string;
  id: string;
  name: string;
  avatar: string;
  lastAppointment: string;
}

interface InvoiceData {
  key: string;
  id: string;
  name: string;
  avatar: string;
  amount: string;
  paidOn: string;
}

const AddReceptionistModal: React.FC<{
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: ReceptionistFormValues) => Promise<void>;
}> = ({ isOpen, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Create a regular object instead of FormData
      const receptionistData: ReceptionistFormValues = {
        firstname: values.firstname,
        lastname: values.lastname,
        gender: values.gender,
        DOB: dayjs(values.DOB).format('DD-MM-YYYY'),
        mobile: values.mobile,
        // For now, we'll skip the profile picture or convert it to base64 if needed
        // profilePic: fileList.length > 0 ? fileList[0].originFileObj : undefined
      };

      console.log('Form Values:', receptionistData);
      await onSubmit(receptionistData);
      form.resetFields();
      setFileList([]);
      onCancel();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error?.message) {
        message.error(error.message);
      } else {
        message.error('Failed to add receptionist');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
    return Promise.resolve();
  };

  const validateMobile = (_: any, value: string) => {
    if (!value) {
      return Promise.reject('Please enter mobile number');
    }
    if (!/^[0-9]{10}$/.test(value)) {
      return Promise.reject('Please enter a valid 10-digit mobile number');
    }
    if (!/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject('Mobile number must start with 6, 7, 8, or 9');
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Add Receptionist"
      open={isOpen}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      width={700}
      centered
      okText="Submit"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                { required: true, message: 'Please enter first name' },
                { min: 2, message: 'First name must be at least 2 characters' },
                { max: 30, message: 'First name cannot exceed 30 characters' },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'First name should contain only letters',
                },
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
                { required: true, message: 'Please enter last name' },
                { min: 2, message: 'Last name must be at least 2 characters' },
                { max: 30, message: 'Last name cannot exceed 30 characters' },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Last name should contain only letters',
                },
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender' }]}
            >
              <Select placeholder="Select gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="DOB"
              label="Date of Birth"
              rules={[{ required: true, message: 'Please select date of birth' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD-MM-YYYY"
                disabledDate={(current) => {
                  return current && current > dayjs().endOf('day');
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="mobile"
              label="Mobile Number"
              rules={[{ validator: validateMobile }]}
              validateFirst={true}
            >
              <Input placeholder="Enter mobile number" maxLength={10} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const DoctorDashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAddReceptionistModalOpen, setIsAddReceptionistModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample data for appointments
  const appointmentData: AppointmentData[] = [
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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1af?w=40&h=40&fit=crop&crop=face&round=50',
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

  const recentPatientsData: RecentPatient[] = [
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

  const invoiceData: InvoiceData[] = [
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
      render: (avatar: string, record: AppointmentData) => (
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
      render: (time: string, record: AppointmentData) => (
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

  const handleAddReceptionist = async (receptionistData: ReceptionistFormValues) => {
    try {
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
      console.log('Token:', token);
      console.log('Sending data:', receptionistData);

      const response = await axios.post(
        'http://localhost:3001/doctor/createReceptionist',
        receptionistData, // Send as regular object
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' // Set content type to JSON
          }
        }
      );

      // If response is successful
      console.log('Receptionist created:', response.data);
      message.success('Receptionist added successfully!');
    } catch (error: any) {
      console.error('Error creating receptionist:', error);

      // Better error handling
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Server error occurred';
        message.error(errorMessage);
      } else if (error.request) {
        // Network error
        message.error('Network error. Please check your connection.');
      } else {
        // Other error
        message.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AppHeader />
    <Layout style={{ minHeight: '100vh',marginTop: '70px' }}>
      <Layout>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Title level={4} style={{ margin: 0, marginLeft: '16px' }}>
              Dashboard
            </Title>
          </div>

          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ borderRadius: '6px' }}
              onClick={() => setIsAddReceptionistModalOpen(true)}
            >
              Add Receptionist
            </Button>
            <Button
              icon={<EyeOutlined />}
              style={{ borderRadius: '6px' }}
            >
              View Receptionist
            </Button>
          </Space>
        </Header>

        <AddReceptionistModal
          isOpen={isAddReceptionistModalOpen}
          onCancel={() => setIsAddReceptionistModalOpen(false)}
          onSubmit={handleAddReceptionist}
        />

        <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
          <Spin spinning={loading}>
            <Row gutter={[16, 16]}>
              {/* First Row - Stats Cards and Appointments Table */}
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  {/* Left - Three Stats Cards Vertically */}
                  <Col span={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <Text type="secondary" style={{ fontSize: '14px' }}>Total Patient</Text>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c5aa0', margin: '8px 0' }}>978</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ color: '#52c41a' }}>↗</span>
                              <Text style={{ color: '#52c41a', fontSize: '12px' }}>15% From Last Week</Text>
                            </div>
                          </div>
                          <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#f0f5ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <UserOutlined style={{ fontSize: '28px', color: '#2c5aa0' }} />
                          </div>
                        </div>
                      </Card>

                      <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <Text type="secondary" style={{ fontSize: '14px' }}>Patients Today</Text>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c5aa0', margin: '8px 0' }}>80</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ color: '#ff4d4f' }}>↗</span>
                              <Text style={{ color: '#ff4d4f', fontSize: '12px' }}>15% From Yesterday</Text>
                            </div>
                          </div>
                          <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#f0f5ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <UserOutlined style={{ fontSize: '28px', color: '#2c5aa0' }} />
                          </div>
                        </div>
                      </Card>

                      <Card style={{ borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <Text type="secondary" style={{ fontSize: '14px' }}>Appointments Today</Text>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c5aa0', margin: '8px 0' }}>50</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ color: '#52c41a' }}>↗</span>
                              <Text style={{ color: '#52c41a', fontSize: '12px' }}>20% From Yesterday</Text>
                            </div>
                          </div>
                          <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#f0f5ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <CalendarOutlined style={{ fontSize: '28px', color: '#2c5aa0' }} />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Col>

                  {/* Right - Appointments Table */}
                  <Col span={18}>
                    <Card
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ fontSize: '18px', fontWeight: '600' }}>Appointment</Text>
                          <Select defaultValue="Last 7 Days" style={{ width: 120 }}>
                            <Option value="Last 7 Days">Last 7 Days</Option>
                          </Select>
                        </div>
                      }
                      style={{ borderRadius: '12px', height: 'fit-content' }}
                    >
                      <Table
                        columns={appointmentColumns}
                        dataSource={appointmentData}
                        pagination={false}
                        showHeader={false}
                        rowClassName={() => 'appointment-row'}
                      />
                    </Card>
                  </Col>
                </Row>
              </Col>

              {/* Second Row - Weekly Overview and Upcoming Appointments */}
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
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

                  <Col span={12}>
                    <Card
                      title={<Text style={{ fontSize: '18px', fontWeight: '600' }}>Upcoming Appointment</Text>}
                      style={{ borderRadius: '12px', backgroundColor: '#1890ff', color: 'white' }}
                      headStyle={{ backgroundColor: '#1890ff', borderBottom: 'none' }}
                      bodyStyle={{ backgroundColor: '#1890ff' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&round=50"
                          alt="patient"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                        <div style={{ color: 'white' }}>
                          <div style={{ fontWeight: '500', fontSize: '16px' }}>Adrian Marshall</div>
                          <div style={{ fontSize: '14px', opacity: 0.8 }}>Today, 10:45 AM</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <Button style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>
                          <VideoCameraOutlined /> Video Appointment
                        </Button>
                        <Button style={{ backgroundColor: 'white', color: '#1890ff' }}>
                          Chat Now
                        </Button>
                        <Button style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>
                          Start Appointment
                        </Button>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>

              {/* Third Row - Recent Patients and Recent Invoices */}
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: '18px', fontWeight: '600' }}>Recent Patients</Text>
                          <Button type="link">View All</Button>
                        </div>
                      }
                      style={{ borderRadius: '12px' }}
                    >
                      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
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
                  </Col>

                  <Col span={12}>
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
                        dataSource={invoiceData.slice(0, 3)}
                        renderItem={(item) => (
                          <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                              <img src={item.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                                <div style={{ color: '#1890ff', fontSize: '12px' }}>{item.id}</div>
                              </div>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Amount</div>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.amount}</div>
                              </div>
                              <div style={{ textAlign: 'center' }}>
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
                </Row>
              </Col>

              {/* Fourth Row - Notifications and Clinics & Availability */}
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: '18px', fontWeight: '600' }}>Notifications</Text>
                          <Button type="link">View All</Button>
                        </div>
                      }
                      style={{ borderRadius: '12px' }}
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
                                justifyContent: 'center'
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
                  </Col>

                  <Col span={12}>
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
              </Col>
            </Row>
          </Spin>
        </Content>
      </Layout>

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
        .ant-layout-sider {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
        }
        .ant-menu-item:hover {
          background-color: #f0f5ff !important;
        }
        .ant-menu-item-selected {
          background-color: #e6f7ff !important;
        }
      `}</style>
    </Layout></>
    
  );
};

export default DoctorDashboardPage;