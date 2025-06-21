"use client";

import React, { useState } from "react";

interface headerProps {
    showSearch: boolean;
    setShowSearch: (show: boolean) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const header: React.FC<headerProps> = ({ showSearch, setShowSearch, searchQuery, setSearchQuery }) => {
    return (
        <>
            {/* header - Made sticky with reduced height */}
            <header style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                padding: "12px 48px", // Reduced padding from 24px to 12px
                background: "#fff", 
                boxShadow: "0 2px 8px #f0f1f2",
                position: "sticky",
                top: 0,
                zIndex: 100,
                height: "70px" // Fixed height for consistency
            }}>
                {/* Left: Logo with Image - Increased size */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                        style={{
                            width: 120, // Increased from 80px
                            height: 120, // Increased from 80px
                            borderRadius: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={"/images/logo.png"}
                            alt="Vydhyo Logo"
                            style={{ width: 450, height: 450, objectFit: "contain", borderRadius: 12 }} // Increased from 250px
                        />
                    </div>
                </div>


                {/* Right: Buttons and Admin Section */}
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                   

                    {/* ABHA Button */}
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "linear-gradient(135deg, #ff6b35, #f7931e)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 20, // Reduced border radius
                            padding: "8px 16px", // Reduced padding
                            fontWeight: 600,
                            fontSize: 14, // Reduced font size
                            cursor: "pointer",
                            boxShadow: "0 3px 10px rgba(255,107,53,0.2)",
                            transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.transform = "translateY(0)";
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            fill="#fff"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM19 7V9H15V23H13V16H11V23H9V9H5V7H19Z"/>
                        </svg>
                        ABHA
                    </button>

                    {/* For Partners Button */}
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "transparent",
                            color: "#0a2540",
                            border: "2px solid #e0e0e0",
                            borderRadius: 20, // Reduced border radius
                            padding: "6px 14px", // Reduced padding
                            fontWeight: 500,
                            fontSize: 14, // Reduced font size
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.borderColor = "#2196f3";
                            target.style.color = "#2196f3";
                        }}
                        onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.borderColor = "#e0e0e0";
                            target.style.color = "#0a2540";
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        For Partners
                    </button>
                     
                    
                     {/* Download Button */}
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "transparent",
                            color: "#0a2540",
                            border: "2px solid #e0e0e0",
                            borderRadius: 20,
                            padding: "6px 14px",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.borderColor = "#2196f3";
                            target.style.color = "#2196f3";
                        }}
                        onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.borderColor = "#e0e0e0";
                            target.style.color = "#0a2540";
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download the App
                    </button>

                    {/* Admin Section */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "6px 12px", // Reduced padding
                            background: "#f8f9fa",
                            borderRadius: 24,
                            border: "1px solid #e9ecef",
                        }}
                    >
                        {/* Admin Icon */}
                        <div
                            style={{
                                width: 32, // Reduced from 36px
                                height: 32, // Reduced from 36px
                                background: "linear-gradient(135deg, #667eea, #764ba2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            <svg
                                width="16" // Reduced from 18px
                                height="16"
                                fill="#fff"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                            </svg>
                        </div>

                        {/* Admin Name */}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                                style={{
                                    fontSize: 14, // Reduced from 15px
                                    fontWeight: 600,
                                    color: "#0a2540",
                                    lineHeight: 1.2,
                                }}
                            >
                                Login
                            </span>
                        </div>

                        {/* Dropdown Arrow */}
                        <svg
                            width="12" // Reduced from 14px
                            height="12"
                            fill="none"
                            stroke="#6c757d"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ cursor: "pointer" }}
                        >
                            <polyline points="6 9 8 11 10 9" />
                        </svg>
                    </div>
                </div>
            </header>

        </>
    );
};

export default header;