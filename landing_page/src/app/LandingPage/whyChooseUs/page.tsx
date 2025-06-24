import React from "react";

const reasons = [
    {
        icon: (
            <span
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    background: "#FEE4DB",
                    borderRadius: "50%",
                    marginRight: 12,
                }}
            >
                <svg width="16" height="16" fill="none">
                    <rect width="16" height="16" rx="8" fill="#F97316" />
                    <path
                        d="M8 4.5V8M8 11H8.007M12 8A4 4 0 1 1 4 8a4 4 0 0 1 8 0Z"
                        stroke="#fff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        ),
        title: "Follow-Up Care",
        description:
            "We ensure continuity of care through regular follow-ups and communication, helping you stay on track with health goals.",
    },
    {
        icon: (
            <span
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    background: "#E9E7FD",
                    borderRadius: "50%",
                    marginRight: 12,
                }}
            >
                <svg width="16" height="16" fill="none">
                    <rect width="16" height="16" rx="8" fill="#7C3AED" />
                    <circle cx="8" cy="8" r="3" stroke="#fff" strokeWidth="1.2" />
                </svg>
            </span>
        ),
        title: "Patient-Centered Approach",
        description:
            "We prioritize your comfort and preferences, tailoring our services to meet your individual needs and Care from Our Experts",
    },
    {
        icon: (
            <span
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    background: "#D1F5F9",
                    borderRadius: "50%",
                    marginRight: 12,
                }}
            >
                <svg width="16" height="16" fill="none">
                    <rect width="16" height="16" rx="8" fill="#06B6D4" />
                    <path
                        d="M8 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 8c0 2.5-4 5-4 5s-4-2.5-4-5a4 4 0 1 1 8 0Z"
                        stroke="#fff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        ),
        title: "Convenient Access",
        description:
            "Easily book appointments online or through our dedicated customer service team, with flexible hours to fit your schedule.",
    },
];

const WhyChooseUs: React.FC = () => {
    return (
        <section
            style={{
                background: "#fff",
                padding: "64px 0 0 0",
                borderBottom: "8px solid #0A2240",
                marginTop: "-8px",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "0 32px",
                    textAlign: "center",
                }}
            >
                <div style={{ marginBottom: 24 }}>
                    <button
                    
                        style={{
                            background: "rgba(66, 133, 244, 0.9)",
                            backdropFilter: "blur(10px)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: 20,
                            padding: "8px 20px",
                            display: "inline-block",
                            marginBottom: 20,
                            boxShadow: "0 4px 15px rgba(66, 133, 244, 0.3)",
                            marginTop: '-4 rem',
                        }}
                    >
                        • Why Book With Us •
                    </button>
                </div>
                <h2
                    style={{
                        fontSize: 40,
                        fontWeight: 700,
                        color: "#0A2240",
                        marginBottom: 56,
                        letterSpacing: "-1px",
                    }}
                >
                    Compelling Reasons to Choose
                </h2>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 32,
                        margin: "0 auto",
                        maxWidth: 1200,
                    }}
                >
                    {reasons.map((reason, idx) => (
                        <div
                            key={reason.title}
                            style={{
                                flex: 1,
                                textAlign: "left",
                                padding: "0 24px",
                                borderLeft:
                                    idx === 0
                                        ? "none"
                                        : "1px dashed #E5E7EB",
                                borderRight:
                                    idx === reasons.length - 1
                                        ? "none"
                                        : undefined,
                                minHeight: 180,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                                {reason.icon}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 22,
                                        color: "#0A2240",
                                    }}
                                >
                                    {reason.title}
                                </span>
                            </div>
                            <p
                                style={{
                                    color: "#334155",
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    margin: 0,
                                }}
                            >
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;