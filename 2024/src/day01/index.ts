import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const[listA, listB] = createLists(input)

  // get delta between numbers & sum

  const sum = listA.reduce((acc, num, i) => {
    const diff = num - listB[i]

    acc += Math.abs(diff)
    return acc
  }, 0)

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const [listA, listB] = createLists(input)

  // { num: #occurrences }
  const numberOccurrenceMap = new Map<number, number>()
  let similarityScore = 0

  listA.forEach(num => {
    if (numberOccurrenceMap.has(num)) {
      similarityScore += numberOccurrenceMap.get(num)!
      return
    }

    const occurrences = listB.filter(numB => numB === num).length
    
    const score = num * occurrences

    similarityScore += score
    numberOccurrenceMap.set(num, score)
  })

  return similarityScore
}

function createLists(input: string) {
  const listA: Array<number> = []
  const listB: Array<number> = []

  input.split('\n').forEach(l => {
    const [a, b] = l.split('   ')

    listA.push(parseInt(a))
    listB.push(parseInt(b))
  })

  listA.sort((a, b) => a - b)
  listB.sort((a, b) => a - b)

  return [listA, listB]
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
