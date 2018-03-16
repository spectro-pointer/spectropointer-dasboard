/**
 * Created by marcofalsitta on 16.03.18.
 * InterSides.net
 *
 */
'use strict';
let PythonShell = require('python-shell');
let cmd=require('node-cmd');
let SSH = require('simple-ssh');
let tunnel = require('tunnel-ssh');

const openSshTunnel = require('open-ssh-tunnel');


let ssh = new SSH({
  host: '10.10.2.2',
  user: 'pi',
  pass: 'manatee'
});

let tunnel_config = {
  username:'pi',
  Password:'manatee',
  host:'10.10.3.103',
  port:8003,
  dstHost:'10.10.2.2',
  dstPort:8003,
  localHost:'127.0.0.1',
  //localPort: 80
};



const express = require('express');
const app = express();

app.get('*', (req, res, next) =>{
  console.log('url: ', req.url);
  next();
});

app.get('/', (req, res) =>{
  res.send('Hello World!')
});

app.get('/busca-connect', (req, res)=>{

  //cmd.get(
  //  'ssh -L 8003:pi@10.10.2.2:8003 127.0.0.1',
  //  function(err, data, stderr){
  //    if(err){
  //      res.json({msg:"could not complete because of an error", err:err});
  //    }
  //    else{
  //
  //      console.log('data is : ',data);
  //      console.log('stderr is : ',stderr);
  //
  //      res.json({msg:"command successful", data:data});
  //
  //    }
  //  }
  //);

  //ssh.exec('sudo python ~/m.py', {
  //  out: (stdout)=>{
  //    //console.log(stdout);
  //    res.json({result:stdout});
  //  }
  //}).start();

  //tunnel(tunnel_config, function (error, server) {
  //  //....
  //  console.error(error);
  //  console.info("server:", server);
  //
  //
  //});


  //const openSshTunnel = require('open-ssh-tunnel');
  openATunnel().then((resolved)=>{
    console.log(resolved);
  }).catch(exc=>{
    console.error(exc);
  });

});

async function openATunnel() {
  const server = await openSshTunnel({
    host: '10.10.2.2',
    username: 'pi',
    password: 'manatee',
    srcPort: 8003,
    srcAddr: '127.0.0.1',
    dstPort: 8003,
    dstAddr: '10.10.3.103',
    readyTimeout: 1000,
    forwardTimeout: 1000,
    localPort: 8003,
    localAddr: '127.0.0.1'
  });

  // you can now connect to your
  // forwarded tcp port!

  console.log("opened!");

  // later, when you want to close the tunnel
  server.close();
}


app.get('/control-led2', (req, res)=>{

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

app.get('/busca', (req, res)=>{

  cmd.get(
    'sudo python ~/busca.py',
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

app.get('/control-led', (req, res)=>{

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