const http = require("http");
const fs = require("fs")
const ip = "127.0.0.1";
const port = 3000;


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
    const method = request.method;
    let url =  request.url;
    if (method === "GET"){
        const requestUrl = new URL(url,`http://${ip}/${port}`);
        let lang = requestUrl.searchParams.get('lang');
        url = requestUrl.pathname;

        if (lang===""|lang==="en"){
            lang = ""
        }else{
            lang = `_${lang}`
        }

        if (url === "/"){
            sendResponse(`index${lang}.html`,200, response);
        }else if(pathname === "/about.html"){
            sendResponse(`about${lang}.html`,200,response);
        }else{
            sendResponse(`404${lang}.html`,404, response);
        }
    }
})

// server listing

server.listen(port,ip, () =>{
    console.log(`server is running ${ip}:${port}`);
})
