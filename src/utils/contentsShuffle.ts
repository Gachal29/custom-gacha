
export const contentsShuffle = (contents: Array<string>): Array<string> => {
  for (let i = (contents.length - 1); 0 < i; i--) {
    let r = Math.floor(Math.random() * (i + 1))

    let tmp = contents[i]
    contents[i] = contents[r]
    contents[r] = tmp
  }

  return contents
}
