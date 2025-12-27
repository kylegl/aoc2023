import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

function part1(rawInput: string) {
  const input = parseInput(rawInput)

  console.log(input)
}

function part2(rawInput: string) {
  const input = parseInput(rawInput)
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
