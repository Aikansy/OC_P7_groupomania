import { Sign } from "../Components/Sign";
import { Profile } from "../Components/Profile";
import { UserIdContext } from "../Components/Context/app_context";
import { useContext } from "react";

export const ProfilePage = () => {
  const userId = useContext(UserIdContext);

  return (
    <section className="profileSection">
      {userId ? <Profile /> : <Sign signin={false} signup={true} />}
    </section>
  );
};
