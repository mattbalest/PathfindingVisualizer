import {PriorityQueue} from "../../Implementations/PriorityQueue";


function dijkstra(grid, adjList, startNode, endNode) {
    const distances = new Map();
    const visitedNodes = new Set();
    const previousNodes = new Map();
    let visitedNodesInOrder = []

    const nodes = new PriorityQueue()
    // initialize distances
    for (const row of grid) {
        for (const node of row) {
            distances.set(node, Infinity);
        }
    }
    distances.set(startNode, 0);
    nodes.enqueue(startNode, 0);

    while (!nodes.isEmpty()) {
        const currentNode = nodes.dequeue();
        if (currentNode === endNode) {
            return [visitedNodesInOrder, previousNodes];
        }

        if (visitedNodes.has(currentNode)) {
            continue;
        }
        visitedNodes.add(currentNode);
        visitedNodesInOrder.push(currentNode);
        const neighbors = adjList[currentNode.count];
        for (const neighbor of neighbors) {
            const distance = distances.get(currentNode) + neighbor.weight
            if (distance < distances.get(neighbor) && !neighbor.isWall) {
                distances.set(neighbor, distance);
                previousNodes.set(neighbor, currentNode);
                nodes.enqueue(neighbor, distance);
            }
        }
    }
   
    return visitedNodesInOrder;
}

function buildPath(previousNodes, finishNode) {
    const path = [];
   
    let currentNode = finishNode;
    while (currentNode !== undefined) {
        path.unshift(currentNode);
        currentNode = previousNodes.get(currentNode);
    }
    let result = 0;
    for (let i = 0; i < path.length; i++) {
        result += path[i].weight
    }
    console.log("Dijstrak cost: " + result + "\n")
        for (let i = 1; i < path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                if (i <path.length - 1) {
                    document.getElementById(node.count).className = 'node node-shortest-path-cur'
                }
            }, 10 * i)

            setTimeout(() => {
                const node = path[i - 1];
                if (i < path.length - 1) {
                    if (node.weight !== 1){
                        document.getElementById(node.count).className = 'node node-shortest-path-weight'
                    }
                    else{
                        document.getElementById(node.count).className = 'node node-shortest-path'
                    }
                    
                }
            }, 10 * i)
        }
    
    return;
}

function animateDijkstra(grid, visitedNodesInOrder,previousNodes, startNode, finishNode) {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length ){
            setTimeout(() => {
                buildPath(previousNodes, finishNode)
                return;
            }, 10 * i)
        }

        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            if (i < visitedNodesInOrder.length - 1) {
                document.getElementById(node.count).className = 'node node-cur'
            }
        }, 10 * i)
        setTimeout(() => {
            const node = visitedNodesInOrder[i-1];
            
            if(i < visitedNodesInOrder.length && i !== 1){
                if (node.weight !== 1){
                    document.getElementById(node.count).className = 'node node-weight-visited'
                }
                else{
                    document.getElementById(node.count).className = 'node node-visited'
                }
            }
                

            
        }, 10 * i)

    }
}

export function runDijkstra(grid, adjList, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW){
    
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const [visitedNodesInOrder, previousNodes] = dijkstra(grid, adjList, startNode, finishNode);
    animateDijkstra(grid, visitedNodesInOrder, previousNodes, startNode, finishNode);

}