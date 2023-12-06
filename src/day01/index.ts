import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const lines = input.split('\n')

  const parsedCalibrationCodes = lines.map(l => {
    const numChars = l.split('').filter(c => (/[0-9]/.test(c)))

    return numChars.length 
      ? numChars.length === 1
        ? parseInt(numChars[0] + numChars[0])
        : parseInt(numChars[0] + numChars.pop())
      : 0
  })

  return parsedCalibrationCodes.reduce((a, b) => a + b, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const lines = input.split('\n')

  const parsedCalibrationCodes = lines.map((l, i) => {
    const numTypeMatches = Array.from(
      l.matchAll(/(?=(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(\d))/g),
      (m) => m.filter(Boolean)
    ).flat()


    if (!numTypeMatches || !numTypeMatches.length)
      return 0

    const firstNumStr = convertNumWordToNumStr(numTypeMatches[0])

    return numTypeMatches.length === 1
        ? parseInt(firstNumStr + firstNumStr)
        : parseInt(firstNumStr + convertNumWordToNumStr(numTypeMatches.pop()))
  })

  return parsedCalibrationCodes.reduce((a, b) => a + b, 0)
}

/// HELPERS 
const numWordMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

function convertNumWordToNumStr(str?: string) {
  if (!str)
    return ''

  if (/[0-9]/.test(str))
    return str
  
  return numWordMap[str as keyof typeof numWordMap]
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
