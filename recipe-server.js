const express=require("express")
// 라이브러리 로드
// 서버 생성
const app=express();
// 서버를 구동
/*
    bind() => IP,PORT를 연결 => 개통
    listen() => 대기 상태
    accept() => 클라이언트가 접속시에 처리
 */
app.listen(3355,()=>{
    console.log("Server Start...","http://localhost:3355")
})

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
// 클라이언트와 통신
// 사용자의 URI
// 몽고디비 연결
const Client=require("mongodb").MongoClient;
//MongoDB Connection
/*
      MongoClient mc=new MongoClient("localhost",27017)
      DB db=mc.getDB("mydb")
      DBCollection dbc=db.getCollection('recipe')
 */
// /recipe?page=1
app.get('/recipe',(request,response)=>{
    // request=사용자가 보내준 요청 정보 : page,id,pwd
    // 요청을 처리
    // 결과를 전송 ==> ,response
    var page=request.query.page;//request.getParameter("page")
    var rowSize=12;
    var skip=(page*rowSize)-rowSize;
    /*
       1page => skip=0
       2page => 12(버림) ==> 13
     */
    var url="mongodb://211.238.142.181:27017";//몽고디비 주소
    Client.connect(url,(err,client)=>{
        var db=client.db('mydb');
        // SELECT * FROM recipe  => find({})
        // SELECT * FROM recipe WHERE no=1 => find({no:1})
        // SELECT * FROM recipe WHERE title LIKE '%값%'
        // find({"title":{"$regex":".*"+값}}
        /*
             [{}
             {}
             {}
             {}]
             ...
         */
        db.collection('recipe').find({}).skip(skip).limit(rowSize)
            .toArray((err,docs)=>{
                // 요청한 사용자 => 데이터 전송
                response.json(docs);
                console.log(docs)
                client.close();
            })
    })
})









