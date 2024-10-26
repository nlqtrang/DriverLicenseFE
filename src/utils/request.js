import { notification } from "antd";
export const handleResponse = (data) => {
  if (data.resultCode === -1) {
    notification.error({
      message: data.message,
    });
  } else
    data.message &&
      notification.success({
        message: data.message,
      });
};
