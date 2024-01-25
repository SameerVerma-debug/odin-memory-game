export const Card = ({id,name,imageUrl,onClick}) => {
  return <button className="card" onClick={() => {onClick(id)}}>
    <img src={imageUrl}/>
    <p className="pokemon-name">{name.toUpperCase()}</p>
  </button>
}