import { useState } from 'react'
import {Home} from "./components/Home"
import {Game} from "./components/Game"
import "./styles/app.css"

function App() {
  const [start,setStart] = useState(false);

  return (
    <div className='app'>
      {start ? <Game/> : <Home start={start} setStart={setStart}/>}
    </div>
  )
}

export default App
