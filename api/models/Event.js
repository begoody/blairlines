/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	date : 'date',
  	time : 'string',
  	description: 'string',
  	status: 'integer',
  	eventType: 'integer',//need to extend
  	pilots: {
  		collection: 'pilot',
  		via: 'events'
  	},
  	passengers : {
  		collection: 'passenger',
  		via: 'events',
  	},
  	clubs : {
  		collection: 'club',
  		via: 'events'
  	}

  }
  
};

