import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

type Guard = typeof GUARD[number]
const GUARD = ['^', '<', '>', 'v'] as const

function part1(rawInput: string) {
  const input = parseInput(rawInput)

  const grid = generateGrid(input)
  const startPos = findGuard(grid)

  const dir = startPos.dir
  let x = startPos.x
  let y = startPos.y
  let onMap = true
  const gridMap = [...grid]
  const visited = new Set<number>()

  while (onMap) {
    gridMap[y][x] = 'X'

    if (!onMap) {
      visited.add(Number.parseInt(`${x}${y}`))
      break
    }

    const { nextX, nextY, nextDir, onMap: isOnMap } = move(x, y, dir, grid, onMap)

    onMap = isOnMap

    if (onMap) {
      const hash = Number.parseInt(`${x}${y}`)
      visited.add(hash)
      x = nextX
      y = nextY
      dir[0] = nextDir![0]
      dir[1] = nextDir![1]
    }
  }
  return visited.size + 1
}

function part2(rawInput: string) {
  const input = parseInput(rawInput)
}

function generateGrid(input: string) {
  return input.split('\n').map(r => r.split(''))
}

function findGuard(grid: string[][]) {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]

    for (let x = 0; x < row.length; x++) {
      const char = grid[y][x]

      if (GUARD.includes(char as Guard))
        return { dir: getDirection(char as Guard), x, y }
    }
  }

  throw new Error('No guard')
}

type GuardDir = [number, number]

function getDirection(guard: Guard) {
  const direction: GuardDir = [0, 0]

  if (guard === '^')
    direction[1] = 1
  else if (guard === '>')
    direction[0] = 1
  else if (guard === 'v')
    direction[1] = -1
  else if (guard === '<')
    direction[0] = -1

  return direction
}

function getNextPos(x: number, y: number, dir: GuardDir) {
  const [xDir, yDir] = dir

  if (xDir < 0)
    return [x - 1, y]
  else if (xDir > 0)
    return [x + 1, y]
  else if (yDir < 0)
    return [x, y + 1]
  else if (yDir > 0)
    return [x, y - 1]
  else
    throw new Error('Guards dead')
}

function move(x: number, y: number, dir: GuardDir, grid: string[][], onMap: boolean) {
  const [nextX, nextY] = getNextPos(x, y, dir)
  if (
    (nextX < 0 || nextX > grid[0].length - 1)
    || (nextY < 0 || nextY > grid.length - 1)
  ) {
    console.log('Guard has left he building at:', nextX, nextY)
    onMap = false
    return { onMap, dir, nextX, nextY }
  }

  if (grid[nextY][nextX] === '#') {
    console.log('hit obstacle at: ', nextX, nextY)
    const newDir = turn(dir)
    return move(x, y, newDir, grid, onMap)
  }

  return { nextX, nextY, nextDir: dir, onMap }
}

function turn(dir: GuardDir) {
  const [xDir, yDir] = dir
  const newDir = [...dir] as GuardDir

  if (!xDir) {
    newDir[1] = 0

    if (yDir > 0)
      newDir[0] = 1
    else
      newDir[0] = -1

    return newDir
  }

  if (!yDir) {
    newDir[0] = 0

    if (xDir > 0)
      newDir[1] = -1
    else
      newDir[1] = 1

    return newDir
  }

  throw new Error('Guards Dead')
}

run({
  part1: {
    tests: [
//       {
//         input: `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`,
//         expected: 41,
//       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
