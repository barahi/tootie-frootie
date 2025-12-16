import { GameSetupProvider } from "./context/GameFlowContext";
import Routing from "../src/context/Routing";
import "./App.css";

function App() {
  return (
    <GameSetupProvider>
      <Routing />
    </GameSetupProvider>
  );
}

export default App;
