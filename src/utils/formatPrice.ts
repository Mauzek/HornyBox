export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
