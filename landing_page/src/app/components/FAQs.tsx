"use client";

import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
    {
        question: "How do I book an appointment with a doctor?",
        answer:
            "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
    },
    {
        question: "Can I request a specific doctor when booking my appointment?",
        answer: "",
    },
    {
        question: "What should I do if I need to cancel or reschedule my appointment?",
        answer: "",
    },
    {
        question: "What if I'm running late for my appointment?",
        answer: "",
    },
    {
        question: "Can I book appointments for family members or dependents?",
        answer: "",
    },
];

const FAQs: React.FC = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [animationActive, setAnimationActive] = useState(false);

    useEffect(() => {
        // Trigger the light background animation on component mount
        setAnimationActive(true);
        
        // Clean up by resetting the animation state after it completes
        const timer = setTimeout(() => {
            setAnimationActive(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 0",
            fontFamily: "'Inter', sans-serif",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Light background animation */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(circle at center, rgba(21, 125, 255, 0.03) 0%, transparent 70%)",
                opacity: animationActive ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                pointerEvents: "none",
                zIndex: 0
            }} />
            
            <div style={{ 
                width: "100%", 
                maxWidth: 1200, 
                margin: "0 auto",
                position: "relative",
                zIndex: 1 
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ marginBottom: 16 }}>
                        <span style={{
                            background: "#157DFF",
                            color: "#fff",
                            borderRadius: 20,
                            padding: "6px 20px",
                            fontWeight: 600,
                            fontSize: 16,
                            letterSpacing: 1,
                            display: "inline-block"
                        }}>
                            FAQ'S
                        </span>
                    </div>
                    <h1 style={{
                        fontSize: 25,
                        fontWeight: 700,
                        color: "#002147",
                        marginBottom: 32,
                        textAlign: "center"
                    }}>
                        Your Questions are Answered
                    </h1>
                </div>
                <div style={{ 
                    background: "#fff", 
                    borderRadius: 12, 
                    boxShadow: "none", 
                    maxWidth: 1200, 
                    margin: "0 auto" 
                }}>
                    {faqs.map((faq, idx) => (
                        <div key={idx} style={{
                            borderBottom: idx !== faqs.length - 1 ? "1px solid #E5EAF1" : "none",
                            background: "#fff"
                        }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    padding: "24px 0"
                                }}
                                onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
                            >
                                <span style={{
                                    fontWeight: 700,
                                    fontSize: 16,
                                    color: "#002147"
                                }}>
                                    {faq.question}
                                </span>
                                <span style={{
                                    background: "#157DFF",
                                    borderRadius: 6,
                                    width: 32,
                                    height: 32,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: 24
                                }}>
                                    {openIndex === idx ? <FiMinus /> : <FiPlus />}
                                </span>
                            </div>
                            {openIndex === idx && faq.answer && (
                                <div style={{
                                    color: "#5A6A85",
                                    fontSize: 18,
                                    padding: "0 0 24px 0",
                                    marginLeft: 2,
                                    marginRight: 2
                                }}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Floating blue dot at bottom right */}
            <div style={{
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: 1000
            }}>
                <span style={{
                    display: "inline-block",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "2px solid #157DFF",
                    background: "#fff",
                    position: "relative",
                    boxSizing: "border-box"
                }}>
                    <span style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 10,
                        height: 10,
                        background: "#157DFF",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)"
                    }} />
                </span>
            </div>
        </div>
    );
};

export default FAQs;