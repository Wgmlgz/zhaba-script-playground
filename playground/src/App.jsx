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
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import fibonacci from "./Examples/fibonacci.js";
import hello_world from "./Examples/hello_world.js";
import pointer_arithmetic from "./Examples/pointer_arithmetic.js";
import vector from "./Examples/vector.js";
import for_ from "./Examples/for_.js";
import { styled } from "@mui/material/styles";
import { red, green, blue } from "@mui/material/colors";

import { zh_run_main, zh_get_output, zh_set_main, zh_init, is_init } from "./zhaba/zhaba.js";
let programs = {
  fibonacci: fibonacci,
  hello_world: hello_world,
  pointer_arithmetic: pointer_arithmetic,
  vector: vector,
  for_: for_,
};
let program = programs.hello_world;

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
  const editorRef = useRef(null);

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
    console.log(editor);
  }


  const [age, setAge] = React.useState("");
  const [output, setOutput] = React.useState("there is lonely here (");

  const handleChange = (event) => {
    setAge(event.target.value);
    program = programs[event.target.value];
  };

  function run() {
    (async () => {
      zh_init();
      while (!is_init) await new Promise((resolve) => setTimeout(resolve, 100));
        zh_set_main(editorRef.current.getValue());
        zh_run_main();
        setOutput(zh_get_output());
        console.log(output);
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
            by wgmlgz🐸
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
              value={age}
              onChange={handleChange}
              label="Select example"
            >
              <MenuItem value={"hello_world"}>hello world</MenuItem>
              <MenuItem value={"fibonacci"}>fibonacci</MenuItem>
              <MenuItem value={"vector"}>vector</MenuItem>
              <MenuItem value={"for_"}>for</MenuItem>
              <MenuItem value={"pointer_arithmetic"}>
                pointer arithmetic
              </MenuItem>
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
                  contenteditable="true"
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
                  spellcheck="false"
                />
              </Grid>
            </Grid>
          </Root>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
