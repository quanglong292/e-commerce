// import { notification } from "antd";

const TOKEN_NAME = "mikeToken";

export const checkAccountPermission = (
  checkToken,
  handleLogout,
  { navigate, pathname, notification }
) => {
  if (["/", "/sale", "/product"].includes(pathname)) {
    const permission = checkToken()?.["0"]?.permission;
    if (!permission || permission !== "admin") {
      notification.warning({
        message: "You don't have admin permission!",
        placement: "bottomLeft",
      });
      handleLogout();
      setTimeout(() => {
        navigate("/auth/admin");
      }, 500);
    }
  }
};

export default (inputToken) => {
  const decoded = parseJwt(inputToken);
  const token = getToken();

  function parseJwt(inputToken) {
    if (!inputToken) return "";
    document.cookie = `${TOKEN_NAME}=${inputToken};`;
    const base64Url = inputToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  function getToken() {
    const split = decodeURIComponent(document.cookie).split(";");
    let foundToken = split
      .find((i) => i.trim().includes(TOKEN_NAME))
      ?.split(TOKEN_NAME + "=")?.[1];

    return foundToken;
  }

  function logout() {
    document.cookie = `${TOKEN_NAME}=;`;
    // location.reload();
  }

  return {
    decoded,
    token,
    parseJwt,
    logout,
    getToken,
  };
};
