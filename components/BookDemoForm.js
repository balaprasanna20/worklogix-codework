'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Calendar,
  Clock,
  Globe,
  AlertCircle,
  Loader2,
  Sparkles,
  Download,
  ArrowRight,
  ArrowLeft,
  User,
  CheckCircle2,
} from 'lucide-react';
import {
  COUNTRIES,
  COMPANY_SIZES,
  FIX_OPTIONS,
  ROLES,
  TIME_SLOTS,
  trackEvent,
  downloadICS,
} from '../lib/leadData';

export default function BookDemoForm({ sourceButton = 'demo_modal', onSubmitted, isPage = false }) {
  const [mountTime] = useState(() => Date.now());
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    companySize: '',
    country: 'India',
    phone: '',
    role: '',
    problemsToFix: [],
    demoDate: '',
    demoTime: '10:00 AM',
    timezone: '',
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

  // Initialize timezone, default next weekday date, and extract UTM parameters
  useEffect(() => {
    // Detect visitor timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
      setFormData((prev) => ({ ...prev, timezone: tz }));
    } catch (e) {
      setFormData((prev) => ({ ...prev, timezone: 'Asia/Kolkata' }));
    }

    // Default next business day date (YYYY-MM-DD)
    const today = new Date();
    let nextBusinessDay = new Date(today);
    nextBusinessDay.setDate(today.getDate() + 1);
    while (nextBusinessDay.getDay() === 0 || nextBusinessDay.getDay() === 6) {
      nextBusinessDay.setDate(nextBusinessDay.getDate() + 1);
    }
    const yyyy = nextBusinessDay.getFullYear();
    const mm = String(nextBusinessDay.getMonth() + 1).padStart(2, '0');
    const dd = String(nextBusinessDay.getDate()).padStart(2, '0');
    const defaultDateStr = `${yyyy}-${mm}-${dd}`;

    setFormData((prev) => ({ ...prev, demoDate: prev.demoDate || defaultDateStr }));

    // Extract UTM parameters from window.location
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

    trackEvent('demo_form_view', { source_button: sourceButton });
  }, [sourceButton]);

  // Minimum allowed date (today's string)
  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

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
      case 'demoDate':
        if (!value) {
          error = 'Please select a preferred date';
        } else {
          const selected = new Date(value + 'T00:00:00');
          const day = selected.getDay();
          if (day === 0 || day === 6) {
            error = 'Demos are hosted on weekdays (Mon–Fri) only';
          } else if (value < todayStr) {
            error = 'Please select a future date';
          }
        }
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

  const handleCheckboxToggle = (option) => {
    setFormData((prev) => {
      const exists = prev.problemsToFix.includes(option);
      return {
        ...prev,
        problemsToFix: exists
          ? prev.problemsToFix.filter((item) => item !== option)
          : [...prev.problemsToFix, option],
      };
    });
  };

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    const step1Fields = ['fullName', 'workEmail', 'companyName', 'companySize', 'country'];
    const newErrors = {};
    const newTouched = {};

    step1Fields.forEach((field) => {
      newTouched[field] = true;
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.focus();
      return;
    }

    setCurrentStep(2);
    trackEvent('demo_form_step2_reached', { email: formData.workEmail });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields across both steps
    const newErrors = {};
    ['fullName', 'workEmail', 'companyName', 'companySize', 'country', 'demoDate', 'privacyAccepted'].forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setTouched({
      fullName: true,
      workEmail: true,
      companyName: true,
      companySize: true,
      country: true,
      demoDate: true,
      privacyAccepted: true,
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.fullName || newErrors.workEmail || newErrors.companyName || newErrors.companySize || newErrors.country) {
        setCurrentStep(1);
      }
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    const fillTimeMs = Date.now() - mountTime;

    const payload = {
      form_type: 'book_a_demo',
      source_button: sourceButton,
      fill_time_ms: fillTimeMs,
      full_name: formData.fullName.trim(),
      work_email: formData.workEmail.trim(),
      company_name: formData.companyName.trim(),
      company_size: formData.companySize,
      country: formData.country,
      phone: formData.phone.trim(),
      role: formData.role,
      problems_to_fix: formData.problemsToFix,
      demo_date: formData.demoDate,
      demo_time: formData.demoTime,
      demo_timezone: formData.timezone,
      privacy_accepted: formData.privacyAccepted,
      marketing_consent: formData.marketingConsent,
      hp_fax: formData.hp_fax,
      ...utmParams,
    };

    try {
      trackEvent('demo_submit', {
        email: payload.work_email,
        company: payload.company_name,
        demo_date: payload.demo_date,
      });

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to submit demo request');
      }

      setSubmittedData({ ...payload });
      setIsSuccess(true);
      if (onSubmitted) onSubmitted(payload);
    } catch (err) {
      console.error('Demo submission error:', err);
      setErrors((prev) => ({
        ...prev,
        form: 'Could not submit your request at this moment. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadICS = () => {
    if (!submittedData) return;
    downloadICS({
      title: 'WorkLogix Live 1-on-1 Product Demo',
      description: `WorkLogix custom walkthrough for ${submittedData.company_name}.\n\nTopics to cover:\n${(submittedData.problems_to_fix || []).join('\n• ')}\n\nHost: WorkLogix Solutions Team`,
      dateStr: submittedData.demo_date,
      timeStr: submittedData.demo_time,
      timezone: submittedData.demo_timezone,
      location: 'Google Meet (Link will be sent to ' + submittedData.work_email + ')',
    });
  };

  // Formatted date string for success screen
  const formattedDemoDate = submittedData?.demo_date
    ? new Date(submittedData.demo_date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : formData.demoDate;

  if (isSuccess && submittedData) {
    return (
      <div style={{ textAlign: 'center', padding: isPage ? '40px 24px' : '24px 8px' }}>
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
          Demo Confirmed!
        </h3>

        <p
          style={{
            fontSize: '1.08rem',
            color: '#334155',
            lineHeight: '1.6',
            maxWidth: '520px',
            margin: '0 auto 16px auto',
            fontWeight: '500',
          }}
        >
          Your demo is booked for{' '}
          <strong style={{ color: '#0077B6' }}>
            {formattedDemoDate} at {submittedData.demo_time} ({submittedData.demo_timezone})
          </strong>
          . Check your email at <span style={{ textDecoration: 'underline' }}>{submittedData.work_email}</span> for your invitation.
        </p>

        <div
          style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '12px',
            padding: '16px 20px',
            maxWidth: '480px',
            margin: '0 auto 28px auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left',
          }}
        >
          <Sparkles size={22} color="#00B4D8" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#0369a1', lineHeight: '1.5', fontWeight: '600' }}>
            We will show WorkLogix using your own project example.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleDownloadICS}
            className="btn-pill-blue"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              fontSize: '1rem',
            }}
          >
            <Download size={18} />
            Add to calendar (.ics)
          </button>
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

      {/* 2-Step Progress Indicator Header */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '6px',
        }}
      >
        {/* Step 1 Pill */}
        <div
          onClick={() => setCurrentStep(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            opacity: currentStep === 1 ? 1 : 0.75,
            transition: 'all 0.2s ease',
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: currentStep === 1 ? '#00B4D8' : '#e2e8f0',
              color: currentStep === 1 ? '#ffffff' : '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.82rem',
              fontWeight: '800',
              boxShadow: currentStep === 1 ? '0 2px 8px rgba(0, 180, 216, 0.35)' : 'none',
            }}
          >
            {currentStep === 2 ? <Check size={14} strokeWidth={3} color="#0284c7" /> : '1'}
          </div>
          <span
            style={{
              fontSize: '0.86rem',
              fontWeight: currentStep === 1 ? '700' : '600',
              color: currentStep === 1 ? '#0f172a' : '#64748b',
            }}
          >
            Your Details
          </span>
        </div>

        {/* Progress Line */}
        <div
          style={{
            flex: 1,
            height: '2px',
            background: currentStep === 2 ? '#00B4D8' : '#e2e8f0',
            borderRadius: '2px',
            transition: 'background 0.3s ease',
          }}
        />

        {/* Step 2 Pill */}
        <div
          onClick={() => handleNextStep()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            opacity: currentStep === 2 ? 1 : 0.65,
            transition: 'all 0.2s ease',
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: currentStep === 2 ? '#00B4D8' : '#e2e8f0',
              color: currentStep === 2 ? '#ffffff' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.82rem',
              fontWeight: '800',
              boxShadow: currentStep === 2 ? '0 2px 8px rgba(0, 180, 216, 0.35)' : 'none',
            }}
          >
            2
          </div>
          <span
            style={{
              fontSize: '0.86rem',
              fontWeight: currentStep === 2 ? '700' : '600',
              color: currentStep === 2 ? '#0f172a' : '#64748b',
            }}
          >
            Date & Goals
          </span>
        </div>
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

      {/* STEP 1: Basic Information */}
      {currentStep === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
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
                placeholder="Sarah Jenkins"
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
                placeholder="sarah@company.com"
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
                placeholder="Acme Technologies"
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

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleNextStep}
            className="btn-pill-blue"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              marginTop: '8px',
              boxShadow: '0 6px 18px rgba(0, 180, 216, 0.25)',
            }}
          >
            <span>Next: Choose Demo Time</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {/* STEP 2: Scheduling & Topics */}
      {currentStep === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Section: Preferred Date, Time & Timezone */}
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Calendar size={18} color="#00B4D8" />
              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0369a1' }}>
                Schedule Preferred 1-on-1 Walkthrough
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {/* Date Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Date (Mon–Fri) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="date"
                  name="demoDate"
                  min={todayStr}
                  value={formData.demoDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.demoDate}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: errors.demoDate ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                  }}
                />
                {errors.demoDate && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px', margin: '4px 0 0 0' }}>{errors.demoDate}</p>}
              </div>

              {/* Time Slot Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Time Slot <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  name="demoTime"
                  value={formData.demoTime}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                  }}
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timezone */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Time Zone
                </label>
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.86rem',
                    color: '#475569',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section: What do you want to fix? Checkboxes */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px' }}>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
              What would you like to solve? <span style={{ color: '#94a3b8', fontWeight: '400' }}>(optional)</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              {FIX_OPTIONS.map((opt) => {
                const isChecked = formData.problemsToFix.includes(opt);
                return (
                  <label
                    key={opt}
                    onClick={() => handleCheckboxToggle(opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      background: isChecked ? '#e0f2fe' : '#ffffff',
                      border: isChecked ? '1px solid #7dd3fc' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: isChecked ? '600' : '500',
                      color: isChecked ? '#0369a1' : '#334155',
                      transition: 'all 0.15s ease',
                      userSelect: 'none',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ accentColor: '#00B4D8', width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Row: Role in organization (Optional) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Your role <span style={{ color: '#94a3b8', fontWeight: '400' }}>(optional)</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                fontSize: '0.9rem',
                color: formData.role ? '#0f172a' : '#94a3b8',
                outline: 'none',
              }}
            >
              <option value="">Select your role</option>
              {ROLES.map((r) => (
                <option key={r} value={r} style={{ color: '#0f172a' }}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Compliance & Consent Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px' }}>
            {/* Privacy Policy (Required) */}
            <div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.84rem', color: '#334155' }}>
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ accentColor: '#00B4D8', width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
                />
                <span>
                  I agree to the{' '}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('WorkLogix Privacy Policy: We respect your privacy and never sell your personal information. Data collected is used solely for scheduling product demos and providing requested support.');
                    }}
                    style={{ color: '#00B4D8', textDecoration: 'underline', fontWeight: '600' }}
                  >
                    Privacy Policy
                  </a>
                  . <span style={{ color: '#ef4444' }}>*</span>
                </span>
              </label>
              {errors.privacyAccepted && (
                <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '2px', marginLeft: '26px' }}>{errors.privacyAccepted}</p>
              )}
            </div>

            {/* Marketing Emails (Optional) */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.84rem', color: '#64748b' }}>
              <input
                type="checkbox"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleChange}
                style={{ accentColor: '#00B4D8', width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
              />
              <span>Keep me updated with WorkLogix product updates and workflow best practices.</span>
            </label>
          </div>

          {/* Action Buttons: Back + Submit */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              style={{
                flex: '0 0 auto',
                padding: '14px 20px',
                borderRadius: '9999px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#475569',
                fontSize: '0.92rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-pill-blue"
              style={{
                flex: 1,
                padding: '14px 20px',
                fontSize: '0.98rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.8 : 1,
                boxShadow: '0 8px 20px rgba(0, 180, 216, 0.28)',
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Reserving your demo slot...</span>
                </>
              ) : (
                <span>Confirm & Schedule Live Demo</span>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
