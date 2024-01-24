import { useState } from 'react'
import {Home} from "./components/Home"
import {Game} from "./components/Game"

function App() {
  const [start,setStart] = useState(false);

  return (
    <>
      {start ? <Game/> : <Home start={start} setStart={setStart}/>}
    </>
  )
}

export default App
