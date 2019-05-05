import * as React from 'react'
import { useStone } from '../hooks/useStone'
import Cell from './Cell'

const tableStyle = {
  display: 'table',
  border: '1px solid black',
  width: '100%',
  maxWidth: '640px'
}

const tableRowStyle = {
  display: 'table-row',
}

const scoreStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 'bold' as React.CSSProperties['fontWeight'],
  maxWidth: '640px',
}

const getPlayerStyle = (color: 'white' | 'black', current: null | 'white' | 'black') => ({
  borderWidth: '0 0 8px',
  borderStyle: 'solid',
  borderColor: color === current ? 'black' : 'transparent',
})

const Board = () => {
  const { current, stones, checkSelectable, putStones, whiteStones, blackStones } = useStone()

  return (
    <>
      <div style={{ ...scoreStyle }}>
        <p style={{ ...getPlayerStyle('white', current) }}>WHITE</p>
        <p>{whiteStones} | {blackStones}</p>
        <p style={{ ...getPlayerStyle('black', current) }}>BLACK</p>
      </div>

      <div style={{ ...tableStyle }}>
        {[...Array(8)].map((_, y) => (
          <div key={`row-${y}`} style={{ ...tableRowStyle }}>
            {[...Array(8)].map((_, x) => (
              <Cell
                key={`cell-${x}${y}`}
                x={x}
                y={y}
                stone={stones[y][x]}
                checkSelectable={checkSelectable}
                putStones={putStones} 
                current={current} />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Board