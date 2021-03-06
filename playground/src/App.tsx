import React, { useState, useEffect } from 'react'
import './styles.css'
import {
  AppBar,
  Typography,
  Button,
  CssBaseline,
  Toolbar,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'

import { ZhEditor } from './ZhEditor'
import { ZhDocs } from './ZhDocs'
import { fetchFilesPaths } from './util'

export default function App() {
  const [examples, setExamples] = useState(
    new Map<string, string>([
      [
        'hello world',
        `use std

fn main
  < 'hi world!' <
`,
      ],
    ])
  )
  const [example, setExample] = useState('')
  const [program, setProgram] = useState(examples.get('hello world') ?? '')

  const [page, setPage] = useState('zhaba')

  const fetchExamples = async () => {
    const files: [string, string][] = await Promise.all(
      (
        await fetchFilesPaths('examples')
      )
        .filter(({ path }: { path: string }) => path.split('.').at(-1) === 'zh')
        .map(async ({ path, url }: { path: string; url: string }) => {
          let content = await (
            await fetch(
              `https://raw.githubusercontent.com/Wgmlgz/zhaba-script/main/examples/${path}`
            )
          ).text()

          return [path.substring(0, path.length - 3), content]
        })
    )
    setExamples(new Map<string, string>(files))
    console.log(files)
  }
  useEffect(() => {
    const url = new URL(window.location.href)
    const page = url.searchParams.get('page')
    setPage(page ?? 'zhaba')
    fetchExamples()
  }, [])

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='sticky'>
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
                  window.open(
                    'https://github.com/Wgmlgz/Zhaba-script',
                    '_blank'
                  )
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
                onClick={() => window.location.replace('/zhaba')}>
                editor
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
                onClick={() => window.location.replace('/zhaba?page=docs')}>
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
                onChange={(event: SelectChangeEvent<string>) => {
                  const example = event.target.value || ''
                  setExample(example)
                  setProgram(examples.get(example) ?? '')
                }}
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

        <main style={{ height: '100%' }}>
          {page === 'docs' ? (
            <ZhDocs />
          ) : (
            <ZhEditor example={example} program={program} />
          )}
        </main>
      </ThemeProvider>
    </div>
  )
}
