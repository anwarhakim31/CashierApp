const numberFormat = (number) => {
  const formatIndonesia = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  return formatIndonesia;
};

export default numberFormat;
