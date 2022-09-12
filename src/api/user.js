import axiosAPI from ".";

export const getUserList = () => {
  return axiosAPI.get(`/user`);
};
