// console.log("hello world")
const data = require("./data")

function add(student) {
    data.push(student);
    return;  
}


add({id: 4, name: "sade", subject: "bio"})
console.log({ message: "Data before removal", data })

const remove = data.filter((student_data) => student_data.name !== "ade")

console.log({ message: "Data after removal", remove })

console.log("hello")