export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_LOGIN_CREDENTIALS':
      return 'Email or password incorrect';
    case 'EMAIL_EXISTS':
      return 'User with this email already exists';
    case 'EMAIL_NOT_FOUND':
      return 'Пользователя с таким Email не существует';
    default:
      return 'Слишком много попыток входа. Попробуйте позднее';
  }
}
