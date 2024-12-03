import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput
const MAX_DELTA = 3

// TODO: check edge cases.
// - trend flips between 1st & 3rd
// - is there an edge case with the last level?
function part1(rawInput: string) {
  const input = parseInput(rawInput)
  const rows = input.split('\n')

  const safeRows = rows.filter((r) => {
    const nums = r.split(' ')

    let reportTrendDir = 0
    let isValid = false

    for (let i = 0; i < nums.length - 1; i++) {
      const currLevel = Number.parseInt(nums[i])
      const nextLevel = Number.parseInt(nums[i + 1])

      const { valid, trendDir } = isValidLevel(currLevel, nextLevel, reportTrendDir)

      if (!valid) {
        isValid = false
        break
      }

      isValid = true

      if (!reportTrendDir)
        reportTrendDir = trendDir
    }

    if (!isValid) {
      // check list with each index removed seperately.
      for (let i = 0; i < nums.length; i++) {
        const newReport = [...nums]
        newReport.splice(i, 1)

        let isNewReportValid = false
        let reportTrendDir = 0

        for (let j = 0; j < newReport.length - 1; j++) {
          const currLevel = Number.parseInt(newReport[j])
          const nextLevel = Number.parseInt(newReport[j + 1])

          const { valid, trendDir } = isValidLevel(currLevel, nextLevel, reportTrendDir)

          if (!valid) {
            isNewReportValid = false
            break
          }

          if (!reportTrendDir)
            reportTrendDir = trendDir

          isNewReportValid = true
        }

        if (isNewReportValid) {
          isValid = true
          break
        }
      }
    }

    return isValid
  })

  return safeRows.length
}

function isValidLevel(
  a: number,
  b: number,
  reportTrendDir: number,
) {
  const result: { valid: boolean, trendDir: number } = {
    valid: false,
    trendDir: 0,
  }

  const delta = a - b

  // if no change, its bad
  if (!delta)
    return result

  // determin level trend direction
  const trendDir = Math.sign(delta)

  if (
    Math.abs(delta) > MAX_DELTA // delta exceeds max
    || (reportTrendDir && (trendDir !== reportTrendDir)) // curr trend =! prev trend
  )
    return result

  result.valid = true
  result.trendDir = trendDir

  return result
}

function part2(rawInput: string) {
  const input = parseInput(rawInput)

  // didn't separate these out. oops part 2 is above.
}

const valid = `1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
7 6 4 2 1
3 2 4 5 6
71 72 73 76 79 76
32 34 31 30 29 28 25 23
38 35 35 33 30
48 49 52 55 58 59 62 67
16 13 11 10 7 5 8
15 18 21 24 27 29 32
63 60 57 55 54 52 51
15 17 18 19 22 25 26 27
86 83 80 78 76 73 70 68
`

const invalid = `1 2 3 10 11
11 11 14 14 14
6 6 9 12 12 13 14 18
29 29 30 32 35 37 44 46
42 42 45 47 48 51 57 57
84 88 91 92 89 92 94 92
57 57 60 65 69
5 5 5 7 9 14
98 91 90 89 87 86 89 83
47 43 45 43 41 40 38 39
76 72 68 66 65 65
1 4 6 7 11 12 16
66 66 69 68 70
52 50 47 47 47
12 10 11 14 18 20 21 22
71 71 75 77 81
1 2 7 8 9
9 7 6 2 1
45 51 52 52 54
28 34 36 38 38 36
12 15 11 9 5
36 33 36 37 41 43 46 43
91 90 86 83 80 77
48 55 61 63 64 66 65
26 26 31 32 34 41
58 57 50 48 46 42
23 19 18 16 17
`

run({
  part1: {
    tests: [
      {
        // added first two lines to problem test data, both safe
        input: valid + invalid,
        expected: 14,
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
