export const FormatDate = (date: string) => {
  const newDate = new Date(date);
  const response = `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
  return response;
};
