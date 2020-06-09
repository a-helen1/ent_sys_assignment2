'use strict'

const Poi = require('../models/poi');
const Boom = require('@hapi/boom');

const Pois = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const pois = await Poi.find();
      return pois;
    }
  },

  findOne: {
    auth: {
      strategy: 'jwt',
    },
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
  },

  create: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const newPoi = new Poi(request.payload);
      const poi = await newPoi.save();
      if(poi) {
        return h.response(poi).code(201);
      }
      return Boom.badImplementation('error creating poi');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Poi.remove({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const response = await Poi.deleteOne({_id:request.params.id});
      if(response.deletedCount == 1 ) {
        return { success: true};
      }
      return Boom.notFound('id not found');
    }
  },


};

module.exports = Pois;