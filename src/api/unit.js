import axiosAPI from ".";

export const getUnitList = () => {
  return axiosAPI.get(`/Units`).catch(function (error) {
    console.log(error.toJSON());
  });
};