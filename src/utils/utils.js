export const percentDifference = (a, b) => {
  return +((100 * Math.abs(a - b)) / ((a + b) / 2)).toFixed(2);
};

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.substr(1);

export function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : data;
}
