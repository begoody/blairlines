/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req,res){
		res.view();
	},
	'create': function(req,res,next){

		
		var params = req.params.all();
		delete(params.id);
		
		User.create(req.params.all(),function userCreated(err,user){  

			if(err){ 
			res.json(err);
				
				

			}

			res.json(user);

		});
	}
};

