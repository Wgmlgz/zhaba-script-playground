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
} from "@mui/material";
import Editor from "@monaco-editor/react";

import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import fibonacci from "./Examples/fibonacci.js";
import hello_world from "./Examples/hello_world.js";
import pointer_arithmetic from "./Examples/pointer_arithmetic.js";
import vector from "./Examples/vector.js";

import { hi } from "./zhaba/zhaba.js";
let programs = {
  fibonacci: fibonacci,
  hello_world: hello_world,
  pointer_arithmetic: pointer_arithmetic,
  vector: vector,
};
let program = programs.hello_world;

export default function App() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    program = programs[event.target.value];
  };
  setInterval(() => {
    console.log("da");
    hi();
  }, [50]);

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
            🐸 Zhaba-script by wgmlgz
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
              <MenuItem value={"pointer_arithmetic"}>
                pointer arithmetic
              </MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Grid container style={{ height: "90vh" }}>
        <Grid item xs={6}>
          <div style={{ padding: "50px", height: "100%" }}>
            <Editor
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
          </div>
        </Grid>
        <Grid
          item
          xs={1}
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
          xs={5}
          style={{
            padding: "50px",
            height: "100%",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                fontFamily="JetBrains Mono"
                color="primary"
                fontSize="30pt"
              >
                Program output:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontFamily="JetBrains Mono">
                there is lonely here (
              </Typography>
            </Grid>
            {/* <Grid item style={{ display: "flex", alignItems: "center" }}></Grid>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Your input"
                multiline
                fullWidth
                variant="filled"
              spellcheck="false"
              />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
