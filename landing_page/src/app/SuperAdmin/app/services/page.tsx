'use client';
import React from 'react';
import { Card, Col, Row, Typography, Layout } from 'antd';
import { ExperimentOutlined, HomeOutlined, BankOutlined, MedicineBoxOutlined, HeartOutlined } from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';

const { Title, Text } = Typography;
const { Content } = Layout;

const services = [
    {
        title: 'Outpatient Services (OP)',
        icon: <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    },
    {
        title: 'Inpatient Services (IP)',
        icon: <BankOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
    },
    {
        title: 'Diagnostics',
        icon: <ExperimentOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
    },
    {
        title: 'Labs',
        icon: <MedicineBoxOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
    },
    {
        title: 'Blood Banks',
        icon: <HeartOutlined style={{ fontSize: '24px', color: '#f5222d' }} />,
    },
];

const Services: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
            <AppHeader />
            <Layout>
                <SideHeader />
                <Content style={{ margin: '32px 24px', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #f0f1f2' }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: 8, marginTop: 10 }}>Our Services</Title>
                    <Text style={{ display: 'block', textAlign: 'center', fontSize: '22px', marginBottom: '2rem', color: '#001f3f' }}>
                        <u>Coming Soon</u>
                    </Text>
                    <Row gutter={[32, 32]} justify="center">
                        {services.map((service, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    bordered={false}
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: 10,
                                        transition: 'box-shadow 0.3s, transform 0.3s',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                    }}
                                    bodyStyle={{ padding: '32px 16px' }}
                                    className="service-card"
                                >
                                    <div style={{ marginBottom: '1rem' }}>{service.icon}</div>
                                    <Text strong style={{ fontSize: 16 }}>{service.title}</Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Content>
            </Layout>
            <style jsx global>{`
                .service-card:hover {
                    box-shadow: 0 4px 16px rgba(24, 144, 255, 0.15);
                    transform: translateY(-6px) scale(1.03);
                    border-color: #1890ff;
                }
            `}</style>
        </Layout>
    );
};

export default Services;
