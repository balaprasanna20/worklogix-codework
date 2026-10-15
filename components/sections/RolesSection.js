'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ROLES_DATA } from '../../data/featuresData';

export default function RolesSection() {
  const [activeRole, setActiveRole] = useState('leadership');

  return (
    <section className="section-dark" style={{ padding: '64px 0 80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 48px auto' }}>
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
              initial={{ x: -120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: '#ffffff',
                whiteSpace: 'nowrap',
              }}
            >
              DESIGNED FOR
            </motion.div>

            <motion.div
              initial={{ x: 120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(135deg, #38BDF8 0%, #00B4D8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 10px 20px rgba(56, 189, 248, 0.3))',
                whiteSpace: 'nowrap',
              }}
            >
              EVERY ROLE
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            WorkLogix gives each person in your organisation the right view, tools and control.
          </motion.p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {ROLES_DATA.map((role, rIdx) => {
            const isActive = activeRole === role.id;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: rIdx * 0.08 }}
                onClick={() => setActiveRole(role.id)}
                style={{
                  background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.14)',
                  border: isActive ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '16px',
                  padding: '28px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isActive ? '0 12px 30px rgba(0,0,0,0.15)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: isActive ? '#e6f9fc' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <role.icon size={24} color="#00B4D8" />
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    marginBottom: '8px',
                    color: isActive ? '#0f172a' : '#ffffff',
                  }}
                >
                  {role.title}
                </h3>
                <p
                  style={{
                    color: isActive ? '#64748b' : 'rgba(255, 255, 255, 0.85)',
                    fontSize: '0.9rem',
                    marginBottom: '20px',
                  }}
                >
                  {role.sub}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: isActive ? '#00B4D8' : '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                  }}
                >
                  <span>Explore view</span> <ArrowRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
