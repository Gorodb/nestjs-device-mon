export const createUserMessages = {
  ru: {
    role: 'Значение должно быть одним из',
    description: 'Описание заполнено некорректно',
    phone: 'Телефон должен содержать от 6 до 15 символов',
    name: 'Ошибка при сохранении имени',
    location: 'Ошибка при сохранении местоположения',
    logo: 'Логотип должен быть валидным json-ом',
    email: 'Введите валидный email',
    password: 'Пароль должен содержать больше 6 символов',
    department: 'Id отдела должен быть UID',
  },
  en: {
    role: 'Value should be one of',
    description: 'Description should be a string',
    phone: 'Phone number should be between 6 and 15 symbols length',
    name: 'Name should be a string',
    location: 'Location should be a string',
    logo: 'Logo should be a valid JSON object',
    email: 'Please fill correct email address',
    password: 'Password should contains more then 6 symbols',
    department: 'Id should be valid UID',
  },
};

export const pinCodesMessages = {
  ru: {
    isNumber: 'Код должен быть числом',
    isSixSymbolsLength: 'Код должен быть шестизначным',
    action: 'Значение должно быть одним из',
  },
  en: {
    isNumber: 'Code should be a number',
    isSixSymbolsLength: 'Code should be six symbols length',
    action: 'Value should be one of',
  },
};

export const serviceMessages = {
  ru: {
    authRequired: 'Необходима авторизация',
    unableToReg:
      'Не удалось зарегистрировать пользователя, проверьте логин и пароль',
    unconfirmedAccount: 'Не подтвержденная учетная запись',
    wrongCredentials: 'Не верный email или пароль',
    invalidToken: 'Токен не действителен',
    invalidCode: 'Код не действителен',
    deletingImage: 'Удаляем неиспользуемое изображение',
    unableToDeleteUserById: 'Не удалось удалить пользователя с id',
    userNotFound: 'Не удалось найти пользователя по id',
  },
  en: {
    authRequired: 'Authorisation required',
    unableToReg: 'Unable to register user, check login and password',
    unconfirmedAccount: 'Unconfirmed account',
    wrongCredentials: 'Wrong email or password',
    invalidToken: 'Invalid token',
    invalidCode: 'Invalid code',
    deletingImage: 'Deleting unused images',
    unableToDeleteUserById: 'Unable to delete user with id',
    userNotFound: 'Unable to find user with id',
  },
};
