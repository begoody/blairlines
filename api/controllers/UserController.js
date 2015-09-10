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

			if(user){
				req.session.authenticated = true;
				req.session.UserId = user.id;
				req.session.UserType = user.UserType;
			}
			

			res.json(user);

		});
	},
	'login': function(req,res,next){

		var params = req.params.all();

		//console.log(params);
		delete(params.id);
		User.findOne({ email: params.email }).exec(function findUser(err,user){ 

			if(err){ 
				res.json(err);
			}

			if(user){
				delete(user.password);

				if(user.userType=="1"){

					Passenger.findOne({ user: user.id }).exec(function findPassenger(err,passenger){
						if(passenger){
							passenger.user = user;
							req.session.UserName = passenger.name;
							req.session.UserType = user.userType;
							res.json(passenger);
						}else { res.json(err); }	
						
					});
				}

				if(user.userType=="2"){					
					Pilot.findOne({ user: user.id }).exec(function findPilot(err,pilot){
						if(pilot){ 
							pilot.user = user;
							req.session.UserName = pilot.name;
							req.session.UserType = user.userType;
							req.session.PilotId = pilot.id;
							res.json(pilot); 
						}else { res.json(err); }	
						
					});
				}

				if(user.userType=="3"){					
					Club.findOne({ user: user.id }).exec(function findClub(err,club){
						//console.log(club);
						if(club){ 
							club.user = user;
							req.session.UserName = club.name;
							req.session.UserType = user.userType;
							req.session.ClubId = club.id;
							res.json(club); 
						}else { res.json(err); }	
						
					});
				}

				req.session.authenticated = true;
				req.session.UserId = user.id;
				req.session.UserType = user.UserType;
			} else { res.json(err); }

			

		});
	},
	'checkSession': function(req,res,next){

		if(req.session.authenticated){ 

			User.findOne({ id: req.session.UserId }).exec(function findUser(err,user){ 
			if(err){ 
				res.json(err);
			}
			
			if(user){

				delete(user.password);

				if(user.userType=="1"){
					Passenger.findOne({ user: user.id }).exec(function findPassenger(err,passenger){	
						passenger.user = user;
						req.session.UserName = passenger.name;
						res.json(passenger);
					});
				}

				if(user.userType=="2"){					
					Pilot.findOne({ user: user.id }).exec(function findPilot(err,pilot){	
						pilot.user = user;
						req.session.UserName = pilot.name;
						res.json(pilot);
					});
				}

				req.session.authenticated = true;
				req.session.UserId = user.id;
				req.session.UserType = user.UserType;
			} else { res.json(err); }

			

		});
		} else { res.json({'error':1}); }
	}
};

