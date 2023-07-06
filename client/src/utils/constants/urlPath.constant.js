export const REQUEST_PARAMS = {
  // Category Group
  GET_CATEGORY_GROUP: ["category/group", "GET"],
  ADD_CATEGORY_GROUP: ["category/group", "POST"],
  DELETE_CATEGORY_GROUP: ["category/group", "DELETE"],
  BULK_CATEGORY_GROUP_UPDATE: ["category/group-bulk", "POST"],

  // Category
  GET_CATEGORY: ["category/", "GET"],
  ADD_CATEGORY: ["category/", "POST"],
  DELETE_CATEGORY: ["category/", "DELETE"],

  // Brand
  GET_BRAND: ["brand/", "GET"],
  ADD_BRAND: ["brand/", "POST"],
  DELETE_BRAND: ["brand/", "DELETE"],

  // Product
  GET_PRODUCT: ["product/", "GET"],
  ADD_PRODUCT: ["product/", "POST"],
  DELETE_PRODUCT: ["product/", "DELETE"],

  // User
  GET_USER: ["user/", "GET"],
  ADD_USER: ["user/", "POST"],
  UPDATE_USER: ["user/", "PUT"],
  DELETE_USER: ["user/", "DELETE"],
  DELETE_USER_ADDRESS: ["user/address", "DELETE"],

  // Cart
  GET_CART: ["cart/", "GET"],
  ADD_CART: ["cart/", "POST"],
  DELETE_CART: ["cart/", "DELETE"],
  GET_CART_HISTORY: ["cart/history/", "GET"],
  CONFIRM_CART: ["cart/confirm", "POST"],

  // Comment
  GET_COMMENT: ["community/comment/", "GET"],
  ADD_COMMENT: ["community/comment/", "POST"],
  DELETE_COMMENT: ["community/", "DELETE"],
  // Thread comment
  GET_THREAD_COMMENT: ["community/thread/", "GET"],
  ADD_THREAD_COMMENT: ["community/thread/", "POST"],
  DELETE_THREAD_COMMENT: ["community/", "DELETE"],

  // User
  GET_SALE: ["sale/", "GET"],
  ADD_SALE: ["sale/", "POST"],
  DELETE_SALE: ["sale/", "DELETE"],

  // Setting
  GET_SETTING: ["setting/", "GET"],
  UPDATE_SETTING: ["setting/", "PUT"],
};
