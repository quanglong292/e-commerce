import { notification } from "antd";

export default (error) => {
  notification.error({
    key: 1,
    message: error.message,
    placement: "bottomLeft",
  });
};
