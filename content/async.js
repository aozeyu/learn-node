const { readFile, writeFile } = require("fs");
const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)
// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// getText("./content/first.txt")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

const start = async () => {
  try {
    const first = await readFilePromise('./content/first.txt','utf-8')
    const second = await readFilePromise('./content/second.txt','utf-8')
    await writeFilePromise('./content/third.txt',`This is ${first} ${second}`)
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}
start()