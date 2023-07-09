import { useState, useEffect } from "react";
import Node from "./Components/Node";
import Navbar from "./Components/Navbar";
import { randomMaze } from "./Components/Maze Generators/randomMaze";
import './App.css';
import { buildMaze } from "./Components/Maze Generators/recursiveDivisionMaze";


let rows = 22;
let columns = 53;

const START_NODE_ROW = 10;
const START_NODE_COL = 10;

const FINISH_NODE_ROW = 20;
const FINISH_NODE_COL = 52;



function App() {

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const [grid, setGrid] = useState([]);
    const [adj, setAdj] = useState({})
  
    const fillGridWithWeights = (grid) => {
        let newGrid = grid.slice();
        for (const row of newGrid){
            for (const node of row){
                if (randomInt(0, 100) % 3 === 0 && node.isStart === false && node.isFinish === false){
                    node.isweight = true
                    node.weight = randomInt(2, 6);
                } 
            }
        }
        setGrid(newGrid);
        setAdj(getAdjList(newGrid))

    }
    const recursiveMaze = (grid, adj) => {
        let newGrid = buildMaze(grid, adj, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);
        let newAdj = getAdjList(newGrid);
        setGrid(newGrid);
        setAdj(newAdj)
    }
    
    const clearBoard = () => {
        let newGrid = getGrid();
        let newAdj = getAdjList(newGrid);
        setGrid(newGrid);
        setAdj(newAdj)

    }
    const runRandomMaze = (grid, adj, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL) => {
        const newGrid = randomMaze(grid, adj, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);
        const newAdj = getAdjList(newGrid);
        setGrid(newGrid)
        setAdj(newAdj)
    }
    
    const getNewGridWithWall = (rowWall, colWall) => {
        const newGrid = grid.slice()
        const node = newGrid[rowWall][colWall];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[rowWall][colWall] = newNode;
        return newGrid;
    }
    const onClick = (row, col) => {
        const grid = getNewGridWithWall(row, col);
        const adj = getAdjList(grid)
        setGrid(grid)
        setAdj(adj)
    }

    const getGrid = () => {
        const grid = [];
        let count = 0;
        for (let row = 0; row < rows; row++) {
            const currentRow = [];
            for (let col = 0; col < columns; col++) {
                let node = createNode(col, row, count++, false)
                currentRow.push(node);
            }
            grid.push(currentRow);
        }
        
        return grid;
    };

    const getAdjList = (grid) => {
        let adj = {};
        for (let i=0;i<1300;i++){
            adj[i] = [];
        }
        for (const row of grid) {
            
            for (const node of row) {
                if ((node.row + 1) < grid.length) {
                    adj[node.count].push(grid[node.row + 1][node.col])
                }
                if ((node.row - 1) >= 0) {
                    adj[node.count].push(grid[node.row - 1][node.col])
                }
                if ((node.col + 1) < grid[node.row].length) {
                    adj[node.count].push(grid[node.row][node.col + 1])
                }
                if ((node.col - 1) >= 0) {
                    adj[node.count].push(grid[node.row][node.col - 1])
                }
            }
        }
        return adj;
    }

    useEffect(() => {
        const grid = getGrid();
        const adj = getAdjList(grid)
        setGrid(grid)
        setAdj(adj)
    }, [])

    const createNode = (col, row, count, isWall) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL ? true : false,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL ? true : false,
            isWall: isWall,
            isweight: false,
            weight: 1,
            count: count,
            prevNode: null,
            g: 0,
            h: 0,
            f: undefined,
            parent: undefined,  

        };
    };

  return (
    <div className="App">
          <Navbar grid={grid} adj={adj} 
            START_NODE_COL={START_NODE_COL} START_NODE_ROW={START_NODE_ROW} 
            FINISH_NODE_COL={FINISH_NODE_COL} FINISH_NODE_ROW={FINISH_NODE_ROW} runRandomMaze = {runRandomMaze} 
            clearBoard = {clearBoard} recursiveMaze = {recursiveMaze}
            fillGridWithWeights={fillGridWithWeights}>
          </Navbar>
          <div className="grid">
              {grid.map((row, rowIdx) => {
                  return (
                      <div key={rowIdx}>
                          {row.map((node, nodeIdx) => {
                              const { row, col, isStart, isFinish, isWall, isweight, weight } = node;
                              return (
                                  <Node
                                    onClick={onClick}
                                    key={nodeIdx}
                                    col={col}
                                    row={row}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall ? 1 : 0}
                                    count={node.count}
                                    prevNode={node.prevNode}
                                    weight = {weight}
                                    isweight = {isweight ? 1 : 0}
                                    g={0}
                                    h={0}
                                    f={0}
                                  >
                                  </Node>
                              );
                          })}
                      </div>
                  );
              })}
          </div>
    </div>
  );
}

export default App;
