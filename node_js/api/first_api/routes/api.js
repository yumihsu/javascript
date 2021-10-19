var express = require('express');
var router = express.Router();

const data = [
    {
      id: 11,
      name:"1a"
    },
    { id: 12,
      name:"1b"
    },
    {
      id: 13,
      name:"1c"
    },
    {
      id: 21,
      name:"2a"
    },
    { id: 22,
      name:"2b"
    },
    {
      id: 23,
      name:"2c"
    }

]


/* GET all . */
router.get('/products', function(req, res, next) {
  res.send({
    success:true,
    //"data" :data 下面是簡短寫法
    data
  })
  res.end();
});


 /* GET one data. */
router.get('/products/:id', function(req, res, next) {
  const id = req.params.id;
  return_data = data[id]
  res.send({
    success:true,
    id:id,
    return_data
  });
  res.end();
});

/* POST add and sorted . */
router.post('/products', function(req, res, next) {
  let reqBody = req.body
  let dataLength = data.length
  let index = 0
  let sendBool = false;
  let because =""
  for(var i = 0; i<dataLength ; i++){
    if(data[i].id>reqBody.id){
      break;
    }else if(i==dataLength){
      index=dataLength+1
    }else if(data[i].id==reqBody.id){
      because ="id is exsist"
      break;
    }
    index+=1
  };
  if (because==""){
    try{data.splice(index,0,reqBody)
      sendBool = true;}
    catch(e){because = "insert error"}
  }

  console.log(data)
  if (sendBool){
    res.send({
      success:sendBool,
    })
    res.end();
  }else{
    res.send({
      success:false,
      because:because
    })
    res.end();
  }
});

/* DELETE all . */
router.delete('/products/:id', function(req, res, next) {
  let id = req.params.id
  let dataLength = data.length
  for(var i= 0; i < dataLength; i++){

      if (data[i].id == id){
        try{
          data.splice(i,1)
          res.send({
            success:true,
            delete_id:id,
          });
          res.end();
          }catch(e){}
      }else{
        res.send({
          success:false,
          notFoundId:id
        });
        res.end();
      }
  }
});

module.exports = router;
