import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader'

const App = () => {
  useEffect(() => document.title = 'Hello, World!')

  return <div>Hello, World!</div>
}

export default hot(module)(App)