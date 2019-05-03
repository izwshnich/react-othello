import { useState, useEffect, useMemo } from 'react'

type Cell = null | 'white' | 'black'
type Row = Cell[]
type Stones = Row[]

export function useStone() {
  const [current, setCurrent] = useState<Cell>('white')
  const [stones, setStones] = useState<Stones>([...Array(8)].map(_ => [...Array(8)].map(_ => null)))
  const [whiteStones, setWhiteStones] = useState(2)
  const [blackStones, setBlackStones] = useState(2)
  const [restOfStones, setRestOfStones] = useState(64)

  useEffect(() => initialize(), [])

  const initialize = () => {
    const tempStones = stones

    tempStones[3][3] = 'white'
    tempStones[3][4] = 'black'
    tempStones[4][3] = 'black'
    tempStones[4][4] = 'white'

    setStones(tempStones)
  }

  useEffect(() => {
    setWhiteStones(getCurrentCellsByType('white').length)
    setBlackStones(getCurrentCellsByType('black').length)
    setRestOfStones(getCurrentCellsByType(null).length)
  }, [current])

  const getCurrentCellsByType = (type: Cell) =>
    stones
      .map((row: Row) => row.filter(cell => cell === type))
      .reduce((prev, current) => prev.concat(current), [])

  useEffect(() => {
    if (restOfStones === 0 || whiteStones === 0 || blackStones === 0 ) {
      setCurrent(null)
    }
  }, [restOfStones])

  const getXYByType = (type: Cell) =>
    stones
      .map((row: Row, y: number) =>
        row
          .map((cell, x) => ({ x, y, type: cell }))
          .filter(obj => obj.type === type)
      )
      .reduce((prev, current) => prev.concat(current), [])

  const selectableCells = useMemo(() => getXYByType(null), [current])

  useEffect(() => {
    let selectable = false

    if (!selectableCells) return

    for (let i = selectableCells.length - 1; i >= 0; i--) {
      if (checkSelectable(selectableCells[i].x, selectableCells[i].y)) {
        selectable = true
        return
      }
    }

    if (!selectable && restOfStones !== 0) {
      handleSkip()
    }
  }, [restOfStones])

  const handleSkip = () => {
    setCurrent(current === 'white' ? 'black' : 'white')
  }

  const putStonesToTop = (x: number, y: number) => {
    const dest = checkTopStones(x, y)

    if (!dest) return

    const tempStones = stones

    if (typeof dest.y === 'number') {
      const offsetY = dest.y - y

      for (let i = offsetY; i <= 0; i++) {
        tempStones[y + i][x] = current
      }

      setStones(tempStones)
    }
  }

  const putStonesToTopRight = (x: number, y: number) => {
    const dest = checkTopRightStones(x, y)

    if (!dest) return

    const tempStones = stones

    if (typeof dest.x === 'number' && typeof dest.y === 'number') {
      const offsetX = dest.x - x
      const offsetY = dest.y - y
      let i = offsetX
      let j = offsetY

      while (i >= 0 && j <= 0) {
        tempStones[y + j][x + i] = current
        i--
        j++
      }

      setStones(tempStones)
    }
  }

  const putStonesToRight = (x: number, y: number) => {
    const dest = checkRightStones(x, y)
    
    if (!dest) return
    
    const tempStones = stones
    
    if (typeof dest.x === 'number') {
      const offsetX = dest.x - x

      for (let i = offsetX; i >= 0; i--) {
        tempStones[y][x + i] = current
      }

      setStones(tempStones)
    }
  }

  const putStonesToBottomRight = (x: number, y: number) => {
    const dest = checkBottomRightStones(x, y)
    
    if (!dest) return

    const tempStones = stones

    if (typeof dest.x === 'number' && typeof dest.y === 'number') {
      const offsetX = dest.x - x
      const offsetY = dest.y - y
      let i = offsetX
      let j = offsetY

      while (i >= 0 && j >= 0) {
        tempStones[y + j][x + i] = current
        i--
        j--
      }

      setStones(tempStones)
    }
  }

  const putStonesToBottom = (x: number, y: number) => {
    const dest = checkBottomStones(x, y)
    
    if (!dest) return

    const tempStones = stones

    if (typeof dest.y === 'number') {
      const offsetY = dest.y - y

      for (let i = offsetY; i >= 0; i--) {
        tempStones[y + i][x] = current
      }

      setStones(tempStones)
    }
  }

  const putStonesToBottomLeft = (x: number, y: number) => {
    const dest = checkBottomLeftStones(x, y)
    
    if (!dest) return

    const tempStones = stones

    if (typeof dest.x === 'number' && typeof dest.y === 'number') {
      const offsetX = dest.x - x
      const offsetY = dest.y - y
      let i = offsetX
      let j = offsetY

      while (i <= 0 && j >= 0) {
        tempStones[y + j][x + i] = current
        i++
        j--
      }

      setStones(tempStones)
    }
  }

  const putStonesToLeft = (x: number, y: number) => {
    const dest = checkLeftStones(x, y)
    
    if (!dest) return
    
    const tempStones = stones
    
    if (typeof dest.x === 'number') {
      const offsetX = dest.x - x

      for (let i = offsetX; i <= 0; i++) {
        tempStones[y][x + i] = current
      }

      setStones(tempStones)
    }
  }

  const putStonesToTopLeft = (x: number, y: number) => {
    const dest = checkTopLeftStones(x, y)
    
    if (!dest) return

    const tempStones = stones

    if (typeof dest.x === 'number' && typeof dest.y === 'number') {
      const offsetX = dest.x - x
      const offsetY = dest.y - y
      let i = offsetX
      let j = offsetY

      while (i <= 0 && j <= 0) {
        tempStones[y + j][x + i] = current
        i++
        j++
      }

      setStones(tempStones)
    }
  }

  const checkTopStones = (x: number, y: number) => {
    let i = 1

    while (y - i >= 0) {
      if (i === 1 && stones[y - i][x] === current) return false
      if (!stones[y - i][x]) return false

      if (stones[y - i][x] === current) {
        return {
          x,
          y: y - i,
        }
      }

      i++
    }
  }

  const checkTopRightStones = (x: number, y: number) => {
    let i = 1

    while (x + i <= 7 && y - i >= 0) {
      if (i === 1 && stones[y - i][x + i] === current) return false
      if (!stones[y - i][x + i]) return false

      if (stones[y - i][x + i] === current) {
        return {
          x: x + i,
          y: y - i,
        }
      }

      i++
    }
  }

  const checkRightStones = (x: number, y: number) => {
    let i = 1

    while (x + i <= 7) {
      if (i === 1 && stones[y][x + i] === current) return false
      if (!stones[y][x + i]) return false

      if (stones[y][x + i] === current) {
        return {
          x: x + i,
          y
        }
      }

      i++
    }
  }

  const checkBottomRightStones = (x: number, y: number) => {
    let i = 1

    while (x + i <= 7 && y + i <= 7) {
      if (i === 1 && stones[y + i][x + i] === current) return false
      if (!stones[y + i][x + i]) return false

      if (stones[y + i][x + i] === current) {
        return {
          x: x + i,
          y: y + i,
        }
      }

      i++
    }
  }

  const checkBottomStones = (x: number, y: number) => {
    let i = 1

    while (y + i <= 7) {
      if (i === 1 && stones[y + i][x] === current) return false
      if (!stones[y + i][x]) return false

      if (stones[y + i][x] === current) {
        return {
          x,
          y: y + i
        }
      }

      i++
    }
  }

  const checkBottomLeftStones = (x: number, y: number) => {
    let i = 1

    while (x - i >= 0 && y + i <= 7) {
      if (i === 1 && stones[y + i][x - i] === current) return false
      if (!stones[y + i][x - i]) return false

      if (stones[y + i][x - i] === current) {
        return {
          x: x - i,
          y: y + i,
        }
      }

      i++
    }
  }

  const checkLeftStones = (x: number, y: number) => {
    let i = 1

    while (x - i >= 0) {
      if (i === 1 && stones[y][x - i] === current) return false
      if (!stones[y][x - i]) return false

      if (stones[y][x - i] === current) {
        return {
          x: x - i,
          y
        }
      }

      i++
    }
  }

  const checkTopLeftStones = (x: number, y: number) => {
    let i = 1

    while (x - i >= 0 && y - i >= 0) {
      if (i === 1 && stones[y - i][x - i] === current) return false
      if (!stones[y - i][x - i]) return false

      if (stones[y - i][x - i] === current) {
        return {
          x: x - i,
          y: y - i,
        }
      }

      i++
    }
  }

  const checkSelectable = (x: number, y: number) => {
    if (
      checkTopStones(x, y) ||
      checkTopRightStones(x, y) ||
      checkRightStones(x, y) ||
      checkBottomRightStones(x, y) ||
      checkBottomStones(x, y) ||
      checkBottomLeftStones(x, y) ||
      checkLeftStones(x, y) ||
      checkTopLeftStones(x, y)
    ) {
      return true
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    const data = (e.target as HTMLElement).dataset

    if (data.x && data.y) {
      const x = parseInt(data.x, 10)
      const y = parseInt(data.y, 10)

      if (
        checkTopStones(x, y) ||
        checkTopRightStones(x, y) ||
        checkRightStones(x, y) ||
        checkBottomRightStones(x, y) ||
        checkBottomStones(x, y) ||
        checkBottomLeftStones(x, y) ||
        checkLeftStones(x, y) ||
        checkTopLeftStones(x, y)
      ) {
        putStonesToTop(x, y)
        putStonesToTopRight(x, y)
        putStonesToRight(x, y)
        putStonesToBottomRight(x, y)
        putStonesToBottom(x, y)
        putStonesToBottomLeft(x, y)
        putStonesToLeft(x, y)
        putStonesToTopLeft(x, y)
        setCurrent(current === 'white' ? 'black' : 'white')
      }
    }
  }

  return {
    current,
    stones,
    checkSelectable,
    handleClick,
    handleSkip,
    whiteStones,
    blackStones,
  }
}