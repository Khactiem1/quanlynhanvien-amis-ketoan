import axiosAPI from ".";

export const getUserList = (filter) => {
  return axiosAPI.get(`/Employees/fitter?offset=${filter.offset}&limit=${filter.limit}&keyword=${filter.keyword}`).catch(function (error) {
    console.log(error.response.data);
  });
};
export const createUserApi = (user) => {
  return axiosAPI.post(`/Employees`, user).catch(function (error) {
    console.log(error.response.data);
  });
};
export const getUserApi = (id) => {
  return axiosAPI.get(`/Employees/${id}`).catch(function (error) {
    console.log(error.response.data);
  });
};
export const editUserApi = (user) => {
  return axiosAPI.put(`/Employees/${user.employeeID}`, user).catch(function (error) {
    console.log(error.response.data);
  });
};
export const deleteUserApi = (id) => {
  return axiosAPI.delete(`/Employees/${id}`).catch(function (error) {
    console.log(error.response.data);
  });
};
export const nextValue = () => {
  return axiosAPI.get(`/Employees/next_value`).catch(function (error) {
    console.log(error.response.data);
  });
};
