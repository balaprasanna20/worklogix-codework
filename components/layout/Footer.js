'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer({ onOpenDemo, onOpenStart }) {
  return (
    <section className="section-blue-banner" style={{ padding: '80px 0 40px 0' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ marginBottom: '20px' }}>
              <img
                src="/logo_white_clean.png"
                alt="WorkLogix"
                style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: '800',
                lineHeight: '1.25',
                marginBottom: '16px',
                color: '#ffffff',
              }}
            >
              The complete work management platform for modern teams.
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.92)',
                marginBottom: '32px',
              }}
            >
              Work smarter. Grow faster.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={(e) => onOpenStart('footer_banner_start', e.currentTarget)}
                className="btn-pill-white"
              >
                Start free
              </button>
              <button
                onClick={(e) => onOpenDemo('footer_banner_demo', e.currentTarget)}
                className="btn-pill-glass-white"
              >
                Book a demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255, 255, 255, 0.14)',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: '800',
                marginBottom: '12px',
                color: '#ffffff',
              }}
            >
              Ready to transform organizational visibility?
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.92)',
                marginBottom: '24px',
              }}
            >
              Join teams delivering projects faster with zero unstructured chaos.
            </p>
            <button
              onClick={(e) => onOpenStart('footer_card_start', e.currentTarget)}
              className="btn-pill-white"
              style={{ width: '100%', padding: '14px 28px' }}
            >
              Get Started Today
            </button>
          </motion.div>
        </div>

        <div
          style={{
            marginTop: '72px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.22)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span>© 2026 WorkLogix. A product by</span>
            <a
              href="https://codework.ai/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Codework.ai"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                textDecoration: 'none',
                color: '#ffffff',
                fontWeight: '800',
                transition: 'opacity 0.2s ease',
                verticalAlign: 'middle',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {/* Official Codework Logo Icon */}
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                style={{ display: 'inline-block' }}
              >
                <path
                  d="M18 7A8 8 0 1 0 18 17"
                  stroke="#56CCF2"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="3.2" fill="#56CCF2" />
              </svg>
              <span
                style={{
                  letterSpacing: '0.8px',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  color: '#ffffff',
                }}
              >
                CODEWORK
              </span>
            </a>
            <span>. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#features" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>
              Features
            </a>
            <a href="#pricing" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>
              Pricing
            </a>
            <a href="#contact" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>
              Contact
            </a>
            <a href="#" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
