'use server';

import type { ValidationErrorResponse } from '@/core/server-actions/types/error';
import type { ActionResponse } from '@/core/server-actions/types/response';
import { getTranslations } from 'next-intl/server';
import z from 'zod';
import { Resend } from 'resend';

const getLocalizedSendContactEmailRequestSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(2, t('name-min-length')),
    email: z.string().email(t('invalid-email')),
    message: z.string().min(10, t('message-min-length')).max(10000, t('message-max-length')),
  });

type ContactSchema = ReturnType<typeof getLocalizedSendContactEmailRequestSchema>;
export type ContactFormData = z.infer<ContactSchema>;

const getSendContactEmailFormFromFormData = (localizedSchema: ContactSchema) =>
  z.preprocess((data: FormData) => Object.fromEntries(data.entries()), localizedSchema);

export async function sendContactEmail(
  _prev: unknown,
  formData: FormData,
): Promise<ActionResponse<ContactFormData>> {
  const t = await getTranslations('sections.contact.form.errors');
  const schema = getLocalizedSendContactEmailRequestSchema(t);

  const contactForm = await getSendContactEmailFormFromFormData(schema).safeParse(formData);
  if (!contactForm.success) {
    // Validation failed, cannot throw error directly as it would cause an unhandled exception in the server action context
    const validationErrorResponse: ValidationErrorResponse<ContactFormData> = {
      type: 'validation',
      errors: contactForm.error.flatten() || null,
    };
    return {
      success: false,
      error: validationErrorResponse,
      submittedValues: Object.fromEntries(formData.entries()) as ContactFormData,
    };
  }

  // Use Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const res = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New contact form submission from ${contactForm.data.name}`,
      html: `<p><strong>Name:</strong> ${contactForm.data.name}</p>
             <p><strong>Email:</strong> ${contactForm.data.email}</p>
             <p><strong>Message:</strong></p>
             <p>${contactForm.data.message}</p>`,
    });
    if (res.error?.message) {
      throw new Error(res.error.message);
    }

    return {
      success: true,
      submittedValues: contactForm.data,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        type: 'server',
        message: (error as Error).message,
      },
      submittedValues: contactForm.data,
    };
  }
}
