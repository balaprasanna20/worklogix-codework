'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from '../../data/featuresData';

export default function SolutionsSection() {
  return (
    <section id="solutions" className="section-light" style={{ padding: '64px 0 80px 0' }}>
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
                color: '#0f172a',
                whiteSpace: 'nowrap',
              }}
            >
              BUILT FOR
            </motion.div>

            <motion.div
              initial={{ x: 120, opacity: 0 }}
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
              YOUR INDUSTRY
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
            No matter your industry, WorkLogix adapts to your unique workflows and challenges.
          </motion.p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {INDUSTRY_SOLUTIONS.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-light"
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: '#e6f9fc',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <ind.icon size={20} color="#00B4D8" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '4px' }}>
                  {ind.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{ind.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
              height: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <div>
              <Building2 size={56} style={{ marginBottom: '16px', opacity: 0.9 }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
                Enterprise Grade Infrastructure
              </h3>
              <p style={{ fontSize: '1rem', opacity: 0.9, maxWidth: '400px', margin: '0 auto' }}>
                Tailored workflow engines configured for cross-functional industry operations
                worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
