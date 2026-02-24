import type { ErrorResponse } from './error';

export type ActionResponse<FormType extends Object> = {
  success: boolean;
  error?: ErrorResponse<FormType>;
  submittedValues: FormType | null;
};

export const getInitialActionState = <FormType extends Object>(): ActionResponse<FormType> => ({
  success: false,
  submittedValues: null,
});
