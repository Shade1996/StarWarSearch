import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import Display from "./Display";
import { personStore } from "../state";

type Props = {
  searchName: string;
};

const StarWarsSearch: React.FC<Props> = ({ searchName }) => {
  useSnapshot(personStore);

  const [exist, setExist] = useState<"loading" | "yes" | "no">("loading");

  useEffect(() => {
    setExist("loading");
    document.title = searchName;

    (async () => {
      let { data } = await axios.get(
        "https://swapi.dev/api/people/?search=" + searchName
      );
      console.log(data);
      if (data.count === 0) {
        setExist("no");
      } else {
        setExist("yes");
        personStore.name = data.results[0].name;
        personStore.gender = data.results[0].gender;
        personStore.height = data.results[0].height;
        personStore.homeworld = data.results[0].homeworld;
      }
    })();
  }, [searchName]);

  if (exist === "loading") return <div>loading</div>;
  if (exist === "no") return <div>not found</div>;

  return <Display personName={searchName} />;
};

export default StarWarsSearch;
