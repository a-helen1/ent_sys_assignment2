'use strict'

const Poi = require('../models/poi');
const Boom = require('@hapi/boom');

const Pois = {
  find: {
    auth:false,
    handler: async function(request, h) {
      const pois = await Poi.find();
      return pois;
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try{
        const pois =await Poi.findOne({_id: request.params.id});
        if (!pois) {
          return Boom.notFound('No POI with this id');
      }
       return pois;
     }catch (err) {
        return Boom.notFound('No POI with this id');
      }
    }
  }
};

module.exports = Pois;