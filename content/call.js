const obj = {
  num: 2
}
const addToThis = function (a, b, c) {
  return this.num + a + b + c
}
const arr = [1,2,3]

const bound = addToThis.bind(obj)

console.log(bound(...arr));