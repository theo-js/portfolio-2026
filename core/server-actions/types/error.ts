import z from 'zod';

export type ErrorType = 'validation' | 'server';

type ErrorResponseBase = {
  type: ErrorType;
};

export type ValidationErrorResponse<FormType extends Object> = ErrorResponseBase & {
  type: 'validation';
  errors: z.core.$ZodFlattenedError<FormType, string> | null;
};

export type ServerErrorResponse = ErrorResponseBase & {
  type: 'server';
  message: string;
};

export type ErrorResponse<FormType extends Object> =
  | ValidationErrorResponse<FormType>
  | ServerErrorResponse;
