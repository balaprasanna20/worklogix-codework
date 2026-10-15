'use client';

import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MobileStickyBar from '../components/layout/MobileStickyBar';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import SolutionsSection from '../components/sections/SolutionsSection';
import RolesSection from '../components/sections/RolesSection';
import PricingSection from '../components/sections/PricingSection';
import ContactSection from '../components/sections/ContactSection';
import WatermarkSection from '../components/sections/WatermarkSection';
import ModalWrapper from '../components/ModalWrapper';
import BookDemoForm from '../components/BookDemoForm';
import StartFreeForm from '../components/StartFreeForm';
import LoginModal from '../components/modals/LoginModal';
import { trackEvent } from '../lib/leadData';

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('direct');

  const lastFocusedTriggerRef = useRef(null);

  const openDemoModal = (source = 'direct', triggerEl = null) => {
    lastFocusedTriggerRef.current =
      triggerEl || (typeof document !== 'undefined' ? document.activeElement : null);
    setModalSource(source);
    setDemoModalOpen(true);
    trackEvent('demo_click', { source_button: source });
  };

  const openStartModal = (source = 'direct', triggerEl = null) => {
    lastFocusedTriggerRef.current =
      triggerEl || (typeof document !== 'undefined' ? document.activeElement : null);
    setModalSource(source);
    setStartModalOpen(true);
    trackEvent('start_click', { source_button: source });
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      {/* 1. Top Navigation Bar */}
      <Navbar onOpenDemo={openDemoModal} onOpenStart={openStartModal} />

      {/* 2. Hero Showcase Section */}
      <HeroSection onOpenDemo={openDemoModal} onOpenStart={openStartModal} />

      {/* 3. Key Features Section */}
      <FeaturesSection />

      {/* 4. Industry Solutions Section */}
      <SolutionsSection />

      {/* 5. Role-based Workspaces Section */}
      <RolesSection />

      {/* 6. Pricing & Plans Section */}
      <PricingSection onOpenDemo={openDemoModal} onOpenStart={openStartModal} />

      {/* 7. Contact & Inquiries Section */}
      <ContactSection />

      {/* 8. Interactive Watermark & Laser Brand Section */}
      <WatermarkSection onOpenDemo={openDemoModal} />

      {/* 9. Global Footer & CTA Banner */}
      <Footer onOpenDemo={openDemoModal} onOpenStart={openStartModal} />

      {/* ==================== MODALS ==================== */}

      {/* Book a Demo Modal */}
      <ModalWrapper
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        triggerRef={lastFocusedTriggerRef}
        title="Schedule Your 1-on-1 Demo"
        subtitle="See WorkLogix in action with examples tailored to your team's workflow."
      >
        <BookDemoForm sourceButton={modalSource} onSubmitted={() => {}} />
      </ModalWrapper>

      {/* Start Free Trial Modal */}
      <ModalWrapper
        isOpen={startModalOpen}
        onClose={() => setStartModalOpen(false)}
        triggerRef={lastFocusedTriggerRef}
        title="Start Your 7-Day Free Trial"
        subtitle="Full access to role-based workspaces, project costing & time logs. No credit card required."
      >
        <StartFreeForm sourceButton={modalSource} onSubmitted={() => {}} />
      </ModalWrapper>

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenDemo={openDemoModal} onOpenStart={openStartModal} />
    </div>
  );
}
