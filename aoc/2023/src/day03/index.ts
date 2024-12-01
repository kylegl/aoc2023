import run from "aocrunner"

type LineNum = [startIdx: number, strNum: string]
type PartNum = number

type ParsedLine = {
  index: number
  symbols: number[]
  maybePartNums: LineNum[]
}

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const lines = input.split('\n')
  let partNums: PartNum[] = []
  const parsedLines = []

  // parse all lines for nums & symbols
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx].split('')

    const parsedLine: ParsedLine = {
      index: lineIdx,
      symbols: [],
      maybePartNums: [],
    }

    // loop through array & find symbols & numbers
    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx]

      if (isSymbol(char))
        parsedLine.symbols.push(charIdx)
      else if (isNum(char)) {
        const lastNum = parsedLine.maybePartNums[parsedLine.maybePartNums.length - 1]
        
        if (!lastNum) { 
          parsedLine.maybePartNums.push([charIdx, char])
          continue
        }
        
        // check if last num found's index is adjacent to current index
        if (charIdx > lastNum[0] && charIdx <= lastNum[0] + lastNum[1].length) {
          lastNum[1] += char
        }
        else {
          parsedLine.maybePartNums.push([charIdx, char])
        }
      }
    }

    // check for line for part nums
    const stillMaybePartNums = checkLineForPartNums(
      parsedLine.symbols,
      parsedLine.maybePartNums,
      partNums,
    )

    parsedLine.maybePartNums = stillMaybePartNums
    parsedLines.push(parsedLine)
  }

  // check line before and after for numbers at, before, and after for numbers.
  for (let parsedLineIdx = 0; parsedLineIdx < parsedLines.length; parsedLineIdx++) {
    const symbols = parsedLines[parsedLineIdx].symbols

    const prevLine = parsedLines[parsedLineIdx - 1]
    const nextLine = parsedLines[parsedLineIdx + 1]

    if (prevLine) 
      checkLineForPartNums(symbols, prevLine.maybePartNums, partNums)

    if (nextLine) { 
      const stillNotMaybePartNums = checkLineForPartNums(
        symbols,
        nextLine.maybePartNums,
        partNums,
      )

      nextLine.maybePartNums = stillNotMaybePartNums
    }
  }

  return partNums.reduce((a, b) => a + b, 0)
}

function checkLineForPartNums(
  symbols: number[],
  maybePartNums: LineNum[],
  partNums: PartNum[],
) {
  const _internalMaybePartNums: (LineNum | null)[] = [...maybePartNums]

  symbols.forEach((s) => {
    for (
        let maybePartNumIdx = 0;
        maybePartNumIdx < _internalMaybePartNums.length;
        maybePartNumIdx++
      ) {
      const maybePartNum = _internalMaybePartNums[maybePartNumIdx]
      
      if (!maybePartNum)
        continue
      


      if (!isPartNum(s, maybePartNum)) 
        continue
      
      _internalMaybePartNums.splice(maybePartNumIdx, 1, null)
      partNums.push(parseInt(maybePartNum[1]))
      }
    })
  
  return _internalMaybePartNums.filter(Boolean) as LineNum[]
}

function isSymbol(char: string) {
  if (/[^\w\s\d.]/.test(char))
    return true
      
  return false
}

function isNum(char: string) {
  if (/[0-9]/.test(char))
    return true
      
  return false
}

function isPartNum(symbol: number, maybePartNum: LineNum) {
  const numStart = maybePartNum[0]
  const numEnd = maybePartNum[0] + maybePartNum[1].length - 1
  if (
    numStart >= symbol - 1 && numStart <= symbol + 1
    || numEnd >= symbol - 1 && numEnd <= symbol + 1
  )
    return true

  return false
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [],
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
