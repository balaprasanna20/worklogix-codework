'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onOpenDemo, onOpenStart }) {
  const [droppingWordIndex, setDroppingWordIndex] = useState(0);
  const droppingWords = ['PROJECT', 'TASK', 'HOUR'];

  useEffect(() => {
    const timer = setInterval(() => {
      setDroppingWordIndex((prev) => (prev + 1) % droppingWords.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '40px',
        paddingBottom: '70px',
        background:
          "linear-gradient(180deg, rgba(240, 247, 255, 0.96) 0%, rgba(255, 255, 255, 0.98) 100%), url('/hero_bg.jpg') center/cover no-repeat",
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.35fr',
            gap: '40px',
            alignItems: 'center',
            minHeight: '540px',
            paddingTop: '10px',
          }}
        >
          {/* Left Column: Hero Headline, CTA Buttons & Metrics */}
          <div style={{ maxWidth: '620px', zIndex: 2 }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '4.1rem',
                fontWeight: '800',
                lineHeight: '1.15',
                color: '#0f172a',
                letterSpacing: '-1.8px',
                marginBottom: '22px',
              }}
            >
              EVERY{' '}
              <span
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  height: '1.18em',
                  verticalAlign: 'top',
                  overflow: 'hidden',
                  minWidth: '290px',
                  color: '#00B4D8',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={droppingWords[droppingWordIndex]}
                    initial={{ y: -55, opacity: 0, filter: 'blur(5px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: 55, opacity: 0, filter: 'blur(5px)' }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      color: '#00B4D8',
                      display: 'inline-block',
                    }}
                  >
                    {droppingWords[droppingWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span style={{ color: '#0f172a' }}>IN ONE PLACE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: '1.22rem',
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '34px',
                maxWidth: '570px',
              }}
            >
              WorkLogix helps organisations assign, track and complete work while giving leadership
              real-time visibility into teams, time and project costs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '18px', alignItems: 'center' }}
            >
              <button
                onClick={(e) => onOpenStart('hero_start', e.currentTarget)}
                className="btn-pill-blue"
                style={{
                  padding: '16px 40px',
                  fontSize: '1.12rem',
                  boxShadow: '0 10px 24px rgba(0, 180, 216, 0.25)',
                }}
              >
                Start free
              </button>
              <button
                onClick={(e) => onOpenDemo('hero_demo', e.currentTarget)}
                className="btn-pill-outline"
                style={{ padding: '15px 38px', fontSize: '1.12rem', background: '#ffffff' }}
              >
                Book a demo
              </button>
            </motion.div>

            {/* Micro-Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                marginTop: '24px',
                flexWrap: 'wrap',
                fontSize: '0.86rem',
                color: '#475569',
                fontWeight: '600',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#00B4D8" /> No Credit Card Required
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} color="#00B4D8" /> 2-Min Setup
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#00B4D8" /> Free 7-Day Access
              </span>
            </motion.div>
          </div>

          {/* Right Column: Clean Floating 4K Laptop Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {/* Radial Glow Background */}
            <div
              style={{
                position: 'absolute',
                width: '750px',
                height: '550px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(0, 180, 216, 0.24) 0%, rgba(0, 180, 216, 0.08) 55%, rgba(0, 180, 216, 0) 80%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />

            {/* Static Levitation 4K Laptop Showcase */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '860px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/hero_laptop_slide_1.png"
                alt="WorkLogix Live Dashboard Showcase"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '680px',
                  objectFit: 'contain',
                  filter:
                    'drop-shadow(0 28px 56px rgba(0, 180, 216, 0.22)) drop-shadow(0 16px 32px rgba(15, 23, 42, 0.14))',
                  display: 'block',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
