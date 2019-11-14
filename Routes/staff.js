let express = require('express');
var app = require('express').Router();
let path = require('path');
app.use(express.json())

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var receipts = require('../Models/receiptSchema');

var auth = require('../MiddleWares/auth');

app.get('/addReceipts',auth, function(req,res) {
	res.render('addReceipts');
})

app.post('/addnewreceipt',auth, function(req,res) {
  receipts.create(req.body,function(error,result)
  {
        if(error)
        throw error;
        else{}
  })         
  res.send("data saved");
})

module.exports = app;