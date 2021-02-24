const express = require('express');
const jwt = require('jsonwebtoken');
const cookpars = require('cookie-parser');
const app = express();
app.use(cookpars());
app.get("/api",(req,res)=>{
	res.json({
		"msg":"welcome"
	});
});

app.get("/api/login",(req,res)=>{
	const user = {
		id : 1,
		name : "naina",
		email : "rw@rw.com"
	}
	jwt.sign({user},"naina",(err,tk)=>{
		res.cookie("token",tk);
		res.end();
	});
});

app.get("/api/posts",verifyTk,(req,res)=>{
	jwt.verify(req.token,"naina",(err,authData)=>{
		if(err){
			res.sendStatus(403);
		}else{
			res.json({
				msg:'Posted',
				authData
			});
		}
	});
});

function verifyTk(req,res,next){
	const bearerHeader = req.cookies;
//	console.log(req.cookies);
//	const bearerHeader = req.headers["authorization"];
	if(typeof(bearerHeader) !== 'undefined'){
	//	const bearer = bearerHeader.split(" ");
	//	const bearerToken = bearer[1];
		req.token = bearerHeader.token;
		next();
	}else{
		res.sendStatus(403);
	}
}

app.listen(1604,()=>console.log(`App started at 1604`));
