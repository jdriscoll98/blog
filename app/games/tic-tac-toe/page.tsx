"use client";

import { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [player, setPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    checkWinner(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board: Array<string | null>) => {
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

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-full h-16 flex items-center justify-center text-2xl font-bold bg-white dark:bg-gray-600 rounded shadow cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="mt-4">
        {winner ? (
          <p className="font-mono text-gray-800 dark:text-gray-300">Winner: {winner}</p>
        ) : (
          <p className="font-mono text-gray-800 dark:text-gray-300">Current Player: {player}</p>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
