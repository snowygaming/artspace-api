
'use strict';

import artistModel from './../../../artspace-api/api/models/artist.model.js';
import Promise from 'bluebird';
import log from './../../lib/logger';

async function getAll(limit,filters,fields){

    return new Promise(function(resolve,reject){
        artistModel.
        find(filters).
        sort({id: 'asc'}).
        select(fields).
        limit(limit).
        exec(function(err,result){
            if(err){
                reject(err) ;
            }else {
                resolve({
                    metadata: {
                        count: result.length,
                        limit: limit
                    },
                    results: result
                });
            }
        });
    });
}

async function getById(id){

    return new Promise(function(resolve,reject){
        artistModel.
        find({_id: id}).
        exec(function(err,result){
            if(err){
                reject(err);
            }else {
                resolve({
                    metadata: {
                        count:  result.length
                    },
                    results: result
                });
            }
        });
    });
}

async function create(req){

    return new Promise(function(resolve,reject){
        var art = new artistModel(req.body);

        art.
        save(function(err,result){
            if(err){
                reject(err);
            }else {
                resolve({
                    results: result
                });
            }
        });
    });
}

async function deleteById(id){

    return new Promise(function(resolve,reject){
        artistModel.
        findByIdAndRemove(id, function(err,result){
            if(err){
                reject(err);
            }else {
                resolve({
                    results: result
                });
            }
        });
    });
}

async function updateById(id, req){

    return new Promise(function(resolve,reject){
        artistModel.
        findByIdAndUpdate(id, req.body, {new: true}, function(err,result){
            if(err){
                reject(err);
            }else {
                resolve({
                    results: result
                });
            }
        });
    });
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.updateById = updateById;