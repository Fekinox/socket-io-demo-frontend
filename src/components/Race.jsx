import HorseRaceLine from "./HorseRaceLine";

export default function Race({ gameState }) {
  return (
    <>
      <div>timer: {gameState.preRaceTimer}</div>
      {gameState.raceStates.horseStates.map((hs, i) => (
        <HorseRaceLine key={i} horseState={hs} />
      ))}
    </>
  )
}
