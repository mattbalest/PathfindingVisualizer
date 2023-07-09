export function buildMaze( adj, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL){
    const numRows = 22;
    const numCols = 56;

    // Create an array to represent the grid
    const grid = new Array(numRows);
    let count = 0;
    for (let i = 0; i < numRows; i++) {
        grid[i] = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            // Initialize each cell with the specified properties
            grid[i][j] = { row: i, col: j, isWall: false, isStart: false, isFinish: false, count: count++ };
        }
    }

    recursiveDivisionMaze(grid, 0, 22 - 1, 0, 56 - 1);
    console.log(grid)
    return grid;
}


function recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, colEnd) {
    // Base case: sub-grid size is 1x1 or smaller
    if (rowEnd <= rowStart || colEnd <= colStart) {
        return;
    }

    // Choose the orientation of the wall to be added
    const isHorizontal = Math.random() < 0.5;

    // Choose the location of the wall
    const wallRow = isHorizontal ? randomInt(rowStart + 1, rowEnd) : randomInt(rowStart, rowEnd);
    const wallCol = isHorizontal ? randomInt(colStart, colEnd) : randomInt(colStart + 1, colEnd);

    // Create the wall
    for (let i = colStart; i <= colEnd; i++) {
        if (i !== wallCol) {
            grid[wallRow][i].isWall = true;
        }
    }
    for (let i = rowStart; i <= rowEnd; i++) {
        if (i !== wallRow) {
            grid[i][wallCol].isWall = true;
        }
    }

    // Recursively divide the sub-grids on each side of the wall
    if (isHorizontal) {
        recursiveDivisionMaze(grid, rowStart, wallRow - 1, colStart, colEnd);
        recursiveDivisionMaze(grid, wallRow + 1, rowEnd, colStart, colEnd);
    } else {
        recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, wallCol - 1);
        recursiveDivisionMaze(grid, rowStart, rowEnd, wallCol + 1, colEnd);
    }
}

// Helper function to generate a random integer within a range
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildSurroungingWalls(grid){
    let newGrid = grid.slice()
    

    for (let y=0;y<grid.length;y++){
        for (let x=0;x<grid[0].length;x++){
            newGrid[y][x].isWall = true;
        }
    }
    
    console.log(newGrid)
    return newGrid;
}


// function randomChoice(horizontal, vertical){
//     let choice = getRandomInt(0, 100)

//     if (choice % 2 === 0){
//         return horizontal;
//     }
//     else{
//         return vertical;
//     }
// }

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min); // The 
// }

































// export function buildMaze(grid, adj, width, height){
//     recursiveMaze(grid, adj, width, height);
//     return grid;
// }

// function recursiveMaze(grid, adj, width, height) {
//     console.log('well it is running ig')
//     const newGrid = grid.slice();
//     for (const row of newGrid) {
//         for (const node of row) {
//             node.isWall = true;
//         }
//     }

//     divide(grid, 0, 0, width, height, chooseOrientation(width, height));
//     console.log('made it here')
//     console.log(width, height)
//     for (let i=1;i<20 ;i++){
//         for (let j=1;j<20;j++){
//             console.log(j, i)
//             console.log(grid[j][i])
//             if (grid[j][i].isWall){
//                 markCell(grid, i, j);
//             }
//         }
//     }

//     return grid;
// }

// function divide(grid, x, y, width, height, orientation){
//     if (width < 2 || height < 2){
//         return;
//     }
//     console.log('here')
//     if (orientation === 'horizontal'){
//         let wall_y = y + getRandomInt(1, height-2);
//         for (let i=x;i<(x+width-1);i++){
//             grid[wall_y][i].isWall = false;
//         }
//         divide(grid, x, y, width, wall_y-y+1, chooseOrientation(width, wall_y - y +1))
//         divide(grid, x, wall_y + 1, width, y + height - wall_y - 1, chooseOrientation(width, y + height - wall_y - 1))
//     }

//     else{
//         let wall_x = x + getRandomInt(1, width-2);
//         for (let i=x;i<y+height-1;i++){
//             grid[i][wall_x] = false;
//         }
//         divide(grid, x, y, wall_x - x + 1, height, chooseOrientation(wall_x - x + 1, height))
//         divide(grid, wall_x + 1, y, x + width - wall_x - 1, height, chooseOrientation(x + width - wall_x - 1, height))
//     }
// }


// function markCell (grid, x, y) {
//     let cell = grid[y][x];
//     let neighbors = []
//     if (x > 1){
//        let row = [x-2, y];
//        neighbors.push(row);
//     }

//     if (x < grid[0].length -2){
//         let row = [x+2, y]
//         neighbors.push(row);
//     }
//     if (y>1){
//         let row = [x, y-2];
//         neighbors.push(row)
//     }

//     if (y < grid.length-2){
//         let row = [x, y+2];
//         neighbors.push(row);
//     }

//     let randomNeighbor = neighbors[getRandomInt(0, neighbors.length)];
//     let neighborX = randomNeighbor[0];
//     let neighborY = randomNeighbor[1];

//     let neighbor = grid[neighborY][neighborX];
//     if (neighbor.isWall){
//         cell.isWall = false;
//         neighbor.isWall = false;
//     }
// }
// function chooseOrientation(width, height){
//     if (width < height)
//         return "horizontal"
//     else if (height < width)
//         return "vertical"
//     else{
//         return randomChoice("horizontal", "vertical")
//     }
// }

// function randomChoice(choice1, choice2){
//     let choice = getRandomInt(0, 100)
//     if (choice % 2 === 0){
//         return choice1
//     }
//     else{
//         return choice2
//     }
// }

    