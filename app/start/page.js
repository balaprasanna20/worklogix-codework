'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Clock, Lock } from 'lucide-react';
import StartFreeForm from '../../components/StartFreeForm';

export default function StartPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      {/* Top Simple Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="WorkLogix" style={{ height: '36px', width: 'auto' }} />
          </Link>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '0.9rem',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      {/* Main Content Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
          
          {/* Left Column: Value Proposition & Proof */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '999px', fontSize: '0.84rem', fontWeight: '700', marginBottom: '16px' }}>
              <Sparkles size={14} />
              7-Day Full-Featured Free Trial
            </div>

            <h1 style={{ fontSize: '2.6rem', fontWeight: '800', lineHeight: '1.2', color: '#0f172a', letterSpacing: '-1px', marginBottom: '18px' }}>
              Start managing your projects and team in one place
            </h1>

            <p style={{ fontSize: '1.12rem', color: '#475569', lineHeight: '1.65', marginBottom: '32px' }}>
              Get instant access to WorkLogix. Onboard your team, assign tasks with deadlines, and track real-time project profitability.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle2 size={22} color="#00B4D8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>All 4 Role-Based Workspaces</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Dedicated views for Admins, Project Managers, Team Members, and Clients.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle2 size={22} color="#00B4D8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>Built-in Time Logging & Billable Hours</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Track hourly rates, internal cost vs client billing effortlessly.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle2 size={22} color="#00B4D8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>Enterprise Data Security</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>ISO-ready infrastructure, encrypted backups, and audit logs.</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', flexShrink: 0 }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h5 style={{ margin: '0 0 2px 0', fontSize: '0.94rem', fontWeight: '700', color: '#0f172a' }}>100% Free • No Credit Card Required</h5>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}>Try risk-free with up to 15 members during your trial period.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Start Free Form Card */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.9)' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
              Create Your Free Account
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Get started in seconds. We will configure your workspace right away.
            </p>

            <StartFreeForm sourceButton="start_page" isPage={true} />
          </div>

        </div>
      </main>
    </div>
  );
}
