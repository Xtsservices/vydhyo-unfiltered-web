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

        <style jsx global>{`
          .dashboard-card:hover {
            transform: translateY(-6px) scale(1.03);
            box-shadow: 0 8px 32px rgba(24, 144, 255, 0.08);
          }
          .dashboard-card .card-anim-overlay {
            pointer-events: none;
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            background: linear-gradient(120deg, rgba(24,144,255,0.04) 0%, rgba(255,255,255,0.0) 100%);
            opacity: 0;
            transition: opacity 0.4s;
            z-index: 1;
          }
          .dashboard-card:hover .card-anim-overlay {
            opacity: 1;
          }
        `}</style>
      </Content>
    </Layout>
  );
};

export default ReceptionistDashboard;
