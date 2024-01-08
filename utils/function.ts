const formatScore = (score: number) => {
  return score.toFixed(2)
}

const epsToString = (num: number) => {
    if (num < 10) return `00${num}`;
    else if (num < 100) return `0${num}`
    return `${num}`
  } 


export { formatScore, epsToString }