// game assets
const gameAssets = {
  tokens: {
    dog: {title: "The Scottie dog", available: true},
    hat: {title: "The top hat", available: true},
    thimble: {title: "The thimble", available: true},
    boot: {title: "The boot", available: true},
    wheelbarrow: {title: "The wheelbarrow", available: true},
    iron: {title: "The iron", available: true},
    car: {title: "The racing car", available: true},
    ship: {title: "The battleship", available: true},
  },
  banknotes: {
    1: "$1",
    5: "$5",
    10: "$10",
    20: "$20",
    50: "$50",
    100: "$100",
    500: "$500",
  },
  chances: {

  },
  chests: {

  },
  fields: {
    go: {
      name: "Go",
      cellID: "go",
    },
    cell_g9: {
      name: "Mediterranean Avenue",
      cellID: "cell_g9",
    },
    cell_g8: {
      name: "Community Chest",
      cellID: "cell_g8",
    },
    cell_g7: {
      name: "Baltic Avenue",
      cellID: "cell_g7",
    },
    cell_g6: {
      name: "Income Tax",
      cellID: "cell_g6",
    },
    cell_g5: {
      name: "Reading Railroad",
      cellID: "cell_g5",
    },
  }
}

const moneySet = {
  500: 2,
  100: 4,
  50: 1,
  20: 1,
  10: 2,
  5: 1,
  1: 5,
}

export { gameAssets, moneySet };