"use client";

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Input, 
  Button, 
  DatePicker, 
  Tag, 
  Space, 
  Select, 
  Avatar, 
  Modal, 
  Spin, 
  message, 
  Layout, 
  Descriptions, 
  Card, 
  Divider, 
  Row, 
  Col, 
  Image 
} from 'antd';
import { 
  SearchOutlined, 
  CalendarOutlined, 
  EyeOutlined, 
  DownloadOutlined, 
  CheckOutlined, 
  CloseOutlined, 
  UserOutlined, 
  MedicineBoxOutlined, 
  BankOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Header: AntHeader, Content } = Layout;

interface ConsultationFee {
  type: string;
  fee: number;
  currency: string;
  _id: string;
}

interface BankDetails {
  accountNumber: string | null;
  accountHolderName: string | null;
  ifscCode: string | null;
  bankName: string | null;
}

interface Specialization {
  _id: string;
  name: string;
  experience: number;
  id: string;
  drgreeCertificate?: {
    data: string;
    mimeType: string;
  };
  specializationCertificate?: {
    data: string;
    mimeType: string;
  };
}

interface Doctor {
  key: string;
  _id: string;
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  specialization: Specialization[];
  status: string;
  createdAt: string;
  profilepic?: {
    data: string;
    mimeType: string;
  };
  medicalRegistrationNumber: string;
  gender: string | null;
  DOB: string | null;
  bloodgroup: string | null;
  maritalStatus: string | null;
  isVerified: boolean;
  userId?: string;
  role?: string;
  bankDetails: BankDetails;
  consultationModeFee: ConsultationFee[];
  spokenLanguage: string[];
  rejectionReason: string | null;
  language: string;
  relationship: string;
  appLanguage: string;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
  __v: number;
}

