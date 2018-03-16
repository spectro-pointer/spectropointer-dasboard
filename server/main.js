/**
 * Created by marcofalsitta on 16.03.18.
 * InterSides.net
 *
 */
'use strict';
let PythonShell = require('python-shell');

const express = require('express');
const app = express();

app.get('/', (req, res) =>{
  res.send('Hello World!')
});

app.get('/control-led', (req, res)=>{

  PythonShell.run('~/led.py', {}, (err)=>{
    if (err) {
      //throw err
      res.json({msg:"could not complete because of an error", err:err});
    }
    else{
      res.json({msg:"command successful"});

    }
  });
});

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!');
});