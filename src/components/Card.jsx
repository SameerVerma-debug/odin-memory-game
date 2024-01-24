export const Card = ({id,name,imageUrl,onClick}) => {
  return <button className="card" onClick={() => {onClick(id)}}>
    <img src={imageUrl}/>
    <p>{name}</p>
  </button>
}