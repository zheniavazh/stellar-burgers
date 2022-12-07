export const getStatus = (status: string) => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    case 'done':
      return 'Выполнен';
    case 'cancelled':
      return 'Отменён';
    default:
      break;
  }
};
