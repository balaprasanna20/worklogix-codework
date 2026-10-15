'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { KEY_FEATURES } from '../../data/featuresData';

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        padding: '48px 0 60px 0',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 36px auto' }}>
          {/* Side-Sliding Scroll Animation Title */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
              fontWeight: '900',
              letterSpacing: '-1.5px',
              margin: '0 0 14px 0',
              position: 'relative',
              flexWrap: 'wrap',
            }}
          >
            <motion.div
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: '#0f172a',
                whiteSpace: 'nowrap',
              }}
            >
              KEY FEATURES FOR
            </motion.div>

            <motion.div
              initial={{ x: 150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 10px 20px rgba(0, 180, 216, 0.2))',
                whiteSpace: 'nowrap',
              }}
            >
              EVERY STAGE
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              color: '#64748b',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            From task assignment to project costing, WorkLogix brings everything together into one
            intelligent workspace.
          </motion.p>
        </div>

        {/* 6 Feature Cards arranged in a 3x2 Grid with Interactive Hover Animations */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {KEY_FEATURES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0, 180, 216, 0.14)',
                borderColor: '#90e0ef',
              }}
              whileTap={{ scale: 0.98 }}
              className="card-light"
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '24px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #e6f9fc 0%, #caf0f8 100%)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 180, 216, 0.12)',
                    }}
                  >
                    <item.icon size={24} color="#00B4D8" />
                  </div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      background: item.badgeBg,
                      color: item.badgeColor,
                      padding: '5px 12px',
                      borderRadius: '99px',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '8px',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#00B4D8',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  marginTop: '20px',
                }}
              >
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
