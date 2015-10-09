/**
 * EventtypeController
 *
 * @description :: Server-side logic for managing eventtypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'index': function(req,res,next){
		EventType.find().exec(function findEvent(err,eventtype){ 
			if(err){ 
				res.json(err);
			}

			res.json(eventtype);

		});

	},
	
};

