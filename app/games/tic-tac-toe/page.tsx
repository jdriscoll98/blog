"use client";

import { useCallback, useEffect, useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(""));
  const [history, setHistory] = useState<Array<Array<string>>>([]);
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const updateBoard = useCallback(
    (index: number) => {
      if (board[index] || winner) return;
      setHistory([...history, board]);
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      checkWinner(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    },
    [board, history, player, winner]
  );

  const checkWinner = (board: Array<string>) => {
    // if all cells are filled, it's a tie
    if (board.every((cell) => !!cell)) {
      setWinner("Tie");
      return;
    }
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  };

  useEffect(() => {
    const getAIResponse = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            board,
            history,
          }),
        });
        const { index } = await res.json();
        // if index is taken, try again
        if (board[index]) {
          getAIResponse();
          return;
        }
        updateBoard(index);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (player === "O" && !winner) {
      getAIResponse();
    }
  }, [board, history, player, updateBoard, winner]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-full h-16 flex items-center justify-center text-2xl font-bold bg-white dark:bg-gray-600 rounded shadow cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
            onClick={() => updateBoard(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {winner ? (
          <p className="font-mono text-gray-800 dark:text-gray-300">
            Winner: {winner}
          </p>
        ) : (
          <p className="font-mono text-gray-800 dark:text-gray-300">
            Current Player: {player}
          </p>
        )}
      </div>
      {loading && (
        <div className="mt-4">
          <p className="font-mono text-gray-800 dark:text-gray-300">
            AI is thinking...
          </p>
        </div>
      )}
      {/* reset game if game is over */}
      {winner && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setBoard(Array(9).fill(""));
            setWinner("");
            setHistory([]);
            setPlayer("X");
          }}
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
