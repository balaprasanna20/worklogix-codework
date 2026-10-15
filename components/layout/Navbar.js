'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar({ onOpenDemo, onOpenStart }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="WorkLogix"
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Navigation Links with Top/Bottom Scale Hover Effect */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#features" className="nav-link-effect">
            Features
          </a>
          <a href="#solutions" className="nav-link-effect">
            Solutions
          </a>
          <a href="#pricing" className="nav-link-effect">
            Pricing
          </a>
          <a href="#contact" className="nav-link-effect">
            Contact
          </a>
        </nav>

        {/* Right Action Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={(e) => onOpenDemo('header_demo', e.currentTarget)}
            className="btn-pill-outline"
          >
            Book a demo
          </button>

          <button
            onClick={(e) => onOpenStart('header_start', e.currentTarget)}
            className="btn-pill-blue"
          >
            Start free
          </button>
        </div>
      </div>
    </header>
  );
}
