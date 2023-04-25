export default (inputToken) => {
  const decoded = parseJwt(inputToken);
  const token = getToken();

  function parseJwt(inputToken) {
    if (!inputToken) return "";
    document.cookie = `token=${inputToken};`;
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
      .find((i) => i.trim().includes("token"))
      ?.split("token=")?.[1];

    return foundToken;
  }

  return {
    decoded,
    token,
    parseJwt,
  };
};
