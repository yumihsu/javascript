const http = require("http");
const fs = require("fs")
//判斷網頁狀況  如果有readFile找不到的頁面會顯示error 500
const sendResponse = (filename ,statusCode, response)=>{
    fs.readFile(`./html/${filename}`,(error,data)=>{
        if(error){
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Sorry Internet Error");
        }else{
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        }
    })
}

//server path
const server = http.createServer((request,response) => {
    console.log(request.url,":::",request.method);

    const method = request.method;
    const url =  request.url;

    if (method === "GET"){
        if (url === "/"){
            sendResponse("index.html",200, response);
        }else if(url === "/about.html"){
            sendResponse("about.html",200,response);
        }else{
            sendResponse("404.html",404, response);
        }
    }else{
    }
});

// server listing
const ip = "127.0.0.1";
const port = 3000;

server.listen(port,ip, () =>{
    console.log(`server is running ${ip}:${port}`);
})
