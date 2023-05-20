import { useState } from 'react';
import solveSudoku from './sudoku';
import isValid from './validSudoku';
import './App.css';

declare global {
  interface Array<T> {
    has(subArray: [number, number]): boolean;
  }
}

Array.prototype.has = function(subArray: [number, number]): boolean {
  for (let i = 0; i < this.length; i++) {
    if (this[i][0] == subArray[0] && this[i][1] == subArray[1])
      return true;
  }
  return false;
}

function App() {

  const [grid, setGrid] = useState(Array(9).fill('').map(() => Array(9).fill(0)));
  const [solving, setSolving] = useState(false);
  const [inValids, setInValids] = useState<number[][]>([]);
  
  function handleChange(row: number, col: number, val: number) {
    if (val > 9 || val < 0) return;
    const newGrid = [...grid];
    newGrid[row][col] = val;
    
    // checking for invalids
    const newInvalids = isValid(grid);
    if (newInvalids.length) {
      setInValids(newInvalids);
    }
    else
      setInValids([]);
  };
  
  function handleSubmit() {
    if (inValids.length) {
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
    setInValids([]);
  };
  
  return (
    <>
      <div className='border-white border-4 w-[30rem] h-[30rem] flex flex-wrap justify-center gap-3 p-2 bg-[#827b7b]'>
        {grid.map((row, r) => (
          <div key={r} className='w-[9rem] h-[9rem] flex justify-center flex-wrap'>
            {row.map((col, c) => (
              <div key={c} className='w-[3rem] h-[3rem] border-white border-2'>
                <input value={col? col: ''} className={`w-full h-full text-center text-[white] focus:bg-[#4f4f4f] hover:cursor-pointer focus:hover:cursor-pointer ${inValids.length && inValids.has([r, c]) ? 'bg-[#dc2d2d]' : ''} ${solving ? 'cursor-not-allowed' : ''}`} onChange={(e) => {handleChange(r, c, parseInt(e.target.value.slice(-1)) || 0)}} />
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