import React from "react";
import "./styles.css";

class Status extends React.Component {
  render() {
    return <span className={this.props.className}>{this.props.status}</span>;
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaults();
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] || this.state.winner) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    let winner = calculateWinner(squares);

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: winner,
      endGame: !winner && endGame(squares)
    });
  }

  resetGame() {
    this.setState(defaults());
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  getStatus() {
    if (this.state.endGame) {
      return {
        className: "no-winner",
        status: "Não houve vencedor"
      };
    }
    let winner = this.state.winner;
    let nextPlayer = this.state.xIsNext ? "X" : "O";
    let status = winner ? `Vencedor: ${winner}` : `Next Player: ${nextPlayer}`;
    return {
      className: winner ? "winner" : "playing",
      status: status
    };
  }
  render() {
    let status = this.getStatus();

    return (
      <div>
        <div>
          <div className="status">
            <Status className={status.className} status={status.status} />
          </div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <button
          className={
            this.state.winner || this.state.endGame ? "restart" : "restart none"
          }
          onClick={() => this.resetGame()}
        >
          Novo Jogo
        </button>
      </div>
    );
  }
}

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

function defaults() {
  return {
    squares: Array(9).fill(null),
    xIsNext: false,
    winner: null,
    endGame: false
  };
}

function endGame(square) {
  let endGame = square.filter((value) => !value);
  return !endGame.length;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
