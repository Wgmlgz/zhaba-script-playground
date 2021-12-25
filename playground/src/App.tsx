import * as React from "react";
import "./styles.css";
import {
  Grid,
  AppBar,
  Typography,
  Button,
  CssBaseline,
  Toolbar,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  fibonacci,
  hello_world,
  pointer_arithmetic,
  vector,
  for_loop,
} from "./examples";

import { styled } from "@mui/material/styles";

import { zh_run_main, zh_get_output, zh_set_main, zh_init, is_init } from "./zhaba/zhaba";
let examples = new Map<string, string>(
[
  ["fibonacci", fibonacci],
  ["hello world", hello_world],
  ["pointer arithmetic", pointer_arithmetic],
  ["vector", vector],
  ["for loop", for_loop],
]
);
let program = hello_world;

const Root = styled("div")(({ theme }) => ({
  paddingTop: "50px",
  [theme.breakpoints.up("md")]: {
    height: "30vh",
  },
  [theme.breakpoints.up("lg")]: {
    height: "100%",
  },
}));

export default function App() {
  const editorRef: any = useRef(null);

  function handleEditorDidMount(_: any, editor: any) {
    editorRef.current = editor;
    console.log(editor);
  }


  const [example, setExample] = React.useState("");
  const [output, setOutput] = React.useState("there is lonely here (");

  const handleChange = (event: { target: { value: string }; }) => {
    setExample(event.target.value);
    let t = examples.get(event.target.value);
    if (t !== undefined) program = t;
  };

  function run() {
    (async () => {
      zh_init();
      while (!is_init) await new Promise((resolve) => setTimeout(resolve, 100));
      if (editorRef.current !== null) {
        // tsignore
        zh_set_main(editorRef.current.getValue());
        zh_run_main();
        setOutput(zh_get_output());
        console.log(output);
      }
    })();
  }

  // window.editor.getModel().onDidChangeContent((event) => {
  //   console.log("edit");
  //   // render();
  // });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            color="white"
            component="div"
            fontWeight="bold"
            style={{ margin: "10px" }}
          >
            Zhaba-script
          </Typography>
          <Typography
            variant="h6"
            color="white"
            component="div"
            fontWeight="bold"
            style={{ margin: "10px" }}
          >
            by wgmlgz
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
          >
            <Typography
              variant="h5"
              color="white"
              fontWeight="bold"
              onClick={() =>
                window.open("https://github.com/Wgmlgz/Zhaba-script", "_blank")
              }
            >
              github
            </Typography>
          </Button>

          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
          >
            <Typography
              variant="h5"
              color="white"
              fontWeight="bold"
              onClick={() =>
                window.open(
                  "https://github.com/Wgmlgz/Zhaba-script/tree/main/docs",
                  "_blank"
                )
              }
            >
              docs
            </Typography>
          </Button>
          <FormControl style={{ width: "200px" }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: "white" }}
            >
              Select example
            </InputLabel>
            <Select
              color="primary"
              id="demo-simple-select"
              value={example}
              onChange={handleChange}
              label="Select example"
            >
              {Array.from(examples.keys())}
              {Array.from(examples.keys()).map((key) => (
                <MenuItem value={key}>{key}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Grid container style={{ height: "90vh" }}>
        <Grid item md={12} lg={5}>
          <Root>
            <Editor
              editorDidMount={handleEditorDidMount}
              value={program}
              language="zh"
              options={{
                fontFamily: "JetBrains Mono",
                fontSize: 20,
                contextmenu: true,
                cursorSmoothCaretAnimation: true,
                cursorBlinking: "phase",
                minimap: {
                  enabled: false,
                },
              }}
              theme={"one-dark-pro"}
            />
          </Root>
        </Grid>
        <Grid
          item
          lg={2}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" size="large">
            <Typography
              align="center"
              color="white"
              variant="h4"
              fontWeight="bold"
              onClick={() => run()}
            >
              run
              <br />
              <ArrowForwardIosIcon />
            </Typography>
          </Button>
          {/* <img src={frog} style={{ width: "100%" }}></img> */}
        </Grid>
        <Grid
          item
          lg={5}
          md={12}
          style={{
            padding: "50px",
            height: "100%",
          }}
        >
          {" "}
          <Root>
            <Grid container spacing={3} style={{ height: "100%" }}>
              <Grid item xs={12}>
                <Typography
                  fontFamily="JetBrains Mono"
                  color="primary"
                  fontSize="30pt"
                >
                  Program output:
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ height: "60%" }}>
                <p
                  style={{
                    fontFamily: "JetBrains Mono",
                    whiteSpace: "pre-line",
                    overflowY: "scroll",
                    height: "100%",
                  }}
                  contentEditable="true"
                >
                  {output}
                </p>
              </Grid>
              <Grid item xs={12} style={{ height: "40%" }}>
                <TextField
                  style={{ width: "100%" }}
                  label="Your input"
                  multiline
                  onSubmit={() => {
                    console.log("aboba");
                  }}
                  variant="standard"
                  spellCheck="false"
                />
              </Grid>
            </Grid>
          </Root>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
