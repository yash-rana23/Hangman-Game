import React from 'react'
import ReactDom from 'react-dom'
import Boxcontainer from './Boxcontainer.js'
import './inex.css'
class App extends React.Component {
  render() {
    return (
      <div class='app'>
        <Boxcontainer />
      </div>
    )
  }
}
ReactDom.render(<App />, document.getElementById('root'))
