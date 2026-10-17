'use client';

import { useState, useRef, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Mail,
  RotateCcw,
} from 'lucide-react';

/* ============================================================
   SERVICES FOR DROPDOWN
   ============================================================ */
const SERVICES = [
  { key: 'pr' },
  { key: 'social' },
  { key: 'brand' },
  { key: 'content' },
  { key: 'influencer' },
  { key: 'ads' },
  { key: 'other' },
] as const;

/* ============================================================
   FORM STATE TYPE
   ============================================================ */
type FormData = {
  fullName: string;
  email: string;
  company: string;
  service: string;
  message: string;
  website: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  fullName: '',
  email: '',
  company: '',
  service: '',
  message: '',
  website: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

/* ============================================================
   ANIMATIONS
   ============================================================ */
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function ContactForm() {
  const t = useTranslations('ContactForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for focusing first error field
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  /* ---------- Handle input change (clears error on type) ---------- */
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  /* ---------- Client-side Validation ---------- */
  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    // Full Name
    if (!form.fullName.trim()) {
      newErrors.fullName = t('validation.fullNameRequired');
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = t('validation.fullNameMin');
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = t('validation.emailInvalid');
    }

    // Service
    if (!form.service) {
      newErrors.service = t('validation.serviceRequired');
    }

    // Message
    if (!form.message.trim()) {
      newErrors.message = t('validation.messageRequired');
    } else if (form.message.trim().length < 10) {
      newErrors.message = t('validation.messageMin');
    }

    setErrors(newErrors);

    // Focus first error field
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.fullName) nameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.service) serviceRef.current?.focus();
      else if (newErrors.message) messageRef.current?.focus();
      
      return false;
    }

    return true;
  }

  /* ---------- Handle submit ---------- */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    // 1. Validate
    const isValid = validateForm();
    if (!isValid) return;

    // 2. Submit
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to send inquiry'
      );
    }
  }

  /* ---------- Reset form ---------- */
  function handleReset() {
    setStatus('idle');
    setErrorMessage('');
    setForm(INITIAL_FORM);
    setErrors({});
  }

  // Helper to apply error classes to inputs
  const inputClass = (fieldName: keyof FormData) => 
    `form-input ${errors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : ''}`;

  return (
    <section
      id="inquiry-form"
      className="relative overflow-hidden bg-background py-20 md:py-24 lg:py-28"
      style={{ scrollMarginTop: '80px' }}
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[380px] w-[380px] rounded-full orb-brand blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[380px] w-[380px] rounded-full orb-teal blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        {/* HEADER (Same as before) */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="skeu-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-500 md:text-[11px]">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
            {t('badge')}
          </div>

          <h2 className="mt-5 font-display text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-foreground md:mt-6">
            {t('title.line1')}{' '}
            <span className="text-gradient-animated">
              {t('title.highlight')}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[13.5px] leading-relaxed text-muted md:mt-5 md:text-[15px]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative mx-auto mt-10 max-w-4xl md:mt-14"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <SuccessState key="success" t={t} onReset={handleReset} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="skeu-panel relative overflow-hidden rounded-3xl p-5 md:p-8 lg:p-10"
                noValidate
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl"
                />

                <div className="relative grid gap-4 md:grid-cols-2 md:gap-5">

                  {/* ---------- Full Name ---------- */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 md:text-[11px]"
                    >
                      {t('fields.fullName.label')} <span className="text-brand-500">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder={t('fields.fullName.placeholder')}
                      className={inputClass('fullName')}
                      aria-invalid={!!errors.fullName}
                      autoComplete="name"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-500 md:text-[12px]">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* ---------- Email ---------- */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 md:text-[11px]"
                    >
                      {t('fields.email.label')} <span className="text-brand-500">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('fields.email.placeholder')}
                      className={inputClass('email')}
                      aria-invalid={!!errors.email}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-500 md:text-[12px]">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* ---------- Company (optional) ---------- */}
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 md:text-[11px]"
                    >
                      {t('fields.company.label')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={t('fields.company.placeholder')}
                      className="form-input"
                      autoComplete="organization"
                    />
                  </div>

                  {/* ---------- Service Required ---------- */}
                  <div>
                    <label
                      htmlFor="service"
                      className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 md:text-[11px]"
                    >
                      {t('fields.service.label')} <span className="text-brand-500">*</span>
                    </label>
                    <select
                      ref={serviceRef}
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputClass('service')} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pe-10`}
                      aria-invalid={!!errors.service}
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767E8E' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
                      }}
                    >
                      <option value="" disabled>
                        {t('fields.service.placeholder')}
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.key} value={t(`services.${s.key}`)}>
                          {t(`services.${s.key}`)}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-500 md:text-[12px]">
                        <AlertCircle className="h-3 w-3" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* ---------- Project Details ---------- */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 md:text-[11px]"
                    >
                      {t('fields.message.label')} <span className="text-brand-500">*</span>
                    </label>
                    <textarea
                      ref={messageRef}
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder={t('fields.message.placeholder')}
                      className={`${inputClass('message')} resize-none`}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-500 md:text-[12px]">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* ---------- Honeypot ---------- */}
                  <div aria-hidden style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* ---------- Global Error Banner (Backend) ---------- */}
                  {status === 'error' && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="md:col-span-2 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <p className="text-[12.5px] leading-relaxed text-red-600 dark:text-red-400 md:text-[13px]">
                        {errorMessage}
                      </p>
                    </motion.div>
                  )}

                  {/* ---------- Submit Button ---------- */}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="skeu-btn group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[13px] font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 md:text-sm"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-[300%]"
                      />

                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="relative h-4 w-4 animate-spin" />
                          <span className="relative">{t('submitting')}</span>
                        </>
                      ) : (
                        <>
                          <span className="relative">{t('submit')}</span>
                          <Send
                            className={`relative h-3.5 w-3.5 transition-transform duration-200 ${isRTL ? 'rotate-180' : ''}`}
                            strokeWidth={2.75}
                          />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Trust Line */}
                <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border/40 pt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted md:mt-8 md:gap-x-6 md:text-[11px]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-brand-500" />
                    {t('trustLine.secure')}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-brand-500" />
                    {t('trustLine.response')}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-brand-500" />
                    {t('trustLine.noSpam')}
                  </span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Global input styling */}
      <style jsx global>{`
        .form-input {
          width: 100%;
          background-color: var(--color-background);
          border: 1px solid color-mix(in oklab, var(--color-border) 80%, transparent);
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-size: 14px;
          color: var(--color-foreground);
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .form-input::placeholder {
          color: color-mix(in oklab, var(--color-muted) 70%, transparent);
        }
        .form-input:hover {
          border-color: color-mix(in oklab, var(--color-brand-500) 30%, var(--color-border));
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-brand-500);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-brand-500) 15%, transparent);
        }
        /* Error states handled by tailwind classes now */
        .form-input.border-red-500 {
          border-color: #ef4444 !important;
        }
        .form-input.border-red-500:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
        }
        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        html[dir='rtl'] .form-input {
          text-align: right;
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   SUCCESS STATE
   ============================================================ */
function SuccessState({
  t,
  onReset,
}: {
  t: ReturnType<typeof useTranslations>;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="skeu-panel relative overflow-hidden rounded-3xl p-8 text-center md:p-12 lg:p-16"
    >
      <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1], type: 'spring', stiffness: 200 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 md:h-24 md:w-24"
          style={{ boxShadow: '0 20px 40px -12px rgba(233,122,0,0.5), 0 0 60px -12px rgba(233,122,0,0.35)' }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
            <CheckCircle2 className="h-10 w-10 text-white md:h-12 md:w-12" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-7 font-display text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl"
        >
          {t('success.title')}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-muted md:text-[15px]"
        >
          {t('success.message')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="mailto:buzzlypublicityandadvertising@gmail.com"
            className="skeu-btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-semibold md:text-sm"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={2.25} />
            {t('success.emailCta')}
          </a>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-semibold text-muted transition-colors duration-200 hover:text-brand-500 md:text-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.25} />
            {t('success.sendAnother')}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}