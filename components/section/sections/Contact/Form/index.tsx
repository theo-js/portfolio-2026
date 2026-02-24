'use client';

import { useTranslations } from 'next-intl';
import { type FC, useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldSet } from '@/components/ui/field';
import { useFormStatus } from 'react-dom';
import { SendIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedGlow } from '../AnimatedGlow';
import { ANIMATED_GLOW_DURATION } from '../constants';
import { getInitialActionState } from '@/core/server-actions//types/response';
import { type ContactFormData, sendContactEmail } from './action';

const INITIAL_ACTION_STATE = getInitialActionState<ContactFormData>();

interface ContactFormProps {
  revealInnerElementsDelay: number;
  animatedGlowDelay: number;
}
export const ContactForm: FC<ContactFormProps> = (props) => {
  const t = useTranslations('sections.contact.form');
  const [state, formAction] = useActionState(sendContactEmail, INITIAL_ACTION_STATE);

  useEffect(() => {
    // Handle success
    if (!state.success) return;
    toast.success(t('success.title'), {
      description: t('success.description'),
      duration: 7000,
    });
  }, [state]);

  return (
    <form
      action={formAction}
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <ContactFormContent state={state} {...props} />
    </form>
  );
};

const ContactFormContent: FC<ContactFormProps & { state: typeof INITIAL_ACTION_STATE }> = ({
  state,
  animatedGlowDelay,
  revealInnerElementsDelay,
}) => {
  const t = useTranslations('sections.contact.form');
  const { pending } = useFormStatus();
  const fieldErrors = state?.error?.type === 'validation' ? state.error.errors?.fieldErrors : null;

  return (
    <>
      <AnimatedGlow delay={animatedGlowDelay} duration={ANIMATED_GLOW_DURATION} ease="power3.out" />

      <FieldSet
        options={{ delay: revealInnerElementsDelay }}
        className={cn(pending && 'pointer-events-none animate-pulse')}
      >
        <Field>
          <FieldLabel htmlFor="visitor-name">{t('name.label')}</FieldLabel>
          <Input
            type="text"
            id="visitor-name"
            name="name"
            required
            placeholder={t('name.placeholder')}
            defaultValue={!state.success ? state.submittedValues?.name : undefined}
          />
          {fieldErrors?.name && <p className="text-red-500">{fieldErrors.name}</p>}
        </Field>

        <Field>
          <FieldLabel htmlFor="visitor-email">{t('email.label')}</FieldLabel>
          <Input
            type="email"
            id="visitor-email"
            name="email"
            required
            placeholder={t('email.placeholder')}
            defaultValue={!state.success ? state.submittedValues?.email : undefined}
          />
          {fieldErrors?.email && <p className="text-red-500">{fieldErrors.email}</p>}
        </Field>

        <Field>
          <FieldLabel htmlFor="visitor-message">{t('message.label')}</FieldLabel>
          <Textarea
            id="visitor-message"
            name="message"
            required
            rows={5}
            placeholder={t('message.placeholder')}
            defaultValue={!state.success ? state.submittedValues?.message : undefined}
          />
          {fieldErrors?.message && <p className="text-red-500">{fieldErrors.message}</p>}
        </Field>

        {state?.error?.type === 'server' && (
          <p className="text-red-500">{`Error: ${state.error.message}`}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="from-secondary to-tertiary absolute inset-0 block bg-gradient-to-r" />

          <span className="relative z-10 flex items-center justify-center gap-2">
            {pending ? (
              <>
                <Spinner />
                {t('submit.pending')}
              </>
            ) : (
              <>
                <SendIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                {t('submit.label')}
              </>
            )}
          </span>
        </button>
      </FieldSet>
    </>
  );
};
