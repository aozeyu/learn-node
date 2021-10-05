const string = "my name is cody"

const regex = /name is ([a-z]+)/;

const match = regex.exec(string)
console.log(match[1])