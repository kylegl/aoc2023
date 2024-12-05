import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

interface Location { value: string, idx: number }

function part1(rawInput: string) {
  const input = parseInput(rawInput)

  // the start of any xmas is x.

  // there are 8 potential directions the string xmas can occur

  // find the index of every x and check each one for each direction

  const rows = input.split('\n').map(r => r.split(''))

  const log: { [key: number]: { [key: number]: any } } = {}

  const res = rows.reduce((acc, row, i) => {
    const xLocations = getRowCharLocations('X', row)
    log[i] = {}

    const total = xLocations.reduce((rowSum, loc) => {
      // x check
      const { total: xTotal, log: xLog } = checkHorizontal(loc, row)

      rowSum += xTotal

      // y check
      const upStartIdx = i - 3 > 0 ? i - 3 : 0

      const { total: yTotal, log: yLog } = checkVertical(
        loc,
        rows.slice(upStartIdx, i),
        rows.slice(i + 1, i + 4),
      )

      rowSum += yTotal

      log[i][loc.idx] = { ...xLog, ...yLog }

      return rowSum
    }, 0)

    acc.total += total

    return acc
  }, { total: 0 })

  return res.total
}

function checkHorizontal(x: Location, row: Array<string>) {
  let total = 0
  const log = generateLog(x.idx, ['forward', 'backward'])

  const forward = row.slice(x.idx, x.idx + 4).join('')
  log.forward.word = forward

  if (forward === 'XMAS') {
    log.forward.isXmas = true
    total += 1
  }

  const backwardStartIdx = x.idx - 3

  if (backwardStartIdx < 0)
    log.backward.impossible = true

  if (!log.backward.impossible) {
    const backward = row.slice(backwardStartIdx, x.idx + 1).join('')
    log.backward.word = backward

    if (backward === 'SAMX') {
      log.backward.isXmas = true
      total += 1
    }
  }

  return { total, log }
}

function checkVertical(
  x: Location,
  prevRows: Array<Array<string>>,
  nextRows: Array<Array<string>>,
) {
  const log = generateLog(x.idx, ['upWord', 'downWord', 'upDiagLeft', 'upDiagRight', 'downDiagLeft', 'downDiagRight'])
  let total = 0

  // check up
  if (prevRows.length >= 3) {
    let idxOffset = 4

    const up = prevRows.reduce((acc, r) => {
      idxOffset -= 1
      const up = r[x.idx]

      const left = r[x.idx - idxOffset]
      const right = r[x.idx + idxOffset]

      acc.up.push(up)
      acc.left.push(left)
      acc.right.push(right)

      return acc
    }, { up: [], left: [], right: [] } as Record<string, Array<string>>)

    const upWord = `X${up.up.reverse().join('')}`
    const upDiagLeftWord = `X${up.left.reverse().join('')}`
    const upDiagRightWord = `X${up.right.reverse().join('')}`

    log.upWord.word = upWord
    log.upDiagLeft.word = upDiagLeftWord
    log.upDiagRight.word = upDiagRightWord

    if (upWord === 'XMAS') {
      log.upWord.isXmas = true
      total += 1
    }

    if (upDiagLeftWord === 'XMAS') {
      log.upDiagLeft.isXmas = true
      total += 1
    }

    if (upDiagRightWord === 'XMAS') {
      log.upDiagRight.isXmas = true
      total += 1
    }
  }
  else {
    log.upWord.impossible = true
  }

  // check down
  if (nextRows.length >= 3) {
    let idxOffset = 0

    const down = nextRows.reduce((acc, r) => {
      idxOffset += 1
      const up = r[x.idx]

      const left = r[x.idx - idxOffset]
      const right = r[x.idx + idxOffset]

      acc.down.push(up)
      acc.left.push(left)
      acc.right.push(right)

      return acc
    }, { down: [], left: [], right: [] } as Record<string, Array<string>>)

    const downWord = `X${down.down.join('')}`
    const downDiagLeftWord = `X${down.left.join('')}`
    const downDiagRightWord = `X${down.right.join('')}`

    log.downWord.word = downWord
    log.downDiagLeft.word = downDiagLeftWord
    log.downDiagRight.word = downDiagRightWord

    if (downWord === 'XMAS') {
      log.downWord.isXmas = true
      total += 1
    }

    if (downDiagLeftWord === 'XMAS') {
      log.downDiagLeft.isXmas = true
      total += 1
    }

    if (downDiagRightWord === 'XMAS') {
      log.downDiagRight.isXmas = true
      total += 1
    }
  }
  else {
    log.downWord.impossible = true
  }

  return { total, log }
}

function getRowCharLocations(char: string, row: Array<string>) {
  const charLocations = [] as Location[]

  for (let i = 0; i < row.length; i++) {
    if (row[i] !== char)
      continue

    charLocations.push({ value: char, idx: i })
  }

  return charLocations
}

function generateLog(xIdx: number, properties: Array<string>) {
  const propMeta = {
    word: '',
    xIdx,
    isXmas: false,
    impossible: false,
  }

  const log: Record<string, typeof propMeta> = {}

  properties.forEach(p => log[p] = propMeta)
  return log
}

function part2(rawInput: string) {
  const input = parseInput(rawInput)

  const rows = input.split('\n').map(r => r.split(''))

  return rows.reduce((grandTotal, row, i) => {
    const mLocations = getRowCharLocations('A', row)
    const prevRowStartIdx = i - 1 < 0 ? 0 : i - 1
    const prevRow = i > 0 ? rows[prevRowStartIdx] : undefined
    const nextRow = i < rows.length - 1 ? rows[i + 1] : undefined

    grandTotal += mLocations.reduce((total, loc) => {
      let downRight = 'A'
      let upRight = 'A'

      // need to track diag dr & diag
      if (prevRow) {
        downRight = prevRow[loc.idx - 1] + downRight
        upRight += prevRow[loc.idx + 1]
      }

      if (nextRow) {
        upRight = nextRow[loc.idx - 1] + upRight
        downRight += nextRow[loc.idx + 1]
      }

      if (
        (downRight === 'MAS' || downRight === 'SAM')
        && (upRight === 'MAS' || upRight === 'SAM')
      )
        total += 1

      return total
    }, 0)

    return grandTotal
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
