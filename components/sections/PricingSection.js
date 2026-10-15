'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRICING_DATA, PRICING_PLANS } from '../../data/pricingData';

export default function PricingSection({ onOpenDemo, onOpenStart }) {
  const [currency, setCurrency] = useState('INR');
  const currentPrice = PRICING_DATA[currency];

  return (
    <section id="pricing" className="section-white" style={{ padding: '64px 0 80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 40px auto' }}>
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
              PICK YOUR
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
              PLAN
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
              margin: '0 auto 28px auto',
            }}
          >
            Choose the plan that fits your team and grow as your needs evolve.
          </motion.p>

          <div
            style={{
              display: 'inline-flex',
              background: '#f1f5f9',
              padding: '4px',
              borderRadius: '99px',
              gap: '4px',
            }}
          >
            {Object.keys(PRICING_DATA).map((key) => (
              <button
                key={key}
                onClick={() => setCurrency(key)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '99px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  background: currency === key ? '#00B4D8' : 'transparent',
                  color: currency === key ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s ease',
                }}
              >
                {PRICING_DATA[key].label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {PRICING_PLANS.map((plan, idx) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-light"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  ...(isPopular
                    ? {
                        border: '2px solid #00B4D8',
                        position: 'relative',
                        boxShadow: '0 10px 30px rgba(0, 180, 216, 0.15)',
                      }
                    : {}),
                }}
              >
                {isPopular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#00B4D8',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '4px 16px',
                      borderRadius: '99px',
                    }}
                  >
                    Most popular
                  </span>
                )}

                <div>
                  <h3
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      marginBottom: '6px',
                      color: isPopular ? '#00B4D8' : '#0f172a',
                    }}
                  >
                    {plan.name}
                  </h3>

                  <div style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' }}>
                    {plan.isCustom ? (
                      plan.customPriceText
                    ) : (
                      <>
                        {currentPrice.symbol}
                        {currentPrice[plan.priceKey]}{' '}
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '400' }}>
                          {plan.billingPeriod}
                        </span>
                      </>
                    )}
                  </div>

                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
                    {plan.description}
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      fontSize: '0.9rem',
                      color: '#334155',
                    }}
                  >
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx}>• {feat}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    if (plan.isDemo) {
                      onOpenDemo(plan.sourceKey, e.currentTarget);
                    } else {
                      onOpenStart(plan.sourceKey, e.currentTarget);
                    }
                  }}
                  className={plan.buttonVariant === 'blue' ? 'btn-pill-blue' : 'btn-pill-outline'}
                  style={{ width: '100%', marginTop: '32px' }}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
