var myApp = angular.module('myApp', ['ng-admin', 'restangular']);


myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Blairlines Admin')
      .baseApiUrl(location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id

    // MENU customization
   admin.menu(nga.menu()
            .addChild(nga.menu(user).title('Users').icon('<span class="glyphicon glyphicon-user"></span>')) // customize the entity menu icon
            .addChild(nga.menu(event).title('Events').icon('<span class="glyphicon glyphicon-tags"></span>')) // you can even use utf-8 symbols!
            .addChild(nga.menu())
         );
    //Customized Dashboard

    //variable entities
    var user = nga.entity('user');
    var event = nga.entity('event');
    
    admin.addEntity(user)
    admin.addEntity(event)




    // user  views -------------------------------------------------------

    // var user = nga.entity('user');
    // // set the fields of the user entity list view
    // user.listView().fields
    // ([
    //     nga.field('email'),
    //     nga.field('password'),
    //     nga.field('userType'),
    //     nga.field('createdAt', 'date'),
    //     nga.field('updatedAt', 'date')

    // ]).listActions(['edit', 'show']);

    // user.showView().fields([
    //     nga.field('email'),
    //     nga.field('password')

    //     ]);

    // user.creationView().fields([
    //     nga.field('email'),
    //     nga.field('password'),
    //     nga.field('userType')
    //     ]);

    // user.editionView().fields(user.creationView().fields());
    // admin.addEntity(user);


    // // add the user entity to the admin application

    // // pilot  views -------------------------------------------------------
    // var pilot = nga.entity('pilot');
    // pilot.listView().fields([
    //     nga.field('name'),
    //     nga.field('age'),
    //     nga.field('phone'),
    //     nga.field('rating'),
    //     nga.field('status')

    // ]).listActions(['edit', 'show']);

    // pilot.showView().fields([
    //     nga.field('name'),
    //     nga.field('age'),
    //     nga.field('phone'),
    //     nga.field('rating'),
    //     nga.field('status')

    // ]);

        
    // pilot.creationView().fields([
    //     nga.field('name'),
    //     nga.field('age'),
    //     nga.field('phone'),
    //     nga.field('rating'),
    //     nga.field('status')
    // ]);


    // pilot.editionView().fields(pilot.creationView().fields());
    // admin.addEntity(pilot);

    // // passenger  views -------------------------------------------------------

    // var passenger = nga.entity('passenger');

    // passenger.listView().fields([
    //     nga.field('name'),
    //     nga.field('age'),
    //     nga.field('phone'),
    //     nga.field('subscriptionType'),
    //     nga.field('events'),
    //     nga.field('feedback')

    // ]).listActions(['edit', 'show']);

    // passenger.showView().fields([
    //     nga.field('name'),
    //     nga.field('age'),
    //     nga.field('phone'),
    //     nga.field('subscriptionType'),
    //     nga.field('events'),
    //     nga.field('feedback')

    //     ]);

    // passenger.creationView().fields([
    //     nga.field('name'),
    //     nga.field('age'),
    //     nga.field('phone'),
    //     nga.field('rating'),
    //     nga.field('status')

    //     ]);
    // passenger.editionView().fields(passenger.creationView().fields());

    // admin.addEntity(passenger);

    // // subscription  views -------------------------------------------------------


    // var subscription = nga.entity('subscription');
    // subscription.menuView().icon();
    // subscription.listView().fields([
    //     nga.field('name'),
    //     nga.field('description'),
    //     nga.field('price'),

    // ]).listActions(['edit', 'show']);

    // subscription.showView().fields([
    //     nga.field('name'),
    //     nga.field('description'),
    //     nga.field('price')

    //     ]);

    // subscription.creationView().fields([
    //     nga.field('name'),
    //     nga.field('description'),
    //     nga.field('price')

    //     ]);
    // subscription.editionView().fields(subscription.creationView().fields());


    // admin.addEntity(subscription)

    // // feedback  views -------------------------------------------------------

    // var feedback = nga.entity('feedback');
    // feedback.listView().fields([
    //     nga.field('rate'),
    //     nga.field('description'),
    //     nga.field('event'),
    //     nga.field('passenger'),

    // ]).listActions(['edit', 'show']);

    // feedback.showView().fields([
    //     nga.field('name'),
    //     nga.field('description'),
    //     nga.field('price')

    //     ]);

    // feedback.creationView().fields([
    //     nga.field('name'),
    //     nga.field('description'),
    //     nga.field('price')

    //     ]);
    // feedback.editionView().fields(feedback.creationView().fields());
    // admin.addEntity(feedback)

    // // event  views -------------------------------------------------------

    // var event = nga.entity('event');
    // event.listView().fields([
    //     nga.field('description'),
    //     nga.field('date', 'datetime'),
    //     nga.field('timeStart', 'datetime'),
    //     nga.field('timeEnd', 'datetime'),
    //     nga.field('status'),
    //     nga.field('eventType'),


    // ]).listActions(['edit', 'show']);

    // event.showView().fields([
    //     nga.field('description'),
    //     nga.field('date', 'datetime'),
    //     nga.field('timeStart', 'datetime'),
    //     nga.field('timeEnd', 'datetime'),
    //     nga.field('status'),
    //     nga.field('eventType')

    //     ]);

    // event.creationView().fields([
    //     nga.field('description'),
    //     nga.field('date'),
    //     nga.field('timeStart'),
    //     nga.field('timeEnd'),
    //     nga.field('status'),
    //     nga.field('eventType')

    //     ]);
    // event.editionView().fields(event.creationView().fields());
    // admin.addEntity(event)

    // // club  views -------------------------------------------------------


    // var club = nga.entity('club');
    // club.menuView().icon('<span class="glyphicon glyphicon-map-marker"></span>');
    // club.listView().fields([
    //     nga.field('name'),
    //     nga.field('contactPerson'),
    //     nga.field('phone'),
    //     nga.field('location'),

    // ]).listActions(['edit', 'show']);
    // club.showView().fields([
    //     nga.field('name'),
    //     nga.field('contactPerson'),
    //     nga.field('phone'),
    //     nga.field('location')

    //     ]);

    // club.creationView().fields([
    //     nga.field('name'),
    //     nga.field('contactPerson'),
    //     nga.field('phone'),
    //     nga.field('location')

    //     ]);
    // club.editionView().fields(club.creationView().fields());
    // admin.addEntity(club)

    //attach the admin application to the DOM and execute it
 

   nga.configure(admin);
}]);



