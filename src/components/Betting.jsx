export default function Betting({ gameState }) {
  return (
    <>
    <div>time: {gameState.bettingTimer}</div>
    {gameState.race.horses.map((h, i) => (
      <div key={i}>{JSON.stringify(h)}</div>
    ))}
    </>
  )
}
