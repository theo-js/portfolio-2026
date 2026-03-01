import type { ErrorResponse } from './error';

export type ActionResponse<FormType extends object> = {
  success: boolean;
  error?: ErrorResponse<FormType>;
  submittedValues: FormType | null;
};

export const getInitialActionState = <FormType extends object>(): ActionResponse<FormType> => ({
  success: false,
  submittedValues: null,
});
