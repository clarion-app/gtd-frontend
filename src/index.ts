import { BackendType } from "@clarion-app/types";
import { gtdApi as gtdFrontendApi } from "./gtdApi";
import Actions from "./Actions";
import Action from "./Action";
import Projects from "./Projects";
import Project from "./Project";
import Contexts from "./Contexts";
import Context from "./Context";

export const backend: BackendType = { url: "http://localhost:8000", token: "", user: { id: "", name: "", email: "" } };

export const updateFrontend = (config: BackendType) => {
  backend.url = config.url;
  backend.token = config.token;
  backend.user = config.user;
};

export {
  gtdFrontendApi,
  Actions,
  Action,
  Projects,
  Project,
  Contexts,
  Context,
};