import { useState } from 'react';
import solveSudoku from './sudoku';
import isValid from './validSudoku';
import './App.css';
import { formatSudoku } from './formatSudoku';


function App() {

	const [grid, setGrid] = useState<number[][]>(Array(9).fill('').map(() => Array(9).fill(0)));
	const [inValids, setInValids] = useState<boolean[][]>(Array(9).fill(false).map(() => Array(9).fill(false)));
	const [fixed, setFixed] = useState<boolean[][]>(Array(9).fill(false).map(() => Array(9).fill(false)));
	const [solving, setSolving] = useState(false);
	const [isFilling, setIsFilling] = useState(false);

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
		const totalInvalids = () => {
			for (let i = 0; i < 9; i++)
				for (let j = 0; j < 9; j++)
					if (inValids[i][j]) return false;
		};
		if (!totalInvalids) {
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
		setInValids(Array(9).fill(false).map(() => Array(9).fill(false)));
		setFixed(Array(9).fill(false).map(() => Array(9).fill(false)));
	};

	async function handleFill() {
		setIsFilling(true);
		handleReset();
		
		// Aborting after timeoutTime ms
		const timeoutTime = 3000
		const abortRequest = new AbortController();
		const abortTimeOut = setTimeout(() => {
			abortRequest.abort(); 
			setIsFilling(false);
		}, timeoutTime);

		const apiCall = await fetch('https://sugoku.onrender.com/board?difficulty=medium', abortRequest);
		clearTimeout(abortTimeOut);
		const data = await apiCall.json();
		const randomSudoku = formatSudoku(data.board);

		const toBeFixed = Array(9).fill(false).map(() => Array(9).fill(false));
		for (let i = 0; i < 9; i ++)
			for (let j = 0; j < 9; j ++)
				if (randomSudoku[i][j]) toBeFixed[i][j] = true;
		setFixed(toBeFixed);
		
		const toBeInvalids = [...inValids];
		for (let i = 0; i < 9; i ++)
			for (let j = 0; j < 9; j ++)
				if (randomSudoku[i][j]) toBeInvalids[i][j] = true;
		setInValids(toBeInvalids);
		
		// checking for invalids
		const newInvalids = isValid(randomSudoku);
		if (newInvalids.length)
			setInValids(newInvalids);

		setGrid(randomSudoku);
		setIsFilling(false);
	}

	return (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='mb-10 text-2xl md:text-5xl font-black text-center'>It's Mind Sharpening Time!!!</h1>
			<div className='border-black border-8 md:border-4 w-[21rem] h-[21rem] md:w-[30rem] md:h-[30rem] flex flex-wrap gap-3 p-1 md:p-2 bg-[#3f3838]'>
				{grid.map((row, r) => (
					<div key={r} className='w-[6rem] h-[6rem] md:w-[9rem] md:h-[9rem] flex justify-center flex-wrap'>
						{row.map((col, c) => (
							<div key={c} className='w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] border-gray-800 border-[1px] md:border-2'>
								<input disabled={fixed[r][c]} value={col ? col : ''} className={`w-full h-full text-center text-black focus:bg-[#e7dfdf] hover:cursor-pointer focus:hover:cursor-text ${inValids[r][c] && !fixed[r][c] ? 'bg-[#dc2d2d] text-white focus-within:text-black' : ''} ${solving ? 'cursor-not-allowed' : ''} disabled:bg-[#b5b9b9]`} onChange={(e) => { handleChange(r, c, parseInt(e.target.value.slice(-1)) || 0) }} />
							</div>
						))}
					</div>
				))}
			</div>
			<div className='flex gap-12 md:gap-16'>
				<button type='button' disabled={isFilling} onClick={handleReset} className={`bg-[#242424] text-white py-2 px-3 md:py-3 md:px-4 text-sm md:text-base rounded-lg mt-4 hover:bg-[#333333] hover:scale-105 active:scale-110 disabled:bg-[#505050]`}>Reset</button>
				<button type='button' onClick={handleFill} className='bg-[#242424] text-white py-2 px-3 md:py-3 md:px-4 text-sm md:text-base rounded-lg mt-4 hover:bg-[#333333] hover:scale-105 active:scale-110'>{isFilling ? 'Filling...' : 'Fill'}</button>
				<button type='button' disabled={isFilling} onClick={handleSubmit} className={`bg-[#242424] text-white py-2 px-3 md:py-3 md:px-4 text-sm md:text-base rounded-lg mt-4 hover:bg-[#333333] hover:scale-105 active:scale-110 disabled:bg-[#505050]`}>{solving ? 'Solving...' : 'Solve'}</button>
			</div>
		</div>
	)
}

export default App