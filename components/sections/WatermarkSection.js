'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function WatermarkSection({ onOpenDemo }) {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  return (
    <section
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setSpotlightPos({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
      }}
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '90px 0 20px 0',
        overflow: 'hidden',
        borderTop: '1px solid #e2e8f0',
        cursor: 'default',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Floating Centered CTA Card - Clean Solid Brand Blue */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            maxWidth: '820px',
            margin: '0 auto',
            background: '#00B4D8',
            borderRadius: '28px',
            padding: '54px 40px',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 20px 45px rgba(0, 180, 216, 0.22)',
            overflow: 'hidden',
            zIndex: 4,
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
              fontWeight: '800',
              lineHeight: '1.3',
              marginBottom: '14px',
              color: '#ffffff',
              letterSpacing: '-0.5px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Build your enterprise workflow with WorkLogix.
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '560px',
              margin: '0 auto 28px auto',
              lineHeight: '1.6',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Assign work, track progress in real time, and stay in complete control across all teams.
          </p>

          <button
            onClick={(e) => onOpenDemo('cta_spotlight_contact', e.currentTarget)}
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#ffffff',
              color: '#00B4D8',
              fontWeight: '800',
              fontSize: '1rem',
              padding: '14px 38px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
            }}
          >
            <Zap size={16} color="#00B4D8" />
            Contact us
          </button>
        </motion.div>
      </div>

      {/* Giant Full-Width Edge-to-Edge Watermark Typography with Silk Liquid Wave */}
      <div
        style={{
          position: 'relative',
          marginTop: '-85px',
          width: '100%',
          overflow: 'hidden',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg
          viewBox="0 0 1780 240"
          style={{
            width: '100%',
            minWidth: '100%',
            height: 'auto',
            display: 'block',
          }}
        >
          <defs>
            {/* 1. Continuous Silk Liquid Energy Gradient */}
            <linearGradient id="silkLiquidStream" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0077b6">
                <animate
                  attributeName="stop-color"
                  values="#0077b6;#00b4d8;#00f5ff;#00509d;#0077b6"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="25%" stopColor="#00b4d8">
                <animate
                  attributeName="stop-color"
                  values="#00b4d8;#00f5ff;#00509d;#0077b6;#00b4d8"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#00f5ff">
                <animate
                  attributeName="stop-color"
                  values="#00f5ff;#00509d;#0077b6;#00b4d8;#00f5ff"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="75%" stopColor="#0096c7">
                <animate
                  attributeName="stop-color"
                  values="#0096c7;#0077b6;#00b4d8;#00f5ff;#0096c7"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#0077b6">
                <animate
                  attributeName="stop-color"
                  values="#0077b6;#00b4d8;#00f5ff;#00509d;#0077b6"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* 2. Traveling Liquid Wave Crest */}
            <linearGradient id="liquidTravelingCrest" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00b4d8" stopOpacity="0" />
              <stop offset="35%" stopColor="#00b4d8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00f5ff" stopOpacity="1" />
              <stop offset="65%" stopColor="#00b4d8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#00b4d8" stopOpacity="0" />
              <animate attributeName="x1" values="-100%;150%" dur="3.6s" repeatCount="indefinite" />
              <animate attributeName="x2" values="0%;250%" dur="3.6s" repeatCount="indefinite" />
            </linearGradient>

            {/* 3. Dynamic Cursor Proximity Radial Mask */}
            <radialGradient
              id="cursorSpotlightMaskGrad"
              cx={`${spotlightPos.x}%`}
              cy={`${spotlightPos.y}%`}
              r="28%"
              fx={`${spotlightPos.x}%`}
              fy={`${spotlightPos.y}%`}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            <mask id="cursorSpotlightMask">
              <rect x="0" y="0" width="100%" height="100%" fill="url(#cursorSpotlightMaskGrad)" />
            </mask>

            {/* 4. Silk Neon Glow Filter */}
            <filter id="silkNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BASE LAYER 1: Continuous Silk Liquid Stream */}
          <g opacity={0.88}>
            <text
              x="50%"
              y="178"
              textAnchor="middle"
              fill="none"
              stroke="url(#silkLiquidStream)"
              strokeWidth="3"
              fontSize="215"
              fontWeight="900"
              letterSpacing="18"
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            >
              WORKLOGIX
            </text>
          </g>

          {/* BASE LAYER 2: Traveling Liquid Wave Crest Pulse */}
          <g>
            <text
              x="50%"
              y="178"
              textAnchor="middle"
              fill="none"
              stroke="url(#liquidTravelingCrest)"
              strokeWidth="3.6"
              filter="url(#silkNeonGlow)"
              fontSize="215"
              fontWeight="900"
              letterSpacing="18"
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            >
              WORKLOGIX
            </text>
          </g>

          {/* SPOTLIGHT & CURSOR LIQUID RIPPLE LAYER: Interactive Reaction */}
          <g mask="url(#cursorSpotlightMask)">
            <text
              x="50%"
              y="178"
              textAnchor="middle"
              fill="rgba(0, 245, 255, 0.08)"
              stroke="#00F5FF"
              strokeWidth="4.2"
              filter="url(#silkNeonGlow)"
              fontSize="215"
              fontWeight="900"
              letterSpacing="18"
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            >
              WORKLOGIX
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
