export const deviceHolderMessages = {
  ru: {
    device: 'Выбранное устройство должно быть валидным UUID',
  },
  en: {
    device: 'Chosen device should be a valid UUID',
  },
};

export const servicesMessages = {
  ru: {
    takeDevice: 'Вы взяли это устройство из места хранения',
    unableToReturnYourself: 'Нельзя вернуть устройство самому себе',
    notFoundDevice: (device: any) => `Устройство с id ${device} не найдено`,
  },
  en: {
    takeDevice: 'You have taken the device from its place',
    unableToReturnYourself: 'Unable to return device yourself',
    notFoundDevice: (device: any) => `Device with id ${device} not found`,
  },
};
