import axiosAPI from ".";

export const getEmployeeList = (filter) => {
  return axiosAPI.get(`/Employees/fitter?offset=${filter.offset}&limit=${filter.limit}&keyword=${filter.keyword}`);
};
export const createEmployeeApi = (employee) => {
  return axiosAPI.post(`/Employees`, employee)
};
export const getEmployeeApi = (id) => {
  return axiosAPI.get(`/Employees/${id}`);
};
export const editEmployeeApi = (employee) => {
  return axiosAPI.put(`/Employees/${employee.employeeID}`, employee);
};
export const deleteEmployeeApi = (id) => {
  return axiosAPI.delete(`/Employees/${id}`)
};
export const nextValue = () => {
  return axiosAPI.get(`/Employees/next_value`);
};
export const deleteMultipleApi = (listID) => {
  return axiosAPI.post(`/Employees/bulk_delete`, listID);
};
