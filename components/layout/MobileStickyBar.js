'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileStickyBar({ onOpenDemo, onOpenStart }) {
  const [showMobileStickyBar, setShowMobileStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileStickyBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showMobileStickyBar && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mobile-sticky-bar"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            right: '16px',
            zIndex: 90,
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(226, 232, 240, 0.95)',
            borderRadius: '9999px',
            padding: '8px 12px 8px 16px',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.18)',
            display: 'none', // Shown on mobile screens via CSS
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/logo.png"
              alt="WorkLogix"
              style={{ height: '22px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={(e) => onOpenDemo('mobile_sticky_demo', e.currentTarget)}
              className="btn-pill-outline"
              style={{ padding: '8px 14px', fontSize: '0.82rem', background: '#ffffff' }}
            >
              Book demo
            </button>
            <button
              onClick={(e) => onOpenStart('mobile_sticky_start', e.currentTarget)}
              className="btn-pill-blue"
              style={{
                padding: '8px 18px',
                fontSize: '0.82rem',
                boxShadow: '0 4px 14px rgba(0, 180, 216, 0.35)',
              }}
            >
              Start free
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
