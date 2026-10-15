'use client';

import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, Loader2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { COUNTRIES, COMPANY_SIZES, trackEvent } from '../lib/leadData';

export default function StartFreeForm({ sourceButton = 'start_modal', onSubmitted, isPage = false }) {
  const [mountTime] = useState(() => Date.now());
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    companySize: '',
    country: 'India',
    phone: '',
    privacyAccepted: false,
    marketingConsent: false,
    hp_fax: '', // honeypot
  });

  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    page_url: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUtmParams({
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_term: params.get('utm_term') || '',
        utm_content: params.get('utm_content') || '',
        page_url: window.location.href,
      });
    }

    trackEvent('start_form_view', { source_button: sourceButton });
  }, [sourceButton]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value || !value.trim()) error = 'Full name is required';
        break;
      case 'workEmail':
        if (!value || !value.trim()) {
          error = 'Work email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'companyName':
        if (!value || !value.trim()) error = 'Company name is required';
        break;
      case 'companySize':
        if (!value) error = 'Please select your company size';
        break;
      case 'country':
        if (!value) error = 'Please select your country';
        break;
      case 'privacyAccepted':
        if (!value) error = 'You must agree to the Privacy Policy to proceed';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    ['fullName', 'workEmail', 'companyName', 'companySize', 'country', 'privacyAccepted'].forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setTouched({
      fullName: true,
      workEmail: true,
      companyName: true,
      companySize: true,
      country: true,
      privacyAccepted: true,
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    const fillTimeMs = Date.now() - mountTime;

    const payload = {
      form_type: 'start_free',
      source_button: sourceButton,
      fill_time_ms: fillTimeMs,
      full_name: formData.fullName.trim(),
      work_email: formData.workEmail.trim(),
      company_name: formData.companyName.trim(),
      company_size: formData.companySize,
      country: formData.country,
      phone: formData.phone.trim(),
      privacy_accepted: formData.privacyAccepted,
      marketing_consent: formData.marketingConsent,
      hp_fax: formData.hp_fax,
      ...utmParams,
    };

    try {
      trackEvent('start_submit', {
        email: payload.work_email,
        company: payload.company_name,
      });

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to submit registration');
      }

      setSubmittedData({ ...payload });
      setIsSuccess(true);
      if (onSubmitted) onSubmitted(payload);
    } catch (err) {
      console.error('Start Free submission error:', err);
      setErrors((prev) => ({
        ...prev,
        form: 'Could not submit your request at this moment. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && submittedData) {
    return (
      <div style={{ textAlign: 'center', padding: isPage ? '40px 24px' : '28px 8px' }}>
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 12px 28px rgba(0, 180, 216, 0.35)',
          }}
        >
          <Check size={36} strokeWidth={3} />
        </div>

        <h3
          style={{
            fontSize: '1.65rem',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '10px',
            letterSpacing: '-0.5px',
          }}
        >
          Registration Received!
        </h3>

        <p
          style={{
            fontSize: '1.12rem',
            color: '#0f172a',
            lineHeight: '1.6',
            maxWidth: '500px',
            margin: '0 auto 16px auto',
            fontWeight: '600',
          }}
        >
          Thanks! We will contact you within 1 business day.
        </p>

        <p
          style={{
            fontSize: '0.94rem',
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '460px',
            margin: '0 auto 24px auto',
          }}
        >
          We sent a confirmation to <strong style={{ color: '#0f172a' }}>{submittedData.work_email}</strong>. Our onboarding team will configure your WorkLogix workspace for {submittedData.company_name}.
        </p>

        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 20px',
            maxWidth: '440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left',
          }}
        >
          <Clock size={20} color="#00B4D8" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.4' }}>
            No credit card required • Full access to role-based workspaces, project costing & time logs.
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Honeypot field (hidden from real users) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input
          type="text"
          name="hp_fax"
          value={formData.hp_fax}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {errors.form && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={18} />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Row 1: Full Name & Work Email */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Full name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Alex Morgan"
            aria-invalid={!!errors.fullName}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: errors.fullName ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.94rem',
              color: '#0f172a',
              outline: 'none',
            }}
          />
          {errors.fullName && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.fullName}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Work email <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="alex@company.com or alex@gmail.com"
            aria-invalid={!!errors.workEmail}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: errors.workEmail ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.94rem',
              color: '#0f172a',
              outline: 'none',
            }}
          />
          {errors.workEmail && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.workEmail}</p>}
        </div>
      </div>

      {/* Row 2: Company Name & Company Size */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Company name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Nova Studio"
            aria-invalid={!!errors.companyName}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: errors.companyName ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.94rem',
              color: '#0f172a',
              outline: 'none',
            }}
          />
          {errors.companyName && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.companyName}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Company size <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.companySize}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: errors.companySize ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.94rem',
              color: formData.companySize ? '#0f172a' : '#94a3b8',
              outline: 'none',
            }}
          >
            <option value="">Select team size</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size} style={{ color: '#0f172a' }}>
                {size} employees
              </option>
            ))}
          </select>
          {errors.companySize && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.companySize}</p>}
        </div>
      </div>

      {/* Row 3: Country & Phone/WhatsApp (Optional) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Country <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.country}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: errors.country ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.94rem',
              color: '#0f172a',
              outline: 'none',
            }}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.country}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Phone or WhatsApp <span style={{ color: '#94a3b8', fontWeight: '400' }}>(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 019-2834"
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.94rem',
              color: '#0f172a',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Trust Highlight Box */}
      <div
        style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <ShieldCheck size={18} color="#16a34a" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.84rem', color: '#166534', fontWeight: '500' }}>
          Free 7-day trial with all premium features unlocked. No credit card needed.
        </span>
      </div>

      {/* Compliance & Consent Checkboxes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px' }}>
        {/* Privacy Policy (Required) */}
        <div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#334155' }}>
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ accentColor: '#00B4D8', width: '16px', height: '16px', marginTop: '3px', cursor: 'pointer' }}
            />
            <span>
              I agree to the{' '}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert('WorkLogix Privacy Policy: We respect your privacy and never sell your personal information. Data collected is used solely for workspace creation and support.');
                }}
                style={{ color: '#00B4D8', textDecoration: 'underline', fontWeight: '600' }}
              >
                Privacy Policy
              </a>
              . <span style={{ color: '#ef4444' }}>*</span>
            </span>
          </label>
          {errors.privacyAccepted && (
            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '2px', marginLeft: '26px' }}>{errors.privacyAccepted}</p>
          )}
        </div>

        {/* Marketing Emails (Optional) */}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#64748b' }}>
          <input
            type="checkbox"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={handleChange}
            style={{ accentColor: '#00B4D8', width: '16px', height: '16px', marginTop: '3px', cursor: 'pointer' }}
          />
          <span>Keep me updated with WorkLogix product features and best practices.</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-pill-blue"
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '1.05rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.8 : 1,
          marginTop: '6px',
          boxShadow: '0 8px 20px rgba(0, 180, 216, 0.28)',
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Creating your free trial...</span>
          </>
        ) : (
          <>
            <span>Start Free 7-Day Trial</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
