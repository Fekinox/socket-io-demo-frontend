import Betting from "./Betting";
import Race from "./Race";
import Results from "./Results";

export default function MainScreen({ gameState }) {
  if (gameState === null) { return }
  switch(gameState.status) {
    case 'betting':
      return (<Betting gameState={gameState} />)
    case 'race':
      return (<Race gameState={gameState} />)
    case 'results':
      return (<Results gameState={gameState} />)
  }
  // return (
  //   <div><pre>{JSON.stringify(gameState, null, 2)}</pre></div>
  // )
}
