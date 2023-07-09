import { PriorityQueue } from "../../Implementations/PriorityQueue";

function aStar(grid, adjList, startNode, finishNode){
    
    const visitedNodesInOrder = [];
    let visited = new Array(grid.length * grid[0].length);
    for (let i = 0; i < visited.length; i++) {
        visited[i] = false
    }
    const queue = new PriorityQueue();
    queue.enqueue(startNode, 0);
    visited[startNode.count] = true;
    
    
    while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) {
            return buildPath(finishNode, startNode, visitedNodesInOrder);
        }

        const neighbors = adjList[currentNode.count]
        for (const neighbor of neighbors) {
            neighbor.g = currentNode.g + neighbor.weight
            neighbor.h = heuristic(neighbor, finishNode)
            neighbor.f = neighbor.g + heuristic(neighbor, finishNode);
            
            if (visited[neighbor.count] === true) continue;

            visited[neighbor.count] = true;
            if (!neighbor.isWall){
                queue.enqueue(neighbor, neighbor.f);
                neighbor.parent = currentNode
            }
            
        }
    }
    return null;

}


function heuristic (node, finishNode) {
    return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
}

function buildPath(node, startNode, visitedNodesInOrder) {
    const path = [];
    while (node !== undefined) {
        path.unshift(node);
        node = node.parent;
    }
    return [path, visitedNodesInOrder];
}
function animateAStar(shortestPath, visitedNodesInOrder){
    for (let i=2;i<=visitedNodesInOrder.length;i++){
        if (i === visitedNodesInOrder.length-2){
            setTimeout(() => {
                animateShortestPath(shortestPath)
            }, 10*i)
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            if (i < visitedNodesInOrder.length - 1) {
                document.getElementById(node.count).className = 'node node-cur'
            }
        }, 10*i)

        setTimeout(() => {
            const node = visitedNodesInOrder[i-1];
            if (i < visitedNodesInOrder.length && i !== 1) {
                if (node.weight !== 1) {
                    document.getElementById(node.count).className = 'node node-weight-visited'
                }
                else {
                    document.getElementById(node.count).className = 'node node-visited'
                }
            }
        }, 10 * i)
    }
}

function animateShortestPath(shortestPath){
    let result = 0;
    for (let i=0;i<shortestPath.length;i++){
        
        result += shortestPath[i].weight
    }
    console.log("A star cost: " + result + "\n")
    for (let i = 1; i < shortestPath.length; i++) {
        setTimeout(() => {
            const node = shortestPath[i];
            if (i < shortestPath.length - 1) {
                document.getElementById(node.count).className = 'node node-shortest-path-cur'
            }
        }, 10 * i)

        setTimeout(() => {
            const node = shortestPath[i - 1];
            if (i < shortestPath.length - 1) {
                if (node.weight !== 1) {
                    document.getElementById(node.count).className = 'node node-shortest-path-weight'
                }
                else {
                    document.getElementById(node.count).className = 'node node-shortest-path'
                }

            }
        }, 10 * i)
    }
}
export function runAStar(grid, adjList, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW) {
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let [shortestPath, visitedNodesInOrder] = aStar(grid, adjList, startNode, finishNode)
    animateAStar(shortestPath, visitedNodesInOrder);
}