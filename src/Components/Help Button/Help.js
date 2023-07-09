import React, { useState } from 'react'
import './Help.css'
export default function Help() {

    const [display, setDisplay] = useState('none');

    const toggleDisplay = () => {
        if (display === 'none'){
            setDisplay('block');
        }
        else{
            setDisplay('none')
        }
    }
  return (
    <div>
        <button onClick={() => toggleDisplay()} className='help-btn'>
            Help
        </button>
        
        <div className='tutorial' style={{display: display}}>
            <h2> Algorithms: </h2>
                <p>
                    Click the "Algorithms" button to display the list of algorithms to choose from. 
                    Click one of those to watch the start node visit all nodes until it reaches the goal. 
                    If the goal is found, the shortest path with be visualized. If not, just visited nodes will be displayed
                </p>
            <h2> Mazes: </h2>
                <p>
                    Click the "Mazes" button to display a list of maze algorithms to run. 
                    It will create walls throughout the grid, and preferably leaves a path from the start to goal node
                </p>
            <h2> Clear Board: </h2>
                <p> 
                    Clearing the board will bring it back to its normal state, with no walls, weights, or paths 
                </p>
            <h2>Add weights: </h2>
            <p> 
                Adding weights will affect the <bold>cost</bold> to get to a node. 
                By default the cost to get to a node is 1, 
                but clickng this randomly selects nodes to have a cost between 2 and 6 
            </p>
            <button onClick={() => toggleDisplay()} className='close-btn'> Close </button>
        </div>
        
    </div>
  )
}
