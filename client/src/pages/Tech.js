import "./Tech.css";
import Navbar from "../components/Navbar";
import { useFetch } from "../hooks/useFetch";
import { useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";

export default function Tech() {
  const { data, isPending, error } = useFetch("/api/technology");
  const { windowSize } = useWindowSize();
  const [num, setNum] = useState(0);
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    if (windowSize.innerWidth >= 1200) {
      setOrientation("portrait");
    } else {
      setOrientation("landscape");
    }
  }, [windowSize]);

  function updateTech(num) {
    setNum(num);
  }

  return (
    <div className="tech">
      <Navbar />
      {isPending && <p className="error">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <>
          <div className="wrapper">
            <h5 className="tech-title">
              <span>03</span>SPACE LAUNCH 101
            </h5>
            <img
              className="tech-img"
              src={`.${data[num].images[orientation]}`}
              alt="space tech"
            />
            <div className="btn-box">
              <button
                aria-label="Launch vehicle tab"
                onClick={() => updateTech(0)}
                className={num === 0 ? "active" : ""}
              >
                1
              </button>
              <button
                aria-label="Spaceport tab"
                onClick={() => updateTech(1)}
                className={num === 1 ? "active" : ""}
              >
                2
              </button>
              <button
                aria-label="Space capsule tab"
                onClick={() => updateTech(2)}
                className={num === 2 ? "active" : ""}
              >
                3
              </button>
            </div>
            <div className="tech-text-box">
              <h6 className="tech-term">THE TERMINOLOGY...</h6>
              <h3 className="tech-name">{data[num].name}</h3>
              <p className="tech-desc">{data[num].description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
