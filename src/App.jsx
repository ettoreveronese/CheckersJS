import Board from "./components/Board";

function App() {
  return (
    <>
    <h1 id="title">Checkers JS</h1>
    <div className="board-container">
      <Board playerName={{white: "Player1", black: "Player2"}}></Board>
    </div>
    </>
  )
}

export default App;
