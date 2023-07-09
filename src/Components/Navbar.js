import React, { useState } from 'react';
import "../Styles/Navbar.css";
import { runBFS } from './Path Algorithms/BreadthFirstSearch';
import { runDFS } from './Path Algorithms/DepthFirstSearch';
import { runAStar } from './Path Algorithms/AStar';
import { runDijkstra } from './Path Algorithms/Dijkstra';
import Help from './Help Button/Help';


export default function Navbar({grid, adj, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, recursiveMaze, runRandomMaze, clearBoard, fillGridWithWeights}) {
    const [visibility, setVisibility] = useState('hidden');
    const [mazeVisibility, setMazeVisibility] = useState('hidden');
    
    const toggleVisibility = () => {
        if (visibility === 'hidden'){
            setVisibility('visible')
            setMazeVisibility('hidden')
        }
        else{
            setVisibility('hidden')
        }
    }

    const toggleMazeVisibility = () => {
        if (mazeVisibility === 'hidden') {
            setMazeVisibility('visible')
            setVisibility('hidden')
        }
        else {
            setMazeVisibility('hidden')
        }
    }

    const runAlgo = (name) => {
        switch (name){
            case "Dijkstra":
                runDijkstra(grid, adj, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW)
                toggleVisibility();
                break;
            case "Depth First Search":
                runDFS(grid, adj, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW)
                toggleVisibility();
                break;
            case "A Star":
                runAStar(grid, adj, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW)
                toggleVisibility();
                break;
            case "Breadth First Search":
                runBFS(grid, adj, START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW)
                toggleVisibility();
                break;
            default:
                break;
        }
    }

    const runMaze = (name) => {
        switch (name) {
            case "random":
                runRandomMaze(grid, adj, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL)
                toggleMazeVisibility();
                break;
            case "recursive":
                recursiveMaze(grid, adj)
                toggleMazeVisibility();
                break;
            default:
                break;
        }
    }

  return (
    
    <div className='nav-container'>
        <h3 className='title'>Searching Algorithms and Pathfinding</h3>
        
        <div className='btn-container'>
            <button className='show-drop-down' onClick={() => toggleVisibility()}>Algorithms</button>
            <button className='show-maze-menu' onClick={() => toggleMazeVisibility()}> Mazes </button>
            <button className='clear-board' onClick={() => clearBoard()}>Clear Board</button>
            <button className='generate-weights-btn' onClick={() => fillGridWithWeights(grid)}> Add Weights</button>
        </div>
        <Help/>
        
        <div className='drop-down-menu' style={{visibility: visibility}}> 
            <button className='algo-btn' value='Dijkstra' onClick={(e) => runAlgo(e.target.value)}> Dijkstra </button>
            <button value='A Star' className='algo-btn' onClick={(e) => runAlgo(e.target.value)}> A Star</button>
            <button value='Breadth First Search' className='algo-btn' onClick={(e) => runAlgo(e.target.value)}>Breadth First Search!</button>
            <button value='Depth First Search' className='algo-btn' onClick={(e) => runAlgo(e.target.value)}> Depth First Search!</button>
        </div>
          <div className='maze-drop-down-menu' style={{ visibility: mazeVisibility }}>
                <button className='maze-btn' value='random' onClick={(e) => runMaze(e.target.value)}> Simple Random Maze </button>
                <button className = 'maze-btn' value='recursive' onClick={(e) => runMaze(e.target.value)}> Recursive Maze! </button>
          </div>
            
       
    </div>
  )
}
