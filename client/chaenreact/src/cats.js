import { React, useEffect, useState } from "react";

function Cats({ tasks, setTasks }) {
  const [bool, setBool] = useState(true);
  const imagePath = bool ? "mononoke1.jpg" : "mononoke2.jpg";

  useEffect(() => {
    const interval = setInterval(() => {
      setBool((prevBool) => !prevBool);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>Cats 시작 후</p>
      <img src={imagePath} style={{ width: "100px", height: "auto" }}></img>
    </div>
  );
}

export default Cats;
