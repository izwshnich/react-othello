import * as React from 'react'
import { useCallback, useState } from 'react'

interface IProps {
  x: number,
  y: number,
  stone: null | 'white' | 'black',
  checkSelectable: (x: number, y: number) => boolean | undefined,
  handleClick: (e: React.MouseEvent) => void,
  current: null | 'white' | 'black'
}

const getTableCellStyle = (selectable: boolean | undefined) => ({
  display: 'table-cell',
  width: '12.5%',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: selectable ? 'red' : 'black',
  paddingTop: '12.5%',
  fontSize: '0',
  backgroundColor: 'green',
  position: 'relative' as React.CSSProperties['position'],
})

const getStoneStyle = (stone: string) => ({
  backgroundColor: stone,
  width: '100%',
  height: '100%',
  position: 'absolute' as React.CSSProperties['position'],
  left: 0,
  top: 0,
  borderRadius: '50%',
})

const Cell: React.FC<IProps> = ({ x, y, stone, checkSelectable, handleClick, current }) => {
  const [showSelectable, setShowSelectable] = useState(false)
  const handleMouseEnter = () => setShowSelectable(true)
  const handleMouseLeave = () => setShowSelectable(false)
  const selectable = useCallback(
    (x, y) => {
      return checkSelectable(x, y)
    },
    [current]
  )

  return (
    <div
      style={{ ...getTableCellStyle(showSelectable && !stone ? selectable(x, y) : undefined) }}
      data-stone={stone}
      data-x={x}
      data-y={y}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}>
      {stone && <div style={{ ...getStoneStyle(stone) }}/>}
    </div>
  )
}

export default Cell