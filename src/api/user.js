import axiosAPI from ".";

export const getUserList = () => {
  return axiosAPI.get(`/user`);
};
export const createUserApi = (user) => {
  return axiosAPI.post(`/user`,user);
};
