import { useEffect, useState } from "react";
import Routes from "../Routes";
import { UserIdContext } from "../Components/Context/app_context";
import { getSessionUser } from "../Components/Providers/providers";

export const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const sessionToken = getSessionUser();

    const fetchToken = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionToken,
        },
      };

      await fetch("http://localhost:4500/api/jwt", requestOptions)
        .then((res) => res.json())
        .then((resId) => setUserId(resId))
        .catch((error) => console.log(error));
    };

    if (sessionToken) {
      fetchToken();
    }
  }, []);

  return (
    <UserIdContext.Provider value={userId}>
      <Routes />
    </UserIdContext.Provider>
  );
};
