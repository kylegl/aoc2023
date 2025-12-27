import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

function part1(rawInput: string) {
  const input = parseInput(rawInput)

  const matches = [...input.matchAll(/(mul|do|don't)\((\d{1,3},\d{1,3}|)\)/g)]

  const contents = matches.map((m) => {
    if (m[1] === 'mul')
      return m[2]
    else if (m[1] === 'do' || m[1] === 'don\'t')
      return m[1]
  })

  const res = contents.reduce((acc, item) => {
    if (item === 'do') {
      acc.enabled = true
      return acc
    }

    if (item === 'don\'t') {
      acc.enabled = false
      return acc
    }

    if (!acc.enabled)
      return acc

    const [a, b] = item!.split(',')

    acc.sum += Number.parseInt(a) * Number.parseInt(b)

    return acc
  }, { sum: 0, enabled: true })

  return res.sum
}

function part2(rawInput: string) {
  const input = parseInput(rawInput)

  // oops i did it again. part 1 got transformed in to part 2
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
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
