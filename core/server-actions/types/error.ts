import type z from 'zod';

export type ErrorType = 'validation' | 'server';

type ErrorResponseBase = {
  type: ErrorType;
};

export type ValidationErrorResponse<FormType extends object> = ErrorResponseBase & {
  type: 'validation';
  errors: z.core.$ZodFlattenedError<FormType, string> | null;
};

export type ServerErrorResponse = ErrorResponseBase & {
  type: 'server';
  message: string;
};

export type ErrorResponse<FormType extends object> =
  | ValidationErrorResponse<FormType>
  | ServerErrorResponse;
