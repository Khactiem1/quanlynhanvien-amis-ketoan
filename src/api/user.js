import axiosAPI from ".";

export const getUserList = () => {
  return axiosAPI.get(`/user`);
};
export const createUserApi = (user) => {
  return axiosAPI.post(`/user`,user);
};
export const getUserApi = (id) => {
  return axiosAPI.get(`/user/${id}`);
};
export const editUserApi = (user) => {
  return axiosAPI.put(`/user/${user.id}`,user);
};
