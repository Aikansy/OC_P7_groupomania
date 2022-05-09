import React from "react";
import { Sign } from "../Components/Sign";

export const SignPage = () => {
  return (
    <section className="signSection">
      <Sign signin={false} signup={true} />
    </section>
  );
};
