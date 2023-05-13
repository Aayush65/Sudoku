import { useState } from 'react';
import solveSudoku from './sudoku';
import isValid from './validSudoku';
import './App.css';

function App() {

  const [grid, setGrid] = useState(Array(9).fill('').map(() => Array(9).fill(0)));
  const [solving, setSolving] = useState(false);
  
  function handleChange(row: number, col: number, val: number) {
    if (val > 9 || val < 0) return;
    const newGrid = [...grid];
    newGrid[row][col] = val;
    setGrid(newGrid);
  };

  function handleSubmit() {
    if (!isValid(grid)) {
      alert("Invalid sudoku! Please avoid using same numbers in the same row, column or box.");
      return;
    }
    setSolving(true);
    const solvedSudoku = solveSudoku(grid);
    setGrid(solvedSudoku);
    setSolving(false);
  };

  // Resets all values of the grid and the sudoku to 0
  function handleReset() {
    setGrid(Array(9).fill('').map(() => Array(9).fill(0)));
  };

  return (
    <>
      <div className='border-white border-4 w-[30rem] h-[30rem] flex flex-wrap justify-center gap-3 p-2'>
        {grid.map((row, r) => (
          <div key={r} className='w-[9rem] h-[9rem] flex justify-center flex-wrap'>
            {row.map((col, c) => (
              <div key={c} className='w-[3rem] h-[3rem] border-white border-2'>
                <input value={col} className='w-full h-full text-center focus:bg-[#2e2e2e]' onChange={(e) => {handleChange(r, c, parseInt(e.target.value.slice(-1)) || 0)}} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='flex justify-around'>
        <button type='button' onClick={handleReset} className='bg-white text-[#242424] p-3 rounded-md mt-4 active:scale-110'>Reset</button>
        <button type='button' onClick={handleSubmit} className='bg-white text-[#242424] p-3 rounded-md mt-4 active:scale-110'>{solving ? 'Solving...' : 'Solve'}</button>
      </div>
    </>
  )
}

export default App
