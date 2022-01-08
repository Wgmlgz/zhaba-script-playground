import React, { useCallback, useEffect, useState } from 'react'
import './styles.css'
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
  SelectChangeEvent,
} from '@mui/material'
import Editor, { EditorDidMount } from '@monaco-editor/react'
import { useRef } from 'react'
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import examples from './examples'
import { styled } from '@mui/material/styles'

import { zh_run_main, zh_get_output, zh_set_main, zh_init } from './zhaba/zhaba'
let program = examples.get('hello world') ?? ''

const Root = styled('div')(({ theme }) => ({
  paddingTop: '50px',
  [theme.breakpoints.up('md')]: {
    height: '30vh',
  },
  [theme.breakpoints.up('lg')]: {
    height: '100%',
  },
}))

export default function App() {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: EditorDidMount = useCallback((_, editor) => {
    editorRef.current = editor
  }, [])

  const inputRef = useRef<HTMLDivElement>(null)

  const [example, setExample] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('there is lonely here (')
  const [active, setActive] = useState(false)

  const handleChange = (event: SelectChangeEvent<string>) => {
    const example = event.target.value || ''
    setExample(example)
    let t = examples.get(example) ?? ''
    program = t
  }

  const reinit = useCallback(() => {
    zh_init().then(() => setActive(true))
  }, [])
  useEffect(reinit, [])
  const run = () => {
    if (editorRef.current) {
      zh_set_main(editorRef.current.getValue())
      zh_run_main(input)
      setOutput(zh_get_output())
      console.log(output)

      setActive(false)
      reinit()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h4'
            color='white'
            component='div'
            fontWeight='bold'
            style={{ margin: '10px' }}>
            Zhaba-script
          </Typography>
          <Typography
            variant='h6'
            color='white'
            component='div'
            fontWeight='bold'
            style={{ margin: '10px' }}>
            by wgmlgz
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            style={{ margin: '10px' }}>
            <Typography
              variant='h5'
              color='white'
              fontWeight='bold'
              onClick={() =>
                window.open('https://github.com/Wgmlgz/Zhaba-script', '_blank')
              }>
              github
            </Typography>
          </Button>

          <Button
            variant='contained'
            color='secondary'
            style={{ margin: '10px' }}>
            <Typography
              variant='h5'
              color='white'
              fontWeight='bold'
              onClick={() =>
                window.open(
                  'https://github.com/Wgmlgz/Zhaba-script/tree/main/docs',
                  '_blank'
                )
              }>
              docs
            </Typography>
          </Button>
          <FormControl style={{ width: '200px' }}>
            <InputLabel
              id='demo-simple-select-label'
              style={{ color: 'white' }}>
              Select example
            </InputLabel>
            <Select
              color='primary'
              id='demo-simple-select'
              value={example}
              onChange={handleChange}
              label='Select example'>
              {[...examples.keys()].map(key => (
                <MenuItem value={key} key={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Grid container style={{ height: '90vh' }}>
        <Grid item md={12} lg={5}>
          <Root>
            <Editor
              editorDidMount={handleEditorDidMount}
              value={program}
              language='zh'
              options={{
                fontFamily: 'JetBrains Mono',
                fontSize: 20,
                contextmenu: true,
                cursorSmoothCaretAnimation: true,
                cursorBlinking: 'phase',
                minimap: {
                  enabled: false,
                },
              }}
              theme={'one-dark-pro'}
            />
          </Root>
        </Grid>
        <Grid
          item
          lg={2}
          md={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button {...{ disabled: !active }} variant='contained' size='large'>
            <Typography
              align='center'
              color='white'
              variant='h4'
              fontWeight='bold'
              onClick={run}>
              run
              <br />
              <ArrowForwardIosIcon />
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          lg={5}
          md={12}
          style={{
            padding: '50px',
            height: '100%',
          }}>
          <Root>
            <Grid container spacing={3} style={{ height: '100%' }}>
              <Grid item xs={12}>
                <Typography
                  fontFamily='JetBrains Mono'
                  color='primary'
                  fontSize='30pt'>
                  Program output:
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ height: '60%' }}>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono',
                    whiteSpace: 'pre-line',
                    overflowY: 'scroll',
                    height: '100%',
                  }}>
                  {output}
                </p>
              </Grid>
              <Grid item xs={12} style={{ height: '40%' }}>
                <TextField
                  ref={inputRef}
                  style={{ width: '100%' }}
                  label='Your input'
                  multiline
                  onChange={e => {
                    setInput(e.target.value)
                    console.log(input)
                  }}
                  variant='standard'
                  spellCheck='false'
                />
              </Grid>
            </Grid>
          </Root>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
