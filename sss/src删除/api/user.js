import request from "@/utils/request";

/**
 *  获取验证码
 * @param {Number} clientToken 随机数
 * @returns primise
 */
export const getFileUpload = (clientToken) => {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
    method: "GET",
    responseType: "arraybuffer",
  });
};

export const userLogin = (data) => {
  return request({
    url: "/user-service/user/login",
    method: "POST",
    data,
  });
};
