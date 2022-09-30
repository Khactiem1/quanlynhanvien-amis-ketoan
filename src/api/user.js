import axiosAPI from ".";

export const getUserList = (filter) => {
  return axiosAPI.get(`/Employees/fitter?offset=${filter.offset}&limit=${filter.limit}&keyword=${filter.keyword}`);
};
export const createUserApi = (user) => {
  return axiosAPI.post(`/Employees`, user)
};
export const getUserApi = (id) => {
  return axiosAPI.get(`/Employees/${id}`);
};
export const editUserApi = (user) => {
  return axiosAPI.put(`/Employees/${user.employeeID}`, user);
};
export const deleteUserApi = (id) => {
  return axiosAPI.delete(`/Employees/${id}`)
};
export const nextValue = () => {
  return axiosAPI.get(`/Employees/next_value`);
};
