import { Container } from "inversify";
import { TYPES } from "./types";
import App from "./app";
import { appBindings } from "./di";

const bootstrap = () => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();