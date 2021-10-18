const exp  = require("express")
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
    const requestUrl = new URL(url,`http://${ip}/${port}`);
    if (method === "GET"){
        let lang = requestUrl.searchParams.get('lang');
        url = requestUrl.pathname;

        if (lang==="zh"){
            lang = "_zh"
        }else{
            lang = ""
        }

        if (url === "/"){
            sendResponse(`index${lang}.html`,200, response);
        }else if(url === "/about.html"){
            sendResponse(`about${lang}.html`,200,response);
        }else if(url === "/login.html"){
            sendResponse(`login${lang}.html`,200,response);
        }else if(url === "/login-success.html"){
            sendResponse(`login-success${lang}.html`,200,response);
        }else if(url === "/login-fail.html"){
            sendResponse(`login-fail${lang}.html`,200,response);
        }else{
            sendResponse(`404${lang}.html`,404, response);
        }
    }
    else{
        if(url === "/process-login"){
            let body= [];
            //創立監聽器 1
            request.on("data" , (chunk)=>{
                body.push(chunk);
            });
            //創立監聽器 2
            request.on("end",()=>{
                //body = Buffer.concat(body).toString();
                body = Buffer.concat(body).toString("utf8");
                //body = qs.parse(body);
                console.log(body);
            });
        }
    }
})

// server listing

server.listen(port,ip, () =>{
    console.log(`server is running ${ip}:${port}`);
})
