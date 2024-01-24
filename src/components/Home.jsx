export const Home = ({ setStart }) => {
  const startGame = () => {
    setStart(true);
  };
  return (
    <div className="home-page">
      <h1>Do you want to play the game?</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};
