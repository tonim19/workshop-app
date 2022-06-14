export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const numberWithCommas = (price: any) => {
  if (isNaN(price)) return;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ",00";
};

export const formatDate = (unformattedDate: string) => {
  const fullDate = new Date(unformattedDate);
  const date = fullDate.toLocaleDateString("hr").replaceAll(" ", "");
  const time =
    fullDate.toLocaleTimeString("hr", {
      hour: "2-digit",
      minute: "2-digit",
    }) + "h";
  return { date, time };
};
