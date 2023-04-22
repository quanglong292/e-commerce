export default (obj) => {
  const clone = JSON.parse(JSON.stringify(obj));

  // Recursive logic
  const find = (path = [], objToFind = clone) => {
    if (typeof objToFind === "object")
      return find(
        [...path, Object.keys(objToFind)[0]],
        objToFind[Object.keys(objToFind)[0]]
      );

    return path;
  };

  return find([], clone).join(".");
};
