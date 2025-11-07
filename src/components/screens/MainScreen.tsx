import "../styles/main-screen.css";

function MainScreen() {
  return (
    <div className="main-screen-total">
      <h1 className="main-screen-title">
        T<span className="redO">o</span>
        <span className="blueO">o</span>tie&nbsp; Fr
        <span className="redO">o</span>
        <span className="blueO">o</span>tie
      </h1>
      <div className="main-screen-action-buttons">
        <button className="main-screen-action-button">Start a new game</button>
        <button className="main-screen-action-button">
          Join an existing game
        </button>
      </div>
    </div>
  );
}

export default MainScreen;
