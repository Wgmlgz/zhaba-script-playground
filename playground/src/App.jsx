import * as React from "react";
import "./styles.css";
import CodeEditor from "./MonacoEditor";

export default function App() {
  return (
    <div className="App">
      <h1>Aboba ide</h1>
      <CodeEditor />
    </div>
  );
}
