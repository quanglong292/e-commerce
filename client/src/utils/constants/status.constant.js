export const ORDER_STATUS = {
  order_shipped: {
    text: "Đã giao",
    color: "green",
  },
  ready_to_pick: {
    text: "Chưa in vận đơn",
    color: "#82807f",
  },
  pending: {
    text: "Pending",
    color: "#82807f",
  },
  cancel: {
    text: "Hủy",
    color: "red",
  },
  picking: {
    text: "Đang lấy hàng",
    color: "orange",
  },
  shipping: {
    text: "Đang giao",
    color: "orange",
  },
  picked: {
    text: "Lấy hàng thành công",
    color: "orange",
  },
  transporting: {
    text: "Đang trung chuyển",
    color: "orange",
  },
  delivering: {
    text: "Đang giao hàng",
    color: "#82807f",
  },
  delivered: {
    text: "Giao hàng thành công",
    color: "#31e83a",
  },
  delivery_fail: {
    text: "Giao hàng không thành công",
    color: "#f70763",
  },
  finish: {
    text: "Hoàn tất",
    color: "#31e83a",
  },
};

export const UNAVAILABLE_ORDER_STATUS = ["order_shipped", "cancel", "shipping"];
