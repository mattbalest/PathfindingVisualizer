export function DepthFirstSearch(grid, adjList, startNode, finishNode){
    let visited = new Array(1300);
    let visitedNodesInOrder = []

    for (let i = 0; i < visited.length; i++) {
        visited[i] = false;
    }

    let stack = []
    stack.push(startNode);

    while (stack.length){
        let node = stack.pop();
        if (node.isWall) continue
        if (visited[node.count] === true)
            continue

        visitedNodesInOrder.push(node);
        visited[node.count] = true;
        
        if (node === finishNode){
            break;
        }
            for (let i=0;i<adjList[node.count].length;i++){
                let neighbor = adjList[node.count][i];
                if (visited[neighbor.count] === false){
                    stack.push(neighbor)
                    continue;
                }
            }
    }
    console.log(visitedNodesInOrder)
    return visitedNodesInOrder;
}


export function animateDFS (grid, visitedNodesInOrder, shortestPath, startNode, finishNode){
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            if (i < visitedNodesInOrder.length - 1) {
                document.getElementById(node.count).className = 'node node-cur'
            }
        }, 10 * i)
        setTimeout(() => {
            const node = visitedNodesInOrder[i - 1];

            if (i < visitedNodesInOrder.length)
                document.getElementById(node.count).className = 'node node-visited'


        }, 10 * i)

    }
}

export function runDFS(grid, adj, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW){

    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder = DepthFirstSearch(grid, adj, startNode, finishNode);
    animateDFS(grid, visitedNodesInOrder, startNode, finishNode);
}

    


