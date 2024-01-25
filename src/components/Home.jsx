import "../styles/home.css";
import start from "../sound/start.wav";

export const Home = ({ setStart }) => {
  const startGame = () => {
    new Audio(start).play();
    setTimeout(() => {
      setStart(true);
    },300)
  };
  return (
      <div className="home-page">
        <h1>Pokemon memory game</h1>
        <p>
            Get points by clicking on a pokemon but don't click on any more
            than once!
          </p>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
  );
};
