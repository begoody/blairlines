/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create': function(req,res,next){

		
		var params = req.params.all();
		params.pilots = req.session.PilotId;
		if(req.session.ClubId){ params.clubs = req.session.ClubId; }
		//console.log(params);
		delete(params.id);
		
		Event.create(req.params.all(),function userCreated(err,event){

			if(err){ 
				res.json(err);
			}			

			res.json(event);

		});
	}
};

