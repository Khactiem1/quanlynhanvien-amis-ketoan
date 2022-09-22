import axiosAPI from ".";

export const getUserList = () => {
  return axiosAPI.get(`/user`).catch(function (error) {
    console.log(error.toJSON());
  });
};
export const createUserApi = (user) => {
  return axiosAPI.post(`/user`, user).catch(function (error) {
    console.log(error.toJSON());
  });
};
export const getUserApi = (id) => {
  return axiosAPI.get(`/user/${id}`).catch(function (error) {
    console.log(error.toJSON());
  });
};
export const editUserApi = (user) => {
  return axiosAPI.put(`/user/${user.id}`, user).catch(function (error) {
    console.log(error.toJSON());
  });
};
export const deleteUserApi = (id) => {
  return axiosAPI.delete(`/user/${id}`).catch(function (error) {
    console.log(error.toJSON());
  });
};
