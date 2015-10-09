/**
 * UserTypeController
 *
 * @description :: Server-side logic for managing usertypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'index': function(req,res,next){
		UserType.find().exec(function findEvent(err,usertype){ 
			if(err){ 
				res.json(err);
			}

			res.json(usertype);

		});

	},
	
};

