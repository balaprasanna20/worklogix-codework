'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ModalWrapper({
  isOpen,
  onClose,
  triggerRef,
  title,
  subtitle,
  children
}) {
  const modalRef = useRef(null);

  // Lock body scroll and trap keyboard focus
  useEffect(() => {
    if (!isOpen) return;

    // Save previous overflow style
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus into modal
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const firstInput = modalRef.current.querySelector('input:not([type="hidden"]), select, button');
        if (firstInput) firstInput.focus();
      }
    }, 60);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      // Return focus to trigger button
      if (triggerRef && triggerRef.current) {
        try {
          triggerRef.current.focus();
        } catch (err) {
          // ignore
        }
      }
    };
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            overflowY: 'auto'
          }}
          className="modal-backdrop-container"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="modal-content-card"
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(226, 232, 240, 0.8)',
              position: 'relative',
              padding: '36px 36px 32px 36px',
              margin: 'auto'
            }}
          >
            {/* Header with Title and Close Button */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '16px',
              position: 'sticky',
              top: '-36px',
              background: '#ffffff',
              paddingTop: '8px',
              zIndex: 10,
              marginTop: '-8px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <img src="/logo.png" alt="WorkLogix" style={{ height: '24px', width: 'auto' }} />
                </div>
                {title && (
                  <h2 id="modal-title" style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', margin: '4px 0 2px 0', letterSpacing: '-0.5px' }}>
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="modal-close-btn"
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Content */}
            <div style={{ position: 'relative' }}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
