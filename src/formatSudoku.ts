// formats the sudoku correctly according to rows and cols instead of boxes so that it can be solved
function formatSudoku(sudoku: number[][]): number[][] {
    const newSudoku = Array(9).fill('').map(() => Array(9).fill(0));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const newRow = Math.floor(i / 3) * 3 + Math.floor(j / 3); 
        const newCol = (i % 3) * 3 + j % 3;
        newSudoku[newRow][newCol] = sudoku[i][j];
      }
    }
    return newSudoku;
} 

function formatIndex(i: number, j: number): number[] {
    const newRow = Math.floor(i / 3) * 3 + Math.floor(j / 3); 
    const newCol = (i % 3) * 3 + j % 3;
    return [newRow, newCol];
}

export { formatSudoku, formatIndex };