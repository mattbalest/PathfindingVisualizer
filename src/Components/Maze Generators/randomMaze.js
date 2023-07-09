export function randomMaze(grid, adj, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL) {
    const newGrid = grid.slice();
    for (const row of newGrid){
        for (const node of row){
            node.isWall = true;
        }
    }
    const stack = [];
    const visited = new Set();
    newGrid[START_NODE_ROW][START_NODE_COL].isWall = false;
    newGrid[FINISH_NODE_ROW][FINISH_NODE_COL].isWall = false;
    const startNode = newGrid[START_NODE_ROW][START_NODE_COL]
    stack.push(startNode)
    
    while (stack.length > 0){
        const currentNode = stack.pop();
        const neighbors = adj[currentNode.count];
        for (let i=0;i<neighbors.length;i++){
            if (visited.has(neighbors[i]) === false){
                visited.add(neighbors[i]);
                
                if (Math.random() < 0.2){
                    newGrid[neighbors[i].row][neighbors[i].col].isWall = true;
                }
                else{
                    stack.push(neighbors[i]);
                    newGrid[neighbors[i].row][neighbors[i].col].isWall = false;
                }
            }
        }   
    }
    return newGrid;

    
}