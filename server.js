const http = require('http');
const url = require('url')
const data = require("./data")
const bodyParser = require("body-parser")
const PORT = 8000

const app = http.createServer((req, res) => {

    const parseUrl = url.parse(req.url, true)
    const pathname = parseUrl.pathname;
    const query = parseUrl.query;

    let body = "";

    req.on("data", chunk => {
        body += chunk;
    })

    res.setHeaders("Content-Type", "application/json");

    req.on("end", () => {
        
    if(pathname === "/hello" && req.method === "GET"){
        res.statusCode = 200;
        res.end(JSON.stringify({message: "hello world"}))
    }

    if(pathname === "/samuel" && req.method === "GET"){
        res.end("welcome to class")
    }

    if(pathname === "/data" && req.method === "GET"){
        res.end(JSON.stringify(data))
    }

    if(pathname === "/add" && req.method === "POST"){
      try {
        const addData = body ? JSON.parse(body) : {};
        const {name, subject} = addData;

        const newStudent = ({
            id: data.length + 1,
            name: name || "no data",
            subject: subject || "no data"
        })

        data.push(newStudent);
        res.end("student added sucessfully")
      } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({message: "Internal Server error", error}))
        console.error(error)
      }
     
    }

    if(pathname === "/update" && req.method === "PUT"){
      try {
        const id = Number(query.id);
        const studentIndex = data.findIndex(item => item.id === id);

        if(studentIndex === -1){
            res.end("Student Not Found")
            return;
        }

        data[studentIndex] = {
            ...data[studentIndex],
            name: query.name || "no data",
            subject: query.subject 
        }

        res.end("student updated successfully")
      } catch (error) {
        console.error(error)
        res.end({message: "server error", error})
      }

    }

    if (pathname === "/delete" && req.method === "DELETE") {
       try {
         const id = Number(query.id);
        const StudentIndex = data.findIndex(item => item.id === id);

        if(StudentIndex !== -1){
            data.splice(StudentIndex, 1);
             res.end(JSON.stringify(data))
            return;
        }else{
            res.end("Student Not Found")
        }

       } catch (error) {
        console.error(error)
       }
    }
    })

    res.statusCode = 404;
    res.end(JSON.stringify({message: "Not Found"}))

})

// app.use(bodyParser);

app.listen(PORT, () => {
    console.log(`server running ${PORT}`)
})