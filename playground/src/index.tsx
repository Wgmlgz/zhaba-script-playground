import { render } from 'react-dom'
import { rewireEditor } from './MonacoEditor/config'
import './styles.css'

import App from './App'
import React from 'react'

rewireEditor().then(() => render(<App />, document.getElementById('root')))
