import * as React from "react";
import { render } from "react-dom";
import { rewireEditor } from "./MonacoEditor/config";

import App from "./App";

rewireEditor().then(() => {
  const rootElement = document.getElementById("root");
  render(<App />, rootElement);
});
