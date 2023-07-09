import React from 'react';
import '../Styles/Node.css';

export default function Node({col,row, isStart, isFinish, count, g, h, f, isWall, parent, onClick, isweight, weight}) {
    const extraClassName = isFinish ? 'node-finish' :
    isStart ? 'node-start' :
    isweight ? 'node-weight' :
    isWall ? 'node-wall' : 
    ''
  return (
    <div onClick={() => onClick(row, col)}  className={`node ${extraClassName}`} id = {count} isWall = {isWall} col = {col}  row = {row} g = {g} h = {h} f = {f} parent = {parent} weight = {weight} isweight = {isweight}> </div>
  )
}
