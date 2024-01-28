import pokeball from "../images/pokeball.png";
import "../styles/loading.css"

export const Loading = () => {
  return (
    <div className="loading">
      <img src={pokeball}/>
      <h2>Loading.....</h2>
    </div>
  )
}