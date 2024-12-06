import run from 'aocrunner'

interface InputReducer { rules: Record<string, Array<number>>, updates: Array<string[]> }

const parseInput = (rawInput: string) => rawInput

function part1(rawInput: string) {
  const input = parseInput(rawInput)

  const { rules, updates } = parseData(input)

  const sortedUpdates = sortUpdates(rules, updates)

  const { correctUpdates } = sortByUpdateType(updates, sortedUpdates)

  return sumMiddle(correctUpdates)
}

function part2(rawInput: string) {
  const input = parseInput(rawInput)

  const { rules, updates } = parseData(input)

  const sortedUpdates = sortUpdates(rules, updates)

  const { modifiedUpdates } = sortByUpdateType(updates, sortedUpdates)

  return sumMiddle(modifiedUpdates)
}

function parseData(input: string) {
  return input.split('\n').reduce<InputReducer>((acc, line) => {
    if (/\|/.test(line)) {
      const [page, rule] = line.split('|')

      if (!Object.keys(acc.rules).includes(page))
        acc.rules[page] = []

      acc.rules[page].push(Number.parseInt(rule))
    }

    if (/,/.test(line))
      acc.updates.push(line.split(','))

    return acc
  }, { rules: {}, updates: [] })
}

function sortUpdates(
  rules: ReturnType<typeof parseData>['rules'],
  updates: ReturnType<typeof parseData>['updates'],
) {
  const sortedUpdates: number[][] = []

  // sort update according to rules
  updates.forEach((u) => {
    const sorted: number[] = []

    u.forEach((page) => {
      if (!sorted.length) {
        sorted.push(Number.parseInt(page))
        return
      }

      // if no rules for sorted pages, add to end
      if (!rules?.[page] || !rules[page]?.some(r => sorted.includes(r))) {
        sorted.push(Number.parseInt(page))
        return
      }

      // page has valid rule
      for (let i = 0; i < sorted.length; i++) {
        if (!rules[page].includes(sorted[i]))
          continue

        sorted.splice(i, 0, Number.parseInt(page))
        break
      }
    })

    sortedUpdates.push(sorted)
  })

  return sortedUpdates
}

function sortByUpdateType(updates: string[][], sortedUpdates: number[][]) {
  return sortedUpdates.reduce((acc, u, i) => {
    if (u.every((n, j) => n === Number.parseInt(updates[i][j]))) {
      acc.correctUpdates.push(u)
      return acc
    }

    acc.modifiedUpdates.push(u)

    return acc
  }, { correctUpdates: [], modifiedUpdates: [] } as Record<string, number[][]>)
}

function sumMiddle(updates: number[][]) {
  return updates.reduce((acc, u) => acc += u[Math.floor(u.length / 2)], 0)
}

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