const NeedApproval = () => {
  const [searchText, setSearchText] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const applyFilters = (doctorList: Doctor[]) => {
    let filtered = doctorList;

    if (searchText) {
      filtered = filtered.filter(doctor =>
        `${doctor.firstname} ${doctor.lastname}`.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.medicalRegistrationNumber?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(doctor => 
        doctor.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredDoctors(filtered);
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        message.error('No authentication token found. Please login again.');
        return;
      }

      const response = await fetch('http://216.10.251.239:3000/users/AllUsers?type=doctor', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          message.error('Session expired. Please login again.');
          return;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      
      let doctorsData: Doctor[] = [];
      if (data.status === 'success' && data.data) {
        doctorsData = Array.isArray(data.data) ? data.data : [data.data];
      } else if (Array.isArray(data)) {
        doctorsData = data;
      } else {
        doctorsData = data.data || [];
      }
      
      setDoctors(doctorsData.map(doctor => ({
        ...doctor,
        key: doctor._id
      })));
      setFilteredDoctors(doctorsData.map(doctor => ({
        ...doctor,
        key: doctor._id
      })));
      
    } catch (error) {
      console.error('Error fetching doctors:', error);
      message.error('Failed to fetch doctors data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorStatus = async (doctorId: string, newStatus: string) => {
    setUpdatingStatus(doctorId);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        message.error('No authentication token found');
        return;
      }

      const response = await fetch(`http://216.10.251.239:3000/admin/approveDoctor`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: doctorId, 
          status: newStatus === 'active' ? 'Approved' : 'Rejected'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update doctor status');
      }

      const result = await response.json();
      
      const updatedDoctors = doctors.map(doctor => 
        doctor._id === doctorId ? { ...doctor, status: newStatus } : doctor
      );
      
      setDoctors(updatedDoctors);
      applyFilters(updatedDoctors);

      if (selectedDoctor && selectedDoctor._id === doctorId) {
        setSelectedDoctor({...selectedDoctor, status: newStatus});
      }

      message.success(`Doctor ${newStatus === 'active' ? 'approved' : 'rejected'} successfully`);
      
    } catch (error) {
      console.error('Error updating doctor status:', error);
      if (error instanceof Error) {
        message.error(error.message || 'Failed to update doctor status');
      } else {
        message.error('Failed to update doctor status');
      }
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleApprove = (doctorId: string) => {
    Modal.confirm({
      title: 'Approve Doctor',
      content: 'Are you sure you want to approve this doctor?',
      okText: 'Yes, Approve',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk: () => updateDoctorStatus(doctorId, 'active'),
    });
  };

  const handleReject = (doctorId: string) => {
    Modal.confirm({
      title: 'Reject Doctor',
      content: 'Are you sure you want to reject this doctor? This action cannot be undone.',
      okText: 'Yes, Reject',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => updateDoctorStatus(doctorId, 'inactive'),
    });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    applyFilters(doctors);
  }, [searchText, doctors, statusFilter]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageSrc = (imageData: any) => {
    if (imageData && imageData.data && imageData.mimeType) {
      return `data:${imageData.mimeType};base64,${imageData.data}`;
    }
    return null;
  };

  const showImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setImageModalVisible(true);
  };

  const showDoctorDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDetailModalVisible(true);
  };

  const downloadCertificate = (certificate: any, fileName: string) => {
    if (certificate && certificate.data && certificate.mimeType) {
      try {
        const link = document.createElement('a');
        link.href = `data:${certificate.mimeType};base64,${certificate.data}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success('Certificate downloaded successfully');
      } catch (error) {
        message.error('Failed to download certificate');
      }
    } else {
      message.error('Certificate not available');
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'active':
      case 'approved':
        return 'success';
      case 'inactive':
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Doctor',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Doctor) => {
        const imageSrc = getImageSrc(record.profilepic);
        return (
          <Space>
            <Avatar 
              size={40} 
              src={imageSrc}
              style={{ flexShrink: 0 }}
            >
              {!imageSrc && `${record.firstname?.[0] ?? ''}${record.lastname?.[0] ?? ''}`}
            </Avatar>
            <span style={{ fontWeight: 500 }}>
              Dr. {record.firstname || ''} {record.lastname || ''}
            </span>
          </Space>
        );
      },
    },
    {
      title: 'Doctor ID',
      dataIndex: 'medicalRegistrationNumber',
      key: 'medicalRegistrationNumber',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Registered On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag 
          color={getStatusColor(status)}
          style={{ 
            borderRadius: '4px',
            fontWeight: 500,
            border: 'none',
            textTransform: 'capitalize'
          }}
        >
          {status || 'Unknown'}
        </Tag>
      ),
    },
    {
      title: 'Verified',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified: boolean) => (
        <Tag 
          color={isVerified ? 'success' : 'warning'}
          style={{ 
            borderRadius: '4px',
            fontWeight: 500,
            border: 'none'
          }}
        >
          {isVerified ? 'Verified' : 'Pending'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'view',
      render: (text: string, record: Doctor) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />}
          onClick={() => showDoctorDetails(record)}
          style={{ borderRadius: '6px' }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', marginTop: '64px' }}>
      <AntHeader style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: 0,
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
                zIndex: 1,
                height: 'auto',
                lineHeight: 'normal',
                marginTop: '-84px',
            }}>
            <AppHeader />
                <SideHeader/>
            </AntHeader>

      <Content style={{ 
        padding: '24px', 
        backgroundColor: '#fafafa', 
        minHeight: 'calc(100vh - 64px)' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '20px', 
              fontWeight: 600,
              color: '#262626'
            }}>
              Doctor List
            </h2>
            <Space>
              <Input
                placeholder="Search by name, ID, or email"
                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ 
                  width: 350,
                  borderRadius: '6px'
                }}
              />
              <Button 
                onClick={fetchDoctors}
                loading={loading}
                style={{ borderRadius: '6px' }}
              >
                Refresh
              </Button>
            </Space>
          </div>

          {/* Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            marginBottom: '20px',
            alignItems: 'center'
          }}>
            <Select
              placeholder="All Status"
              style={{ width: 120 }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
            </Select>
            
            <RangePicker 
              placeholder={['Start Date', 'End Date']}
              suffixIcon={<CalendarOutlined />}
              style={{ borderRadius: '6px' }}
            />
          </div>

          {/* Table */}
          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={filteredDoctors}
              pagination={{
                current: 1,
                pageSize: 10,
                total: filteredDoctors.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} doctors`,
                style: { marginTop: '20px' }
              }}
              style={{
                backgroundColor: 'white'
              }}
              scroll={{ x: true }}
            />
          </Spin>

          {/* Footer */}
          <div style={{ 
            marginTop: '16px', 
            color: '#8c8c8c', 
            fontSize: '14px' 
          }}>
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </div>
        </div>

        {/* Image Modal */}
        <Modal
          title="Profile Picture"
          open={imageModalVisible}
          onCancel={() => setImageModalVisible(false)}
          footer={null}
          width={600}
          centered
        >
          <div style={{ textAlign: 'center' }}>
            <img 
              src={selectedImage} 
              alt="Profile" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '500px',
                objectFit: 'contain'
              }} 
            />
          </div>
        </Modal>

        {/* Doctor Details Modal */}
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UserOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
              <span style={{ fontSize: '18px', fontWeight: 600 }}>
                Doctor Details - Dr. {selectedDoctor?.firstname} {selectedDoctor?.lastname}
              </span>
            </div>
          }
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          width={1000}
          centered
          footer={
            selectedDoctor && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={() => handleApprove(selectedDoctor._id)}
                  loading={updatingStatus === selectedDoctor._id}
                  disabled={updatingStatus === selectedDoctor._id || selectedDoctor.status?.toLowerCase() === 'active'}
                  style={{ 
                    backgroundColor: selectedDoctor.status?.toLowerCase() === 'active' ? '#d9d9d9' : '#52c41a',
                    borderColor: selectedDoctor.status?.toLowerCase() === 'active' ? '#d9d9d9' : '#52c41a',
                    minWidth: '120px'
                  }}
                >
                  Approve
                </Button>
                <Button 
                  type="primary" 
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => handleReject(selectedDoctor._id)}
                  loading={updatingStatus === selectedDoctor._id}
                  disabled={updatingStatus === selectedDoctor._id || selectedDoctor.status?.toLowerCase() === 'inactive'}
                  style={{ minWidth: '120px' }}
                >
                  Reject
                </Button>
              </div>
            )
          }
        >
          {selectedDoctor && (
            <div style={{ maxHeight: '70vh', overflowY: 'auto', padding: '8px' }}>
              {/* Personal Information */}
              <Card title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserOutlined />
                  <span>Personal Information</span>
                </div>
              } style={{ marginBottom: '16px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <div style={{ textAlign: 'center' }}>
                      <Avatar 
                        size={100} 
                        src={getImageSrc(selectedDoctor.profilepic)}
                        style={{ cursor: getImageSrc(selectedDoctor.profilepic) ? 'pointer' : 'default' }}
                        onClick={getImageSrc(selectedDoctor.profilepic) ? () => showImageModal(getImageSrc(selectedDoctor.profilepic)!) : undefined}
                      >
                        {!getImageSrc(selectedDoctor.profilepic) && `${selectedDoctor.firstname?.[0] ?? ''}${selectedDoctor.lastname?.[0] ?? ''}`}
                      </Avatar>
                      <div style={{ marginTop: '8px', fontWeight: 500 }}>
                        Dr. {selectedDoctor.firstname} {selectedDoctor.lastname}
                      </div>
                    </div>
                  </Col>
                  <Col span={18}>
                    <Descriptions column={2} size="small">
                      <Descriptions.Item label="Full Name">
                        {selectedDoctor.firstname} {selectedDoctor.lastname}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {selectedDoctor.email || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mobile">
                        {selectedDoctor.mobile || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Gender">
                        {selectedDoctor.gender || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Date of Birth">
                        {selectedDoctor.DOB || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Blood Group">
                        {selectedDoctor.bloodgroup || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Marital Status">
                        {selectedDoctor.maritalStatus || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Registration Number">
                        {selectedDoctor.medicalRegistrationNumber || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Status">
                        <Tag color={getStatusColor(selectedDoctor.status)}>
                          {selectedDoctor.status || 'Unknown'}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Verified">
                        <Tag color={selectedDoctor.isVerified ? 'success' : 'warning'}>
                          {selectedDoctor.isVerified ? 'Verified' : 'Pending'}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Languages">
                        {selectedDoctor.spokenLanguage?.join(', ') || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Registered On">
                        {formatDate(selectedDoctor.createdAt)}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>

              {/* Consultation Fees */}
              <Card title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileTextOutlined />
                  <span>Consultation Fees</span>
                </div>
              } style={{ marginBottom: '16px' }}>
                {selectedDoctor.consultationModeFee && selectedDoctor.consultationModeFee.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {selectedDoctor.consultationModeFee.map((fee, index) => (
                      <Col key={fee._id || index} span={8}>
                        <Card size="small">
                          <div style={{ fontWeight: 500 }}>{fee.type}</div>
                          <div style={{ fontSize: '16px', marginTop: '4px' }}>
                            {fee.currency} {fee.fee}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#8c8c8c', 
                    fontStyle: 'italic',
                    padding: '16px 0'
                  }}>
                    No consultation fees information available
                  </div>
                )}
              </Card>

              {/* Bank Details */}
              <Card title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BankOutlined />
                  <span>Bank Details</span>
                </div>
              }>
                {selectedDoctor.bankDetails && (
                  selectedDoctor.bankDetails.accountNumber ? (
                    <Descriptions column={2} size="small">
                      <Descriptions.Item label="Account Holder">
                        {selectedDoctor.bankDetails.accountHolderName || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Account Number">
                        {selectedDoctor.bankDetails.accountNumber || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Bank Name">
                        {selectedDoctor.bankDetails.bankName || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="IFSC Code">
                        {selectedDoctor.bankDetails.ifscCode || 'N/A'}
                      </Descriptions.Item>
                    </Descriptions>
                  ) : (
                    <div style={{ 
                      textAlign: 'center', 
                      color: '#8c8c8c', 
                      fontStyle: 'italic',
                      padding: '16px 0'
                    }}>
                      No bank details provided
                    </div>
                  )
                )}
              </Card>

              {/* Rejection Reason (if applicable) */}
              {selectedDoctor.rejectionReason && (
                <Card 
                  title="Rejection Reason" 
                  style={{ marginTop: '16px', borderColor: '#ff4d4f' }}
                  headStyle={{ color: '#ff4d4f' }}
                >
                  <div style={{ color: '#595959' }}>
                    {selectedDoctor.rejectionReason}
                  </div>
                </Card>
              )}
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default NeedApproval;