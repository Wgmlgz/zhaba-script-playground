import React, { FC, useCallback, useEffect, useState } from 'react'
import './styles.css'
import {
  Grid,
  Typography,
  Button,
  TextField,
} from '@mui/material'
import Editor, { EditorDidMount } from '@monaco-editor/react'
import { useRef } from 'react'
import { styled } from '@mui/material/styles'

import { zh_run_main, zh_get_output, zh_set_main, zh_init } from './zhaba/zhaba'

const Root = styled('div')(({ theme }) => ({
  paddingTop: '50px',
  [theme.breakpoints.up('md')]: {
    height: '30vh',
  },
  [theme.breakpoints.up('lg')]: {
    height: '100%',
  },
}))

export const ZhEditor: FC<{ example: string, program: string }> = ({ example, program }) => {

  const editorRef = useRef<any>(null)

  const handleEditorDidMount: EditorDidMount = useCallback((_, editor) =>
    editorRef.current = editor
    , [])

  const inputRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('there is lonely here (')
  const [active, setActive] = useState(false)

  const reinit = useCallback(() => {
    zh_init().then(() => setActive(true))
  }, [])

  useEffect(reinit, [])

  const run = useCallback(() => {
    if (!editorRef.current) return
    zh_set_main(editorRef.current.getValue())
    zh_run_main(input)
    setOutput(zh_get_output())

    setActive(false)
    reinit()
  }, [input, reinit])

  return (
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
              wordWrap: true,
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
            {'>'}
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
              <pre
                style={{
                  fontFamily: 'JetBrains Mono',
                  whiteSpace: 'pre-wrap',
                  overflowY: 'scroll',
                  height: '100%',
                }}>
                {output}
              </pre>
            </Grid>
            <Grid item xs={12} style={{ height: '40%' }}>
              <TextField
                ref={inputRef}
                style={{ width: '100%' }}
                label='Your input'
                multiline
                onChange={e => setInput(e.target.value)}
                variant='standard'
                spellCheck='false'
              />
            </Grid>
          </Grid>
        </Root>
      </Grid>
    </Grid>
  )
}
