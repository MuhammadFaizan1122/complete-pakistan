'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@chakra-ui/react";
export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const targetDate = new Date("2025-09-06T17:59:59").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const newTimeLeft = {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            };

            setTimeLeft(newTimeLeft);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return (
            <div className="loading-container">
                <div className="loading-text">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .loading-container {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }
        
        .loading-text {
          color: #0a7450;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
       .countdown-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 35%, #0f2419 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column; /* ✅ Center vertically as a column */
        position: relative;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
        }
        
        .background-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .green-orb-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(10, 116, 80, 0.15), transparent 70%);
          border-radius: 50%;
          top: -100px;
          right: -100px;
          animation: float1 25s ease-in-out infinite;
          filter: blur(60px);
        }
        
        .green-orb-2 {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(10, 116, 80, 0.1), transparent 70%);
          border-radius: 50%;
          bottom: -80px;
          left: -80px;
          animation: float2 30s ease-in-out infinite reverse;
          filter: blur(80px);
        }
        
        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(10, 116, 80, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 116, 80, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 40px) scale(1.1); }
          66% { transform: translate(20px, -30px) scale(0.9); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -20px); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .main-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 1rem;
  width: 100%;
}
        
        .launch-title {
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 20%, #0a7450 50%, #34d399 80%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          line-height: 1.1;
          letter-spacing: -0.03em;
          position: relative;
        }
        
        .launch-title::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(ellipse, rgba(10, 116, 80, 0.1), transparent 70%);
          z-index: -1;
          animation: titlePulse 4s ease-in-out infinite;
        }
        
        @keyframes titlePulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        .launch-subtitle {
          font-size: clamp(1.125rem, 4vw, 1.75rem);
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4rem;
          font-weight: 400;
          letter-spacing: 0.5px;
        }
        
        .countdown-wrapper {
          display: flex;
          justify-content: center;
          gap: clamp(1rem, 5vw, 3rem);
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        
        .countdown-box {
          position: relative;
          animation: slideInUp 1s ease-out both;
          transform-style: preserve-3d;
          transition: transform 0.4s ease;
        }
        
        .countdown-box:hover {
          transform: translateY(-10px) rotateX(5deg);
        }
        
        .countdown-inner {
          position: relative;
          width: clamp(100px, 20vw, 140px);
          height: clamp(120px, 24vw, 180px);
          background: rgba(10, 116, 80, 0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(10, 116, 80, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        
        .countdown-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(10, 116, 80, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .countdown-box:hover .countdown-inner {
          border-color: rgba(10, 116, 80, 0.6);
          background: rgba(10, 116, 80, 0.12);
          box-shadow: 
            0 20px 40px rgba(10, 116, 80, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .countdown-box:hover .countdown-inner::before {
          opacity: 1;
        }
        
        .countdown-border {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, #0a7450, #34d399, #0a7450, #34d399);
          background-size: 400% 400%;
          border-radius: 27px;
          opacity: 0;
          animation: gradientShift 3s ease infinite;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        
        .countdown-box:hover .countdown-border {
          opacity: 0.6;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
       .digit-display {
  font-size: clamp(2.5rem, 8vw, 4rem); /* ✅ Bigger, responsive */
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff, #0a7450);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
        
        .countdown-value {
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1;
          margin-bottom: 0.5rem;
          min-height: clamp(2.5rem, 8vw, 4rem);
          display: flex;
          align-items: center;
        }
        
        .countdown-separator {
          width: 40%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0a7450, transparent);
          margin: 0.5rem 0;
          opacity: 0.6;
        }
        
   .countdown-label {
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  margin-top: 0.25rem;
  text-transform: uppercase;
}
        .countdown-box:hover .countdown-label {
          color: rgba(10, 116, 80, 0.9);
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .progress-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .progress-ring {
          width: 80px;
          height: 80px;
          border: 3px solid rgba(10, 116, 80, 0.2);
          border-top: 3px solid #0a7450;
          border-radius: 50%;
          animation: spin 3s linear infinite;
          position: relative;
        }
        
        .progress-ring::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #0a7450;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(10, 116, 80, 0.6);
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .progress-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
          }
          
          .countdown-wrapper {
            gap: 1rem;
          }
          
          .launch-subtitle {
            margin-bottom: 2rem;
          }
        }
      `}</style>

            <div className="countdown-container">
                <div className="background-effects">
                    <div className="green-orb-1"></div>
                    <div className="green-orb-2"></div>
                    <div className="grid-overlay"></div>
                </div>
                <div className="main-content">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="!items-center !justidy-center !flex">
                        <Image
                            src="/Images/logo.png"
                            mx={'auto'}
                            alt="Company Logo"
                            objectFit="contain"
                            w={'200px'}
                            zIndex={1}
                        />
                    </motion.div>
                    <h1 className="launch-title">
                        Launching Soon
                    </h1>

                    <p className="launch-subtitle">
                        Something extraordinary is on the horizon
                    </p>

                    <div className="countdown-wrapper text-white">
                        <div
                            className="countdown-box"
                            style={{ animationDelay: `${0 * 0.15}s` }}
                        >
                            <div className="countdown-inner">
                                <div className="countdown-value">
                                    <span className="digit-display">{timeLeft.days.toString().padStart(2, "0")}</span>
                                </div>
                                <div className="countdown-separator"></div>
                                <div className="countdown-label">{'Days'}</div>
                            </div>
                            <div className="countdown-border"></div>
                        </div>
                        <div
                            className="countdown-box"
                            style={{ animationDelay: `${1 * 0.15}s` }}
                        >
                            <div className="countdown-inner">
                                <div className="countdown-value">
                                    <span className="digit-display">{timeLeft.hours.toString().padStart(2, "0")}</span>
                                </div>
                                <div className="countdown-separator"></div>
                                <div className="countdown-label">{'Hours'}</div>
                            </div>
                            <div className="countdown-border"></div>
                        </div>
                        <div
                            className="countdown-box"
                            style={{ animationDelay: `${2 * 0.15}s` }}
                        >
                            <div className="countdown-inner">
                                <div className="countdown-value">
                                    <span className="digit-display">{timeLeft.minutes.toString().padStart(2, "0")}</span>
                                </div>
                                <div className="countdown-separator"></div>
                                <div className="countdown-label">{'Minutes'}</div>
                            </div>
                            <div className="countdown-border"></div>
                        </div>
                        <div
                            className="countdown-box"
                            style={{ animationDelay: `${3 * 0.15}s` }}
                        >
                            <div className="countdown-inner">
                                <div className="countdown-value">
                                    <span className="digit-display">{timeLeft.seconds.toString().padStart(2, "0")}</span>
                                </div>
                                <div className="countdown-separator"></div>
                                <div className="countdown-label">{'Seconds'}</div>
                            </div>
                            <div className="countdown-border"></div>
                        </div>
                    </div>
                </div>

                <div className="progress-indicator">
                    <div className="progress-ring"></div>
                    <div className="progress-text">Loading</div>
                </div>
            </div>
        </>
    );
}