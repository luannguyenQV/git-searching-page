export function parseSearchterm(searchString) {
  const rs = searchString.split('=')
  if (rs[0] === '?q' && rs[1]) {
    return rs[1]
  } else {
    return ''
  }
}