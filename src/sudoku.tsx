import formatSudoku from "./formatSudoku";

// Solve the sudoku
function solveSudoku(sudoku: number[][]): number[][] {
  sudoku = formatSudoku(sudoku);


  sudoku = formatSudoku(sudoku);
  return sudoku
};

export default solveSudoku;