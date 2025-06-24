
"use client";

import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ChevronDown, ArrowLeft, Bell, User } from 'lucide-react';

interface PatientData {
    doctorId: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    appointmentType: string;
    department: string;
    date: string;
    time: string;
    visitReason: string;
    selectedDate: Date;
    selectedTimeSlot: string;
    dateOfBirth: string;
}

interface CreatePatientRequest {
    firstname: string;
    lastname: string;
    gender: string;
    DOB: string;
    mobile: string;
}

interface CreateAppointmentRequest {
    userId: string;
    doctorId: string;
    patientName: string;
    doctorName: string;
    appointmentType: string;
    appointmentDepartment: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentReason: string;
    amount: number;
    discount: number;
    discountType: string;
    paymentStatus: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}

interface SearchUserResponse {
    success: boolean;
    message: string;
    data?: {
        userId?: string;
        mobile?: string;
        firstname?: string;
        lastname?: string;
        gender?: string;
        DOB?: string;
        age?: number;
    };
}

interface Doctor {
    _id: string;
    doctorId: string;
    receptionistId: string;
    doctor: {
        name?: string;
        department?: string;
        specialization?: string;
    };
}

interface MyDoctorsResponse {
    status: string;
    data: Doctor[];
}

const AddWalkInPatient: React.FC = () => {
    const [patientData, setPatientData] = useState<PatientData>({
        doctorId: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        appointmentType: '',
        department: '',
        date: '',
        time: '',
        visitReason: '',
        selectedDate: new Date(),
        selectedTimeSlot: '',
        phoneNumber: '',
        dateOfBirth: ''
    });

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [paymentStatus, setPaymentStatus] = useState('paid');
    const [isCreatingPatient, setIsCreatingPatient] = useState(false);
    const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
    const [apiError, setApiError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [userFound, setUserFound] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [createdPatientId, setCreatedPatientId] = useState<string>('');
    const [patientCreated, setPatientCreated] = useState(false);
    const [consultationFee, setConsultationFee] = useState<number | undefined>(undefined);
    const [discount, setDiscount] = useState(10);
    const [discountType, setDiscountType] = useState('percentage');

    // Calculate total amount
    const calculateTotalAmount = () => {
        const fee = consultationFee ?? 0;
        if (discountType === 'percentage') {
            return fee - (fee * discount / 100);
        } else {
            return fee - discount;
        }
    };

    const totalAmount = calculateTotalAmount();

    // API Configuration
    const API_BASE_URL = 'http://216.10.251.239:3000';
    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accessToken') || 'your-token-here';
        }
        return 'your-token-here';
    };

    // Fetch My Doctors on component mount
    useEffect(() => {
        fetchMyDoctors();
    }, []);

    // Fetch My Doctors API call
    const fetchMyDoctors = async (): Promise<void> => {
        setIsLoadingDoctors(true);
        try {
            const response = await fetch(`${API_BASE_URL}/receptionist/fetchMyDoctors`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            const data: MyDoctorsResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.status || `HTTP error! status: ${response.status}`);
            }

            if (data.status === 'success' && data.data) {
                setDoctors(data.data);
                // Auto-select first doctor if available
                if (data.data.length > 0) {
                    setSelectedDoctor(data.data[0]);
                    setPatientData(prev => ({
                        ...prev,
                        doctorId: data.data[0].doctorId
                    }));
                }
            }
        } catch (error) {
            console.error('Fetch Doctors API Error:', error);
            setApiError('Failed to load doctors list. Please refresh the page.');
        } finally {
            setIsLoadingDoctors(false);
        }
    };

    // Search User API call
    const searchUser = async (mobile: string): Promise<SearchUserResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/doctor/searchUser?mobile=${mobile}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                message: data.message || 'User found successfully',
                data: data.data || data
            };
        } catch (error) {
            console.error('Search User API Error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to search user'
            };
        }
    };

    // Handle search functionality
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setApiError('Please enter a mobile number to search');
            return;
        }

        // Validate mobile number format
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(searchQuery)) {
            setApiError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
            return;
        }

        setIsSearching(true);
        setApiError('');
        setUserFound(false);
        setPatientCreated(false);

        try {
            const searchResult = await searchUser(searchQuery);

            if (searchResult.success && searchResult.data) {
                // Pre-fill form with found user data
                const userData = searchResult.data;

                setPatientData(prev => ({
                    ...prev,
                    phoneNumber: userData.mobile || searchQuery,
                    firstName: userData.firstname || '',
                    lastName: userData.lastname || '',
                    gender: userData.gender || '',
                    age: userData.age ? userData.age.toString() : '',
                    dateOfBirth: userData.DOB || ''
                }));

                setUserFound(true);
                setPatientCreated(true); // User already exists, so we can proceed to appointment
                setCreatedPatientId(userData.userId || '');
                setApiError('');
                console.log('User found:', userData);
            } else {
                // User not found - clear form but keep mobile number
                setPatientData(prev => ({
                    ...prev,
                    phoneNumber: searchQuery,
                    firstName: '',
                    lastName: '',
                    gender: '',
                    age: '',
                    dateOfBirth: ''
                }));

                setUserFound(false);
                setPatientCreated(false);
                setCreatedPatientId('');
                setApiError('User not found. Please enter patient details to create a new patient.');
            }
        } catch (error) {
            console.error('Search error:', error);
            setApiError('An error occurred while searching. Please try again.');
            setUserFound(false);
            setPatientCreated(false);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle Enter key press in search input
    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Calculate DOB from age
    const calculateDOBFromAge = (age: string): string => {
        if (!age || isNaN(Number(age))) return '';

        const currentDate = new Date();
        const birthYear = currentDate.getFullYear() - parseInt(age);
        const birthDate = new Date(birthYear, 0, 1); // January 1st of the birth year

        return birthDate.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    // Validate patient data
    const validatePatientData = (): boolean => {
        const errors: string[] = [];

        if (!patientData.firstName.trim()) errors.push('First name is required');
        if (!patientData.lastName.trim()) errors.push('Last name is required');
        if (!patientData.phoneNumber.trim()) errors.push('Phone number is required');
        if (!patientData.age.trim()) errors.push('Age is required');
        if (!patientData.gender) errors.push('Gender is required');

        // Phone number validation
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (patientData.phoneNumber && !phoneRegex.test(patientData.phoneNumber)) {
            errors.push('Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9');
        }

        // Age validation
        const ageNum = parseInt(patientData.age);
        if (patientData.age && (isNaN(ageNum) || ageNum < 1 || ageNum > 120)) {
            errors.push('Please enter a valid age between 1 and 120');
        }

        if (errors.length > 0) {
            setApiError(errors.join(', '));
            return false;
        }

        setApiError('');
        return true;
    };

    // Validate appointment data
    const validateAppointmentData = (): boolean => {
        const errors: string[] = [];

        if (!patientData.doctorId) errors.push('Doctor selection is required');
        if (!patientData.appointmentType) errors.push('Appointment type is required');
        if (!patientData.department) errors.push('Department is required');
        if (!patientData.selectedTimeSlot) errors.push('Time slot selection is required');

        if (errors.length > 0) {
            setApiError(errors.join(', '));
            return false;
        }

        setApiError('');
        return true;
    };

    // API call to create patient
    const createPatient = async (patientInfo: CreatePatientRequest): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/doctor/createPatient`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientInfo),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                message: data.message || 'Patient created successfully',
                data: data
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create patient'
            };
        }
    };

    // API call to create appointment
    const createAppointment = async (appointmentInfo: CreateAppointmentRequest): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointment/createAppointment`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentInfo),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                message: data.message || 'Appointment created successfully',
                data: data
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create appointment'
            };
        }
    };

    // Handle patient creation
    const handleCreatePatient = async () => {
        if (!validatePatientData()) {
            return;
        }

        setIsCreatingPatient(true);
        setApiError('');

        try {
            // Format DOB for API (DD-MM-YYYY)
            const formatDOBForAPI = (dateString: string) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            };

            const patientRequest: CreatePatientRequest = {
                firstname: patientData.firstName.trim(),
                lastname: patientData.lastName.trim(),
                gender: patientData.gender,
                DOB: formatDOBForAPI(patientData.dateOfBirth),
                mobile: patientData.phoneNumber.trim()
            };

            // Call the Patient API
            const patientResult = await createPatient(patientRequest);

            if (patientResult.success) {
                // Extract patient ID from response
                const patientId = patientResult.data?.patientId || patientResult.data?.userId || 'NEWPATIENT';
                setCreatedPatientId(patientId);
                setPatientCreated(true);
                setApiError('');
                alert(`Patient created successfully! Patient ID: ${patientId}`);
            } else {
                setApiError(patientResult.message);
            }
        } catch (error) {
            console.error('Patient creation error:', error);
            setApiError('An unexpected error occurred while creating patient. Please try again.');
        } finally {
            setIsCreatingPatient(false);
        }
    };

    // Handle appointment creation and payment
    const handleContinueToPayment = async () => {
        if (!patientCreated) {
            setApiError('Please create or find a patient first');
            return;
        }

        if (!validateAppointmentData()) {
            return;
        }

        setIsCreatingAppointment(true);
        setApiError('');

        try {
            const formatDateForAPI = (date: Date): string => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const formatTimeForAPI = (timeSlot: string): string => {
                // Convert time slot like "1:00 PM" to "13:00"
                const [time, period] = timeSlot.split(' ');
                let [hours, minutes] = time.split(':');

                if (period === 'PM' && hours !== '12') {
                    hours = String(Number(hours) + 12);
                } else if (period === 'AM' && hours === '12') {
                    hours = '00';
                }

                return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
            };

            // Prepare Appointment API request data
            const appointmentRequest: CreateAppointmentRequest = {
                userId: createdPatientId,
                doctorId: patientData.doctorId,
                patientName: `${patientData.firstName} ${patientData.lastName}`,
                doctorName: selectedDoctor?.doctor?.name || "Doctor",
                appointmentType: patientData.appointmentType,
                appointmentDepartment: patientData.department,
                appointmentDate: formatDateForAPI(patientData.selectedDate),
                appointmentTime: formatTimeForAPI(patientData.selectedTimeSlot),
                appointmentReason: patientData.visitReason || "Not specified",
                amount: totalAmount,
                discount: discount,
                discountType: discountType,
                paymentStatus: paymentStatus
            };

            console.log('Appointment Request:', appointmentRequest);

            // Call the Appointment API
            const appointmentResult = await createAppointment(appointmentRequest);

            if (appointmentResult.success) {
                alert(`Appointment created successfully! ${appointmentResult.message}`);
                console.log('Appointment created:', appointmentResult.data);

                // Here you can integrate with payment gateway
                if (paymentStatus === 'pending') {
                    // Redirect to payment gateway or show payment form
                    console.log('Redirecting to payment gateway...');
                    // window.location.href = '/payment-gateway';
                }

                resetForm();
            } else {
                setApiError(appointmentResult.message);
            }
        } catch (error) {
            console.error('Appointment creation error:', error);
            setApiError('An unexpected error occurred while creating appointment. Please try again.');
        } finally {
            setIsCreatingAppointment(false);
        }
    };

    // Handle doctor selection
    const handleDoctorSelect = (doctorId: string) => {
        const doctor = doctors.find(d => d.doctorId === doctorId);
        setSelectedDoctor(doctor || null);
        setPatientData(prev => ({
            ...prev,
            doctorId: doctorId,
            department: doctor?.doctor?.department || doctor?.doctor?.specialization || ''
        }));
    };

    // Calendar functionality
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const afternoonSlots = [
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
    ];

    const eveningSlots = [
        '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'
    ];

    const handleInputChange = (field: keyof PatientData, value: string) => {
        setPatientData(prev => {
            const updated = {
                ...prev,
                [field]: value
            };

            // Auto-calculate DOB when age changes
            if (field === 'age') {
                updated.dateOfBirth = calculateDOBFromAge(value);
            }

            return updated;
        });

        // Clear error when user starts typing
        if (apiError) {
            setApiError('');
        }
    };

    const handleDateSelect = (day: number | null) => {
        if (day) {
            const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            setPatientData(prev => ({
                ...prev,
                selectedDate: newDate
            }));
        }
    };

    const handleTimeSlotSelect = (timeSlot: string) => {
        setPatientData(prev => ({
            ...prev,
            selectedTimeSlot: timeSlot
        }));
    };

    const resetForm = () => {
        setPatientData({
            doctorId: doctors.length > 0 ? doctors[0].doctorId : '',
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            appointmentType: '',
            department: '',
            date: '',
            time: '',
            visitReason: '',
            selectedDate: new Date(),
            selectedTimeSlot: '',
            phoneNumber: '',
            dateOfBirth: ''
        });
        setPaymentStatus('paid');
        setApiError('');
        setSearchQuery('');
        setUserFound(false);
        setPatientCreated(false);
        setCreatedPatientId('');

        // Reset to first doctor if available
        if (doctors.length > 0) {
            setSelectedDoctor(doctors[0]);
        }
    };

    const days = getDaysInMonth(currentMonth);
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Placeholder */}
            <div className="w-full h-16 bg-white shadow-sm border-b mb-6">
                <div className="flex items-center justify-between px-6 h-full">
                    <h1 className="text-xl font-semibold text-gray-800">Hospital Management System</h1>
                    <div className="flex items-center space-x-4">
                        <Bell className="w-6 h-6 text-gray-600" />
                        <User className="w-6 h-6 text-gray-600" />
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-16 bg-white shadow-sm border-r min-h-screen">
                    <div className="flex flex-col items-center py-6 space-y-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Page Header */}
                    <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-2xl font-semibold text-gray-800">Add Walk-in Patient</h1>
                        </div>
                        <p className="text-gray-600">Search for existing patient or enter new patient details for walk-in consultation</p>
                    </div>

                    {/* Error Display */}
                    {apiError && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700 text-sm">{apiError}</p>
                        </div>
                    )}

                    {/* Success Message for Found User */}
                    {userFound && (
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-700 text-sm">Patient found! Details have been pre-filled. You can proceed to create appointment.</p>
                        </div>
                    )}

                    {/* Success Message for Patient Created */}
                    {patientCreated && !userFound && (
                        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-700 text-sm">Patient created successfully! You can now proceed to create appointment.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Patient Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Search Section */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex space-x-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search Mobile Number"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                // Validate input to only allow numbers
                                                const value = e.target.value.replace(/\D/g, '');
                                                setSearchQuery(value);
                                            }}
                                            onKeyPress={(e) => {
                                                // Allow only numeric input
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                } else {
                                                    handleSearchKeyPress(e);
                                                }
                                            }}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={isSearching}
                                            maxLength={10} // Assuming 10-digit mobile numbers
                                        />
                                        {searchQuery && searchQuery.length < 10 && (
                                            <p className="text-red-500 text-xs mt-1">Mobile number must be 10 digits</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (searchQuery.length !== 10) {
                                                alert('Please enter a valid 10-digit mobile number');
                                                return;
                                            }
                                            handleSearch();
                                        }}
                                        disabled={isSearching || searchQuery.length !== 10}
                                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${isSearching || searchQuery.length !== 10
                                            ? 'bg-gray-400 cursor-not-allowed text-white'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                    >
                                        {isSearching ? 'Searching...' : 'Search'}
                                    </button>
                                    <div className="relative">
                                        <select
                                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={patientData.doctorId || ""}
                                            onChange={(e) => {
                                                if (!e.target.value) {
                                                    // Handle empty selection if needed
                                                }
                                                handleDoctorSelect(e.target.value);
                                            }}
                                            disabled={isCreatingPatient || isCreatingAppointment || isLoadingDoctors}
                                            required
                                        >
                                            <option value="">Select Doctor</option>
                                            {doctors.map((doctor) => (
                                                <option key={doctor.doctorId} value={doctor.doctorId}>
                                                    {doctor.doctor?.name || `Doctor ${doctor.doctorId.slice(0, 8)}`}
                                                    {doctor.doctor?.specialization && ` (${doctor.doctor.specialization})`}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
                                        {!patientData.doctorId && (
                                            <p className="text-red-500 text-xs mt-1">Please select a doctor</p>
                                        )}
                                    </div>
                                </div>
                                {isLoadingDoctors && (
                                    <p className="text-blue-600 text-sm mt-2">Loading doctors...</p>
                                )}
                            </div>

                            {/* Basic Information */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center space-x-2 mb-4">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
                                    {userFound && (
                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                            Existing Patient
                                        </span>
                                    )}
                                    {patientCreated && !userFound && (
                                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            Patient Created
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Patient First Name *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter First name"
                                            value={patientData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={isCreatingPatient || userFound}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Patient Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Last name"
                                            value={patientData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={isCreatingPatient || userFound}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Enter phone number"
                                            value={patientData.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            maxLength={10}
                                            pattern="[6-9][0-9]{9}"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={isCreatingPatient || userFound}
                                        />
                                        {patientData.phoneNumber.length > 0 && patientData.phoneNumber.length < 10 && (
                                            <p className="text-red-500 text-xs mt-1">Phone number must be 10 digits</p>
                                        )}
                                        {patientData.phoneNumber.length === 1 && !['6', '7', '8', '9'].includes(patientData.phoneNumber[0]) && (
                                            <p className="text-red-500 text-xs mt-1">Phone number must start with 6, 7, 8, or 9</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Age *
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="25"
                                            value={patientData.age}
                                            onChange={(e) => handleInputChange('age', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={isCreatingPatient || userFound}
                                            min="1"
                                            max="120"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender*
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={patientData.gender}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                disabled={isCreatingPatient || userFound}
                                            >
                                                <option value="">Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Display calculated DOB */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Birth *
                                        </label>
                                        <input
                                            type="date"
                                            value={patientData.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={isCreatingPatient || userFound}
                                        />
                                    </div>
                                </div>

                                {/* Create Patient Button - Only show if patient not found/created */}
                                {!userFound && !patientCreated && (
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleCreatePatient}
                                            disabled={isCreatingPatient}
                                            className={`py-2 px-6 rounded-lg font-semibold transition-colors ${isCreatingPatient
                                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}
                                        >
                                            {isCreatingPatient ? 'Creating Patient...' : 'Create Patient'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Appointment Details */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-800">Appointment Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Appointment Type *
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={patientData.appointmentType}
                                                    onChange={(e) => handleInputChange('appointmentType', e.target.value)}
                                                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    disabled={!patientCreated && !userFound}
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="consultation">Consultation</option>
                                                    <option value="follow-up">Follow-up</option>
                                                    <option value="emergency">Emergency</option>
                                                    <option value="home-visit">Home Visit</option>
                                                </select>
                                                <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Availability Date"
                                                    value={formatDate(patientData.selectedDate)}
                                                    readOnly
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                />
                                                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Department *
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={patientData.department}
                                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    disabled={!patientCreated && !userFound}
                                                >
                                                    <option value="">Select Department</option>
                                                    <option value="cardiology">Cardiology</option>
                                                    <option value="neurology">Neurology</option>
                                                    <option value="orthopedics">Orthopedics</option>
                                                    <option value="General Physician">General Physician</option>
                                                </select>
                                                <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Timings"
                                                    value={patientData.selectedTimeSlot}
                                                    readOnly
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                />
                                                <Clock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visit Reason */}
                                <div className="mt-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                                            <span className="text-white text-xs">+</span>
                                        </div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Visit Reason / Symptoms
                                        </label>
                                    </div>
                                    <textarea
                                        placeholder="Describe the reason for visit and symptoms..."
                                        value={patientData.visitReason}
                                        onChange={(e) => handleInputChange('visitReason', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={!patientCreated && !userFound}
                                    />
                                </div>
                            </div>

                            {/* Select Date Calendar */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>

                                <div className="mb-4">
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {dayNames.map(day => (
                                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {days.map((day, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleDateSelect(day)}
                                                disabled={!day || (!patientCreated && !userFound)}
                                                className={`
                                                    h-10 text-sm rounded-lg transition-colors
                                                    ${!day ? 'invisible' : ''}
                                                    ${day === patientData.selectedDate.getDate() ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}
                                                    ${(!patientCreated && !userFound) ? 'opacity-50 cursor-not-allowed' : ''}
                                                `}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Afternoon 7 slots</h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {afternoonSlots.map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleTimeSlotSelect(slot)}
                                                disabled={!patientCreated && !userFound}
                                                className={`
                                                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                                    ${patientData.selectedTimeSlot === slot ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                                    ${(!patientCreated && !userFound) ? 'opacity-50 cursor-not-allowed' : ''}
                                                `}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Evening 5 slots</h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {eveningSlots.map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleTimeSlotSelect(slot)}
                                                disabled={!patientCreated && !userFound}
                                                className={`
                                                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                                    ${patientData.selectedTimeSlot === slot ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                                    ${(!patientCreated && !userFound) ? 'opacity-50 cursor-not-allowed' : ''}
                                                `}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment Summary */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="text-green-600">₹</span>
                                    <h2 className="text-lg font-semibold text-gray-800">Payment Summary</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Consultation Fee (₹)</label>
                                        <input
                                            type="number"
                                            value={consultationFee}
                                            onChange={(e) => setConsultationFee(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                            placeholder="Enter consultation fee"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Discount Type</label>
                                        <div className="relative">
                                            <select
                                                value={discountType}
                                                onChange={(e) => setDiscountType(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="percentage">Percentage (%)</option>
                                                <option value="flat">Flat Amount</option>
                                            </select>
                                            <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* ... rest of the payment summary code remains the same ... */}
                                </div>
                            </div>

                            <button
                                onClick={handleContinueToPayment}
                                disabled={isCreatingAppointment || !patientCreated}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${isCreatingAppointment || !patientCreated
                                    ? 'bg-gray-400 cursor-not-allowed text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {isCreatingAppointment ? 'Processing...' : 'Continue to Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddWalkInPatient;