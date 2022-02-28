const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{
    //lodash
    let i = _.random(0,20);
    console.log(i);
    res.setHeader('Content-Type','text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.setHeader('Location','/about');
            res.statusCode = 301;
            res.end();
            break;
        default :
            path += '404.html';
            res.statusCode = 404;
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
           // res.write(data);
            res.end(data);
        }
    })
})


server.listen(3000,'localhost',()=>{
    console.log('listening to requests on port 3000');
})
