import { Posts } from "../Components/Home";

export const HomePage = () => {
  return (
    <section className="homeSection">
      <Posts fresh={true} trending={false} />
    </section>
  );
};
