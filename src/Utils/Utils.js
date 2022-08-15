export const getPageData = (value) => {
  if (!value || value < 1) {
    value = 1;
  }
  return value;
};

export const getSortData = (value) => {
  const arr = ["ASC", "DESC", "asc", "desc"].includes(value) ? value : "ASC";

  return arr;
};
