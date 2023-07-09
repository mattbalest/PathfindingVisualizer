
export function BreadthFirstSearch(grid, adjList, startNode, finishNode){
    
    let visited = new Array(1300);
    for (let i=0;i<visited.length;i++){
        visited[i] = false;
    }

    let queue = [];
    let visitedNodesInOrder = [];

    queue.push(startNode)
    visited[startNode.count] = true;

    while (queue.length > 0){
        let node = queue.shift()
        if (node.isWall){
            continue;
        }
        visitedNodesInOrder.push(node)
        if (node === finishNode) {
            break;
        }
        for (let i = 0;i<adjList[node.count].length;i++){
            let neighbor = adjList[node.count][i];
            if (visited[neighbor.count] === false ){
                queue.push(neighbor)
                visited[neighbor.count] = true;
            }
        }
    }

    return visitedNodesInOrder;
    
}

export function animateBFS (grid, visitedNodesInOrder, startNode, finishNode){
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


export function runBFS (grid, adj, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW) {
    
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder = BreadthFirstSearch(grid, adj, startNode, finishNode);
    console.log(visitedNodesInOrder);
    animateBFS(grid, visitedNodesInOrder, startNode, finishNode);
}


