import React, { useState } from 'react'
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
import examples from './examples'

import { ZhEditor } from './ZhEditor'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ZhDocs } from './ZhDocs'

export default function App() {
  const [example, setExample] = useState('')
  const [program, setProgram] = useState(examples.get('hello world') ?? '')

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
                  '/zhaba',
                  '_blank'
                )
              }>
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
              onClick={() =>
                window.open(
                  '/zhaba/docs',
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
      <BrowserRouter>
        <Routes>
          <Route path="/zhaba" element={<ZhEditor example={example} program={program} />} />
          <Route path="/zhaba/docs" element={<ZhDocs />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
