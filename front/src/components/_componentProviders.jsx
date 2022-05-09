export const addSessionUser = async (item) => {
  let user = JSON.parse(sessionStorage.getItem("hauler_user"));

  if (user) {
    sessionStorage.clear("hauler_user");
    sessionStorage.setItem("hauler_user", JSON.stringify(item));
  } else {
    sessionStorage.setItem("hauler_user", JSON.stringify(item));
  }
};

export const getSessionUser = () => {
  const user = JSON.parse(sessionStorage.getItem("hauler_user"));
  const token = user.token;
  return token;
};
