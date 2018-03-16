/**
 * Created by marcofalsitta on 16.03.18.
 * InterSides.net
 *
 */
'use strict';
let PythonShell = require('python-shell');
let cmd=require('node-cmd');

const express = require('express');
const app = express();

app.get('/', (req, res) =>{
  res.send('Hello World!')
});

app.get('/control-led', (req, res)=>{

  //PythonShell.run('~/led.py', {}, (err)=>{
  //  if (err) {
  //    //throw err
  //    res.json({msg:"could not complete because of an error", err:err});
  //  }
  //  else{
  //    res.json({msg:"command successful"});
  //
  //  }
  //});

  cmd.get(
    'sudo python ~/led.py',
    function(err, data, stderr){
      if(err){
        res.json({msg:"could not complete because of an error", err:err});
      }
      else{

        console.log('data is : ',data);
        console.log('stderr is : ',stderr);

        res.json({msg:"command successful", data:data});

      }
    }
  );


});

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!');
});