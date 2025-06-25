"use client";

import React, { useState } from "react";
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
  DatePicker,
  Modal,
  Avatar,
  Badge,
  Tooltip,
  Drawer,
  Progress,
} from "antd";
const { Option } = Select;
import dayjs from "dayjs";
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
  UserAddOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  UserDeleteOutlined,
  TeamOutlined,
  FilterOutlined,
  EyeOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Content } = Layout;

interface Appointment {
  key: string;
  id: string;
  name: string;
  avatar: string;
  time?: string;
  type: string;
  status?: string;
  doctor?: string;
  reason?: string;
  originalTime?: string;
  newTime?: string;
  lastVisit?: string;
  nextFollowUp?: string;
  specialty?: string;
  experience?: string;
  rating?: number;
  availableToday?: boolean;
  nextAppointment?: string;
  totalToday?: number;
}

interface DashboardCard {
  id: string;
  title: string;
  count: number;
  change: string;
  trend: "up" | "down" | "neutral";
  color: string;
  icon: React.ReactNode;
  data: Appointment[];
  percent?: number;
}

const ReceptionistDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCard, setSelectedCard] = useState<DashboardCard | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);

  const Router = useRouter();

  // --- Sample Data (same as before, omitted for brevity) ---
  // ... (copy your data arrays here, unchanged) ...

  // For brevity, only showing the dashboardCards array with percent for charts
  const dashboardCards: DashboardCard[] = [
    {
      id: "total",
      title: "Total Appointments",
      count: 156,
      change: "+12%",
      trend: "up",
      color: "#1890ff",
      icon: <CalendarOutlined />,
      data: [], // fill with your data
      percent: 80,
    },
    {
      id: "upcoming",
      title: "Upcoming Appointments",
      count: 23,
      change: "Next 24 hours",
      trend: "neutral",
      color: "#faad14",
      icon: <ClockCircleOutlined />,
      data: [],
      percent: 60,
    },
    {
      id: "cancelled",
      title: "Cancelled Appointments",
      count: 8,
      change: "-5%",
      trend: "down",
      color: "#ff4d4f",
      icon: <CloseCircleOutlined />,
      data: [],
      percent: 20,
    },
    {
      id: "reschedule",
      title: "Reschedule Appointments",
      count: 12,
      change: "Pending reschedule",
      trend: "neutral",
      color: "#722ed1",
      icon: <ReloadOutlined />,
      data: [],
      percent: 30,
    },
    {
      id: "new",
      title: "New Appointments",
      count: 34,
      change: "+18%",
      trend: "up",
      color: "#52c41a",
      icon: <PlusOutlined />,
      data: [],
      percent: 50,
    },
    {
      id: "followup",
      title: "Follow Up",
      count: 19,
      change: "Due this week",
      trend: "neutral",
      color: "#13c2c2",
      icon: <UserOutlined />,
      data: [],
      percent: 40,
    },
    {
      id: "doctors",
      title: "Doctor Availability",
      count: 3,
      change: "2 Available",
      trend: "neutral",
      color: "#1890ff",
      icon: <TeamOutlined />,
      data: [],
      percent: 66,
    },
    {
      id: "doctorlist",
      title: "Doctor List",
      count: 8,
      change: "6 Available today",
      trend: "neutral",
      color: "#fa8c16",
      icon: <UserDeleteOutlined />,
      data: [],
      percent: 75,
    },
  ];

  // --- Responsive ---
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleCardClick = (card: DashboardCard) => {
    setSelectedCard(card);
    setDrawerVisible(true);
  };

  const handleWalkinbutton = () => {
    Router.push("/Receptionist/walk-in");
  };

  // --- Render ---
  return (
    <>
        <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Content
        style={{
          padding: isMobile ? "16px 12px" : "24px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Title
            level={2}
            style={{ margin: 0, fontSize: isMobile ? "20px" : "24px" }}
          >
            Receptionist Dashboard
          </Title>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            size={isMobile ? "middle" : "large"}
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={handleWalkinbutton}
          >
            Add Walk-in
          </Button>
        </div>

        {/* Dashboard Cards with Pie/Bar Graphs */}
        <Row gutter={[16, 16]}>
          {dashboardCards.map((card, idx) => (
            <Col xs={24} sm={12} lg={6} key={card.id}>
              <Card
                className="dashboard-card"
                hoverable
                onClick={() => handleCardClick(card)}
                style={{
                  borderRadius: "16px",
                  cursor: "pointer",
                  border: `2px solid ${card.color}20`,
                  height: "220px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s",
                  overflow: "hidden",
                  background: "#fff",
                  position: "relative",
                }}
                bodyStyle={{ padding: "20px" }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <div
                    style={{
                      backgroundColor: `${card.color}15`,
                      padding: "12px",
                      borderRadius: "8px",
                      marginRight: "12px",
                      fontSize: 24,
                      color: card.color,
                      boxShadow: `0 2px 8px ${card.color}10`,
                      transition: "background 0.3s",
                    }}
                  >
                    {card.icon}
                  </div>
                  <Text style={{ fontSize: "15px", color: "#8c8c8c", fontWeight: 500 }}>
                    {card.title}
                  </Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Progress
                    type="circle"
                    percent={card.percent}
                    width={60}
                    strokeColor={card.color}
                    strokeWidth={10}
                    trailColor="#f0f0f0"
                    format={percent => (
                      <span style={{ color: card.color, fontWeight: 700, fontSize: 18 }}>
                        {card.count}
                      </span>
                    )}
                    style={{
                      transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
                      boxShadow: `0 0 0 4px ${card.color}10`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Progress
                      percent={card.percent}
                      showInfo={false}
                      strokeColor={card.color}
                      trailColor="#f0f0f0"
                      style={{
                        marginBottom: 8,
                        transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {card.trend === "up" && (
                        <RiseOutlined style={{ color: "#52c41a", fontSize: "14px" }} />
                      )}
                      {card.trend === "down" && (
                        <FallOutlined style={{ color: "#ff4d4f", fontSize: "14px" }} />
                      )}
                      <Text
                        style={{
                          fontSize: "13px",
                          color:
                            card.trend === "up"
                              ? "#52c41a"
                              : card.trend === "down"
                              ? "#ff4d4f"
                              : "#8c8c8c",
                          fontWeight: 500,
                        }}
                      >
                        {card.change}
                      </Text>
                    </div>
                  </div>
                </div>
                {/* Animated overlay on hover */}
                <div className="card-anim-overlay" />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Detail Drawer */}
        <Drawer
          title={selectedCard?.title}
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={isMobile ? "100%" : "60%"}
          style={{
            backgroundColor: "#f5f5f5",
          }}
          headerStyle={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #f0f0f0",
          }}
          bodyStyle={{
            backgroundColor: "#fff",
            padding: "24px",
          }}
        >
          {/* You can keep your renderDetailedList() here */}
          <div style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Text type="secondary">[Detailed list goes here]</Text>
          </div>
        </Drawer>

        {/* Reschedule Modal */}
        <Modal
          title="Reschedule Appointment"
          open={rescheduleModalVisible}
          onCancel={() => setRescheduleModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setRescheduleModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="confirm" type="primary">
              Confirm Reschedule
            </Button>,
          ]}
        >
          <div style={{ margin: "20px 0" }}>
            <Text strong>Select new date range:</Text>
            <div style={{ marginTop: "12px" }}>
              <RangePicker
                style={{ width: "100%" }}
                onChange={(dates) => setSelectedDateRange(dates)}
                placeholder={["Start Date", "End Date"]}
              />
            </div>
          </div>
        </Modal>

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
                      <Select defaultValue="Last 7 Days" style={{ minWidth: 120 }}>
                        <Select.Option value="Last 7 Days">Last 7 Days</Select.Option>
                        <Select.Option value="Last 30 Days">Last 30 Days</Select.Option>
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

            <style>{`
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
    </>
  );
};

export default ReceptionistDashboard;
