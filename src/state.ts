import { proxy } from "valtio";

export const personStore = proxy({
  name: "",
  height: "",
  gender: "",
  homeworld: ""
});
