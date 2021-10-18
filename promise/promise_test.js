// 如果import 有問題，先確認一下package.json內部是不是有設置tpye = module
import fetch from 'node-fetch';

//以promise進行建立異步
let send_bool = false;
let p = new Promise(function(resolve,reject) {
    if(send_bool){
        resolve("send resolve seccessed");
    }else{
        reject("send reject please try again");
    }
});

p
.then(function(message) {console.log(`promise resolved : ${message}`)})
//catch捕捉例外情況
.catch(function(message) {console.log(`promise rejected  : ${message}`)});


//建立fetch 並開發後續行為
let f = fetch("https://jsonplaceholder.typicode.com/users");

f
.then(function(data){
    return data.json();
    //可以return之後建立下一個then 參數會自動以return帶入到下一個function
})
.then(function(jsonData){
    console.log(`the respones is below ${Object.keys(jsonData[0])}`)
});