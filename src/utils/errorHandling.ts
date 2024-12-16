export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: any): AppError => {
  console.error('Error occurred:', error);
  
  if (error instanceof AppError) {
    return error;
  }

  // Firebase auth errors
  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
        return new AppError('User not found', error.code, error);
      case 'auth/wrong-password':
        return new AppError('Invalid password', error.code, error);
      case 'auth/email-already-in-use':
        return new AppError('Email already in use', error.code, error);
      default:
        return new AppError('An error occurred', error.code, error);
    }
  }

  return new AppError('An unexpected error occurred', undefined, error);
};