/**
 * PilotController
 *
 * @description :: Server-side logic for managing pilots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create': function(req,res,next){

		var params = req.params.all();
		params.user = req.session.UserId;
		delete(params.id);
		
		
		Pilot.create(req.params.all(),function userCreated(err,user){

			var tt = user;

			if(err){ 
				//console.log(err);
			res.json(err);
				
				

			}			

			res.json(user);

		});
	}
};

