import { useState } from "react";
import { Fresh } from "./_fresh";
import { Trending } from "./_trending";

export const Posts = (props) => {
  const [freshModal, setFreshModal] = useState(props.fresh);
  const [trendingModal, setTrendingModal] = useState(props.trending);

  const handleModals = (e) => {
    if (e.target.id === "fresh") {
      setFreshModal(true);
      setTrendingModal(false);
    } else if (e.target.id === "trending") {
      setFreshModal(false);
      setTrendingModal(true);
    }
  };

  return (
    <div className="categoriesBlock">
      <div className="categoriesBlock__buttonBlock">
        <button
          onClick={handleModals}
          id="fresh"
          className={
            freshModal
              ? "categoriesBlock__button--active"
              : "categoriesBlock__button"
          }
        >
          Récent
        </button>
      </div>
      <div className="categoriesBlock__buttonBlock">
        <button
          onClick={handleModals}
          id="trending"
          className={
            trendingModal
              ? "categoriesBlock__button--active"
              : "categoriesBlock__button"
          }
        >
          Populaire
        </button>
      </div>
      <div>
        {freshModal && <Fresh />}
        {trendingModal && <Trending />}
      </div>
    </div>
  );
};
