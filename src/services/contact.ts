export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

/**
 * Placeholder service for submitting the contact form.
 * TODO: Integrate with a real backend/API when available.
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form data submitted:', data);
      resolve({ success: true });
    }, 1200);
  });
}
