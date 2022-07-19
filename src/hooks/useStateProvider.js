import { useContext } from "react";
import StateContext from "../context/StateProvider";

const useStateProvider = () => {
  return useContext(StateContext);
};

export default useStateProvider;
