import { BackendType } from "@clarion-app/types";
import { gtdApi as gtdFrontendApi } from "./gtdApi";
import Actions from "./Actions";
//import Action from "./Action";
//import Projects from "./Projects";
//import Project from "./Project";
//import Contexts from "./Contexts";
//import Context from "./Context";

export const backend: BackendType = { url: "http://localhost:8000", token: "" };

export const setFrontendToken = (token: string) => {
    backend.token = token;
};

const initializeGtdFrontend = (setBackendUrl: string) => {
    backend.url = setBackendUrl;
  };
  
  export {
    initializeGtdFrontend,
    gtdFrontendApi
  };