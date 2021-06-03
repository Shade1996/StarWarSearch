import axios from "axios";
import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { personStore } from "../state";

type Props = { personName?: string };

const Display: React.FC<Props> = ({ personName }) => {
  useSnapshot(personStore);
  const [show, setshow] = useState(false);
  const [homeworldName, sethomeworldName] = useState("");
  const [homeworldPop, sethomeworldPop] = useState("");

  const { homeworld } = personStore;
  const showInfo = useCallback(async () => {
    let testurl = homeworld;
    if (testurl.startsWith("http://"))
      testurl = testurl.replace("http", "https");
    console.log(testurl);
    let { data } = await axios.get(testurl);
    sethomeworldName(data.name);
    sethomeworldPop(data.population);
    document.title = personName + " " + data.name;
    console.log(personName);
    setshow(true);
  }, [personName, homeworld]);
  return (
    <div>
      {personStore.name}
      <br />
      {personStore.gender}
      <br />
      {personStore.height}
      <br />
      <button onClick={showInfo}>show my homeworld</button>
      {show && (
        <div>
          {homeworldName} <br /> {homeworldPop}
        </div>
      )}
    </div>
  );
};

export default Display;
