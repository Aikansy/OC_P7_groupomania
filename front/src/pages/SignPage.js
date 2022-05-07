import React from "react";
import Log from "../components/sign_components";

export const Sign = () => {
  return (
    <section className="signSection">
      <Log signin={false} signup={true} />
    </section>
  );
};
