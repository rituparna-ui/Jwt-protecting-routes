const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get("/api",(req,res)=>{
	res.json({
		"msg":"welcome"
	});
});

app.post("/api/login",(req,res)=>{
	const user = {
		id : 1,
		name : "Ritu",
		email : "rw@rw.com"
	}
	jwt.sign({user},"rituparna",(err,tk)=>{
		res.json({
			tk
		})
	});
});

app.post("/api/posts",verifyTk,(req,res)=>{
	jwt.verify(req.token,"rituparna",(err,authData)=>{
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
	const bearerHeader = req.headers["authorization"];
	if(typeof(bearerHeader) !== 'undefined'){
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	}else{
		res.sendStatus(403);
	}
}

app.listen(1604,()=>console.log(`App started at 1604`));
