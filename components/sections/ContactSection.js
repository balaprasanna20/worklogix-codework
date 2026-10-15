'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Check } from 'lucide-react';

export default function ContactSection() {
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section-dark">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontSize: '2.6rem',
                fontWeight: '800',
                marginBottom: '16px',
                color: '#ffffff',
              }}
            >
              Get in touch
            </h2>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                marginBottom: '40px',
                lineHeight: '1.6',
              }}
            >
              Have a question? We&apos;d love to help. Reach out or book a demo to see WorkLogix in
              action.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.18)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={22} color="#ffffff" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '600',
                    }}
                  >
                    Email
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>
                    hello@worklogix.com
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.18)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={22} color="#ffffff" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '600',
                    }}
                  >
                    Phone
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>
                    +91 98765 43210
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.18)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={22} color="#ffffff" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '600',
                    }}
                  >
                    Office
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>
                    Chennai, India
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
            }}
          >
            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <Check size={28} color="#16a34a" />
                </div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    marginBottom: '8px',
                    color: '#0f172a',
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: '#64748b' }}>Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: '#334155',
                      marginBottom: '8px',
                    }}
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      outline: 'none',
                      fontSize: '0.95rem',
                      color: '#0f172a',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: '#334155',
                      marginBottom: '8px',
                    }}
                  >
                    Work email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      outline: 'none',
                      fontSize: '0.95rem',
                      color: '#0f172a',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: '#334155',
                      marginBottom: '8px',
                    }}
                  >
                    Your message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help your team?"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      outline: 'none',
                      fontSize: '0.95rem',
                      resize: 'none',
                      color: '#0f172a',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-pill-blue"
                  style={{ width: '100%', marginTop: '8px', padding: '14px 28px' }}
                >
                  Send message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
