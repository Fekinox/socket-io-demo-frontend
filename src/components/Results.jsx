import HorseRaceLine from "./HorseRaceLine"

export default function Results({ gameState }) {
  return (
    <>
      <div>timer: {gameState.resultsTimer}</div>
      {gameState.raceStates.horseStates.map((hs, i) => (
        <HorseRaceLine key={i} horseState={hs} />
      ))}
    </>
  )
}
