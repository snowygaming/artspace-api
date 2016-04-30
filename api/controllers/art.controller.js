

import artService from './../service/art.service';
import log from './../../lib/logger';

var config = require('config');

module.exports.GET = GET;
module.exports.GET_ID = GET_ID;
module.exports.POST = POST;
module.exports.DELETE_ID = DELETE_ID;
module.exports.PUT_ID = PUT_ID;

async function GET(req,res){

  var filters = {};
  var fields = "";
  var limit = config.art_limit;

  if(req.query.limit != undefined || req.query.limit != null){
    limit = req.query.limit;
    if(limit < 0 || limit > config.art_limit){
      limit = config.art_limit
    }
  }

  if(req.query.filter != undefined){
    try{
      filters = JSON.parse(req.query.filter);
    }catch (err){
      log.error(err);
      res.status(400).send({ error: 'Fire in the hole' });
    }
  }

  if(req.query.fields != undefined)
    fields = req.query.fields.replace(/,/g, " ");


  try{
    var body = await artService.getAll(Number(limit),filters,fields);
    return res.json(body);
  }catch (err){
    log.error(err);
    return res.status(500).send({ error: 'Fire in the hole' });
  }
}

async function GET_ID(req,res){
  
  var fields = "";
  var id = "";

  id = req.swagger.params.id.value;

  try{
    var body = await artService.getById(id);
    return res.json(body);
  }catch (err){
    log.error(err);
    return res.status(500).send({ error: 'Fire in the hole' });
  }
}

async function POST(req,res){
  
  try{
    var body = await artService.create(req);
    return res.json(body);
  }catch (err){
    log.error(err);
    return res.status(500).send({ error: 'Fire in the hole' });
  }
}

async function DELETE_ID(req,res){
  
  var id = "";

  id = req.swagger.params.id.value;

  try{
    var body = await artService.deleteById(id);
    return res.json(body);
  }catch (err){
    log.error(err);
    return res.status(500).send({ error: 'Fire in the hole' });
  }
}


async function PUT_ID(req,res){

  var id = "";

  id = req.swagger.params.id.value;


  log.info(id);

  try{
    var body = await artService.updateById(id, req);
    return res.json(body);
  }catch (err){
    log.error(err);
    return res.status(500).send({ error: 'Fire in the hole' });
  }
}
