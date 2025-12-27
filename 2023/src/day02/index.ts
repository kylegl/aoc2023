import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const games = input.split('\n')

  const possibleGameIds = []

  gameloop: for (let i = 0; i < games.length; i++) {
    const g = games[i]

    const [header, rawRounds] = g.split(': ') 
  
    // get games # of pulled types cubes
    const rounds = rawRounds.split('; ')

    for (let j = 0; j < rounds.length; j++) {
      const r = rounds[j]

      const gameTotals = r.split(', ').reduce((total, rawCubes) => {
        const [num, type] = rawCubes.split(' ')

        total[type as keyof typeof total] = parseInt(num)
        total.total += parseInt(num)

        return total
      }, { red: 0, green: 0, blue: 0, total: 0 })
      
      if (gameTotals.total > 39) {
        continue gameloop
      }

      const gameTotalsArr = Object.entries(gameTotals)

      for (let k = 0; k < gameTotalsArr.length; k++) {
        const [type, total] = gameTotalsArr[k]

        if (total > cubes[type as keyof typeof cubes]) {
          continue gameloop
        }
      }
    }

    possibleGameIds.push(parseInt(header.split(' ')[1]))
  }

  return possibleGameIds.reduce((total, id) => total + id, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    const games = input.split('\n')

  const gamePowers = []

  gameloop: for (let i = 0; i < games.length; i++) {
    const g = games[i]

    const max = {
      red: 0,
      green: 0,
      blue: 0,
    }

    const [, rawRounds] = g.split(': ') 
  
    const rounds = rawRounds.split('; ')

    for (let j = 0; j < rounds.length; j++) {
      const r = rounds[j]

      const gameTotals = r.split(', ').reduce((total, rawCubes) => {
        const [num, type] = rawCubes.split(' ')

        total[type as keyof typeof total] = parseInt(num)
        total.total += parseInt(num)

        return total
      }, { red: 0, green: 0, blue: 0, total: 0 })
      
      const gameTotalsArr = Object.entries(gameTotals)

      for (let k = 0; k < gameTotalsArr.length; k++) {
        const [type, total] = gameTotalsArr[k]

        if (total > max[type as keyof typeof cubes]) {
          max[type as keyof typeof cubes] = total
        }
      }

    }
    gamePowers.push(Object.values(max).reduce((a, b) => a * b, 1))
  }

  return gamePowers.reduce((total, power) => total + power, 0)
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
