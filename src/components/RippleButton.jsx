import React, { useState } from "react";

const RippleButton = ({ onClick, children, className = "", style = {}, ...props }) => {
    const [ripples, setRipples] = useState([]);

    const addRipple = (event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 1000);
    };

    const handleClick = (event) => {
        addRipple(event);

        // ✅ Properly call onClick handler if it exists
        if (typeof onClick === "function") {
            onClick(event);
        }
    };

    return (
        <button
            {...props}
            className={`relative overflow-hidden ${className}`}
            onClick={handleClick}
            style={style}
        >
            {children}
            {ripples.map(({ x, y, id }) => (
                <span
                    key={id}
                    style={{
                        position: "absolute",
                        borderRadius: "50%",
                        pointerEvents: "none",
                        width: 100,
                        height: 100,
                        backgroundColor: "rgba(0,0,0, 0.2)",
                        top: y - 50,
                        left: x - 50,
                        transform: "scale(0)",
                        animation: "ripple-effect 1000ms backwards",
                    }}
                />
            ))}
            <style>{`
        @keyframes ripple-effect {
          to {
            transform: scale(14);
            opacity: 0;
          }
        }
      `}</style>
        </button>
    );
};

export default RippleButton;
