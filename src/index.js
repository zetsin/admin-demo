import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import './index.css'
import Router from './router'
import registerServiceWorker from './registerServiceWorker'

registerServiceWorker()
ReactDOM.render(<Router />, document.getElementById('root'))
