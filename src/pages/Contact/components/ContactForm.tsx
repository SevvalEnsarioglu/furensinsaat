import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../../hooks/useLanguage';
import { submitContactForm, type ContactFormData } from '../../../services/contact';
import { cn } from '../../../utils/cn';
import { ArrowRight, Loader2, Check } from 'lucide-react';

export default function ContactForm() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Animate rows on mount
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const rows = gsap.utils.toArray<HTMLElement>('.form-row');

      if (prefersReducedMotion) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(rows, { opacity: 0, y: 20 });
      gsap.to(rows, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: formRef }
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    const { form } = t.pages.contact;

    if (!formData.fullName.trim()) {
      newErrors.fullName = form.errors.required;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = form.errors.shortName;
    }

    if (!formData.email.trim()) {
      newErrors.email = form.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = form.errors.invalidEmail;
    }

    if (!formData.subject) {
      newErrors.subject = form.errors.required;
    }

    if (!formData.message.trim()) {
      newErrors.message = form.errors.required;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = form.errors.shortMessage;
    }

    if (!formData.consent) {
      newErrors.consent = form.errors.consentRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    
    try {
      await submitContactForm(formData);
      setIsSuccess(true);
      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false,
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to submit form', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputStyles =
    "w-full bg-[var(--surface-secondary)] border outline-none rounded-lg transition-all duration-300 px-4 py-3 text-sm focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)]";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex h-full w-full flex-col gap-4">
      {/* Name & Email Row */}
      <div className="form-row grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col group relative gap-1.5">
          <label htmlFor="fullName" className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
            {t.pages.contact.form.fullNameLabel}
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder={t.pages.contact.form.fullNamePlaceholder}
            value={formData.fullName}
            onChange={handleChange}
            className={inputStyles}
            style={{ borderColor: errors.fullName ? '#ef4444' : 'var(--border)', color: 'var(--foreground)' }}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && <span id="fullName-error" className="absolute -bottom-4 left-0 text-[10px] text-red-500">{errors.fullName}</span>}
        </div>

        <div className="flex flex-col group relative gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
            {t.pages.contact.form.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={t.pages.contact.form.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            className={inputStyles}
            style={{ borderColor: errors.email ? '#ef4444' : 'var(--border)', color: 'var(--foreground)' }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <span id="email-error" className="absolute -bottom-4 left-0 text-[10px] text-red-500">{errors.email}</span>}
        </div>
      </div>

      {/* Phone & Subject Row */}
      <div className="form-row grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col group relative gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
            {t.pages.contact.form.phoneLabel}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t.pages.contact.form.phonePlaceholder}
            value={formData.phone}
            onChange={handleChange}
            className={inputStyles}
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          />
        </div>

        <div className="flex flex-col group relative gap-1.5">
          <label htmlFor="subject" className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
            {t.pages.contact.form.subjectLabel}
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={cn(inputStyles, "appearance-none")}
            style={{ borderColor: errors.subject ? '#ef4444' : 'var(--border)', color: formData.subject ? 'var(--foreground)' : 'var(--muted)' }}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          >
            <option value="" disabled hidden>{t.pages.contact.form.subjectPlaceholder}</option>
            {Object.entries(t.pages.contact.form.subjects).map(([key, value]) => (
              <option key={key} value={value} style={{ color: 'var(--background)', backgroundColor: 'var(--foreground)' }}>
                {value}
              </option>
            ))}
          </select>
          {errors.subject && <span id="subject-error" className="absolute -bottom-4 left-0 text-[10px] text-red-500">{errors.subject}</span>}
        </div>
      </div>

      {/* Message Row */}
      <div className="form-row flex flex-1 flex-col group relative gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
          {t.pages.contact.form.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={t.pages.contact.form.messagePlaceholder}
          value={formData.message}
          onChange={handleChange}
          className={cn(inputStyles, "h-full min-h-[120px] resize-none")}
          style={{ borderColor: errors.message ? '#ef4444' : 'var(--border)', color: 'var(--foreground)' }}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <span id="message-error" className="absolute -bottom-4 left-0 text-[10px] text-red-500">{errors.message}</span>}
      </div>

      {/* Consent Row */}
      <div className="form-row flex flex-col mt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="peer h-4 w-4 appearance-none rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] cursor-pointer"
              style={{ borderColor: errors.consent ? '#ef4444' : 'var(--border)', backgroundColor: formData.consent ? 'var(--primary)' : 'transparent' }}
            />
            <Check 
              className={cn(
                "absolute h-3 w-3 pointer-events-none transition-opacity", 
                formData.consent ? "opacity-100" : "opacity-0"
              )} 
              style={{ color: 'var(--background)' }}
            />
          </div>
          <span className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t.pages.contact.form.consent}
          </span>
        </label>
        {errors.consent && <span className="mt-1 text-[10px] text-red-500">{errors.consent}</span>}
      </div>

      {/* Submit Button Row */}
      <div className="form-row mt-auto flex flex-col pt-2">
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all"
          style={{
            backgroundColor: isSuccess ? 'var(--foreground)' : 'var(--primary)',
            color: 'var(--background)',
          }}
        >
          {/* Hover overlay effect */}
          {!isSuccess && (
            <span 
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
              style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            />
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.pages.contact.form.sending}
              </>
            ) : isSuccess ? (
              <>
                <Check className="h-4 w-4" />
                {t.pages.contact.form.success}
              </>
            ) : (
              <>
                {t.pages.contact.form.submit}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
