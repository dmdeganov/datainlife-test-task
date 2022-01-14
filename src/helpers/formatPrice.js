export const formatPrice = (number) =>
  new Intl.NumberFormat("ru-TU", {
    style: "currency",
    currency: "RUB",
  }).format(+number.toFixed(2));
