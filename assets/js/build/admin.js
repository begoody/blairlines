var myApp = angular.module('myApp', ['ng-admin', 'restangular']);


myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Blairlines Admin')
      .baseApiUrl(location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id

    var user = nga.entity('user');
    var event = nga.entity('event');
    var events = nga.entity('events');
    var passenger = nga.entity ('passenger');
    var pilot = nga.entity ('pilot');
    var club = nga.entity('club');
    var usertype = nga.entity('usertype');
    var eventtype = nga.entity('eventtype');
    var clubs = nga.entity ('clubs');
    var pilots = nga.entity ('pilots');
    var passengers = nga.entity ('passengers');
    var feedback = nga.entity ('feedback');

    
    admin
    .addEntity(user)
    .addEntity(event)
    .addEntity(events)
    .addEntity(eventtype)
    .addEntity(passenger)
    .addEntity(pilot)
    .addEntity(club)
    .addEntity(clubs)
    .addEntity(pilots)
    .addEntity(feedback)
    .addEntity(passengers)
    .addEntity(usertype);

    //user view
    
    user.listView().title('Users')
    .fields([
        nga.field('id'),
        nga.field('email'),
        nga.field('userType', 'reference').label('Types of Users')
        .targetEntity(admin.getEntity('usertype'))
        .targetField(nga.field('title')),
    ]).listActions(['edit', 'show', 'delete']);

    user.showView()
    .fields([
        nga.field('id').label('Id'),
        nga.field('email'),
        nga.field('createdAt'),
        nga.field('updatedAt'),
        nga.field('userType', 'reference').label('Type')
        .targetEntity(admin.getEntity('usertype'))
        .targetField(nga.field('title')),

    ]);


    user.creationView().fields([
        nga.field('email', 'email').validation({required: true}),
        nga.field('name', 'string'),
        nga.field('age', 'number'),
        nga.field('phone', 'number' ).format('000-000-0000'),
        nga.field('password', 'password'),
        nga.field('userType', 'choice')
        .choices([
            {value : '1', label : 'Passenger' },
            {value : '2', label : 'Pilot'},
            {value : '3', label : 'Club'},
            ]),

    ]);

    user.editionView().fields(user.creationView().fields());

    //pilot view

    pilot.listView().title('Pilots')
    .fields([
        nga.field('id').label('Id'),
        nga.field('name'),
        nga.field('age'),
        nga.field('phone'),
        nga.field('createdAt', 'date').label('Time Created').format('yyyy-MM-dd HH:mm:ss'),
        nga.field('updatedAt', 'date').label('Time Updated').format('yyyy-MM-dd HH:mm:ss'),


    ]).listActions(['edit', 'show', 'delete']);


    pilot.showView()
    .fields([
        nga.field('id').label('Id'),
        nga.field('name'),
        nga.field('age'),
        nga.field('phone'),
        nga.field('rating', 'float'),
        nga.field('status', 'string'),
        nga.field('clubs'),
        nga.field('events'),
        nga.field('user'),
        nga.field('createdAt', 'date').label('Time Created').format('yyyy-MM-dd HH:mm:ss'),
        nga.field('updatedAt', 'date').label('Time Updated').format('yyyy-MM-dd HH:mm:ss'),

    ]);

    pilot.creationView().fields([
        nga.field('name', 'string').validation({required: true}),
        nga.field('age', 'string'),
        nga.field('phone', 'number'),
        nga.field('rating', 'float' ),

    ]);

    pilot.editionView().fields(pilot.creationView().fields());

    //event view 


    event.listView().title('Events')
    .fields([
        nga.field('id').label('Id'),
        nga.field('description'),
        nga.field('eventType', 'reference').label('Event Kind')
        .targetEntity(admin.getEntity('eventtype'))
        .targetField(nga.field('title')),
        


    ]).listActions(['edit', 'show', 'delete']);

    event.showView()
    .fields([
        nga.field('id').label('Id'),
        nga.field('description'),
        nga.field('eventType', 'reference').label('Types')
        .targetEntity(admin.getEntity('eventtype'))
        .targetField(nga.field('title')),
        nga.field('timeStart', 'datetime').label('Event Start Time'),
        nga.field('timeEnd', 'datetime').label('Event End Time'),
        nga.field('createdAt', 'date').label('Time Created').format('yyyy-MM-dd HH:mm:ss'),
        nga.field('updatedAt', 'date').label('Time Updated').format('yyyy-MM-dd HH:mm:ss'),
        nga.field('status', 'string'),

    ]);

    event.creationView().fields([
        nga.field('date', 'datetime').validation({required: true}),
        nga.field('timeStart', 'datetime'),
        nga.field('timeEnd', 'datetime'),
        nga.field('description', 'string' ),
        nga.field('eventType', 'choice')
        .choices([
            {value : '1', label : 'Promo event' },
            {value : '2', label : 'Intro-FLight'},
            {value : '3', label : 'Scenic Flight'},
            ]),

    ]);
    
    event.editionView().fields(event.creationView().fields());

    //club list view

    club.listView().title('Clubs')
    .fields([
        nga.field('id').label('Id'),
        nga.field('name'),
        nga.field('contactPerson'),
        nga.field('phone'),
        

    ]).listActions(['edit', 'show', 'delete']);


    club.showView()
    .fields([
        nga.field('id').label('Id'),
        nga.field('name'),
        nga.field('contactPerson'),
        nga.field('phone'),
        nga.field('location'),
        nga.field('latLng', 'number').format('00.0000000'),
        nga.field('workingHours', 'datetime'),
        nga.field('description'),
        nga.field('pilots'),
        nga.field('events'),
        nga.field('email', 'reference').label('Email')
        .targetEntity(admin.getEntity('user'))
        .targetField(nga.field('email')),
        nga.field('createdAt', 'date').label('Time Created').format('yyyy-MM-dd HH:mm:ss'),
        nga.field('updatedAt', 'date').label('Time Updated').format('yyyy-MM-dd HH:mm:ss'),
        ]);

    club.creationView().fields([
        nga.field('name', 'string').validation({required: true}),
        nga.field('contactPerson', 'string'),
        nga.field('phone'),
        nga.field('workingHours', 'datetime' ),
        nga.field('description', 'string'),
        

    ]);
    
    club.editionView().fields(club.creationView().fields());

    //feedback
    feedback.listView().title('Customer Feedback')
    .fields([
        nga.field('rate').label('Rating'),
        nga.field('description'),
        

    ]).listActions(['edit', 'show', 'delete']);

    feedback.showView()
    .fields([
        nga.field('rate'),
        nga.field('description'),
        nga.field('event', 'reference').label('Event Name')
        .targetEntity(admin.getEntity('event'))
        .targetField('description'),
        nga.field('passengers', 'reference').label('Passenger Name')
        .targetEntity(admin.getEntity('passengers'))
        .targetField(nga.field('name')),
    ]);

    //passenger view 
    passenger.listView().title('Passenger Info')
    .fields([
        nga.field('name').label('Customer Name'),
        nga.field('age'),
        nga.field('phone'),
        

    ]).listActions(['edit', 'show', 'delete']);


    passenger.showView()
    .fields([
        nga.field('name'),
        nga.field('age'),
        nga.field('phone'),
        // nga.field('subscriptionType', 'reference').label('Subscribed')
        // .targetEntity(admin.getEntity('event'))
        // .targetField('description'),
        // nga.field('events', 'reference').label('Events')
        // .targetEntity(admin.getEntity('events'))
        // .targetField(nga.field('description')),
    ]);

    passenger.editionView().fields(passenger.creationView().fields());


    
    // MENU customization
        admin.menu(nga.menu()
            .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
            .addChild(nga.menu(pilot).icon('<span class="glyphicon glyphicon-plane"></span>'))
            .addChild(nga.menu(passenger).icon('<span class="glyphicon glyphicon-list"></span>'))
            .addChild(nga.menu(club).icon('<span class="glyphicon glyphicon-glass"></span>')) // customize the entity menu icon
            .addChild(nga.menu(event).icon('<span class="glyphicon glyphicon-calendar"></span>'))
            .addChild(nga.menu(feedback).icon('<span class="glyphicon glyphicon-comment"></span>'))
            );
                // .addChild(nga.menu().title('Stats').icon('').link('/stats'))
    
    // customize header
        var customHeaderTemplate =
        '<div class="navbar-header">' +
            '<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">' +
              '<span class="icon-bar"></span>' +
              '<span class="icon-bar"></span>' +
              '<span class="icon-bar"></span>' +
            '</button>' +
            '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">Welcome Administrator</a>' +
        '</div>' +
        '<p class="navbar-text navbar-right hidden-xs">' +
            '<a href="http://localhost:1337/"><span class="glyphicon glyphicon-log-out"></span>&nbsp;Log off</a>' +
        '</p>';
        admin.header(customHeaderTemplate);

        // customize dashboard
        var customDashboardTemplate =
        '<div class="row dashboard-starter"></div>' +
        '<div class="row dashboard-content"><div class="col-lg-8"><div class="alert alert-info">' +
            'Dashboard' +
        '</div></div></div>' +
        '<div class="row dashboard-content">' +
            '<div class="col-lg-8">' +
                '<div class="panel panel-default">' +
                    '<ma-dashboard-panel collection="dashboardController.collections.latest_user" entries="dashboardController.entries.latest_user"></ma-dashboard-panel>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="row dashboard-content">' +
            '<div class="col-lg-8">' +
                '<div class="panel panel-green">' +
                    '<ma-dashboard-panel collection="dashboardController.collections.ongoing_event" entries="dashboardController.entries.ongoing_event"></ma-dashboard-panel>' +
                '</div>' +
                '<div class="panel panel-red">' +
                    '<ma-dashboard-panel collection="dashboardController.collections.past_event" entries="dashboardController.entries.past_event"></ma-dashboard-panel>' +
                '</div>' +
            '</div>' +
            '<div class="col-lg-8">' +
                '<div class="panel panel-success">' +
                    '<ma-dashboard-panel collection="dashboardController.collections.booked_events" entries="dashboardController.entries.booked_events"></ma-dashboard-panel>' +
                '</div>' +
            '</div>' +
        '</div>';;
        admin.dashboard(nga.dashboard()
        .addCollection(nga.collection(admin.getEntity('user'))
        .name('latest_user')
        .title('Current Users')
        .perPage(5) // limit the panel to the 5 latest posts
        .fields([
            nga.field('email'),
            nga.field('updatedAt', 'date').label('Date & Time').format('yyyy-MM-dd HH:mm:ss'),
            nga.field('userType', 'reference').label('Types')
            .targetEntity(admin.getEntity('usertype'))
            .targetField(nga.field('title')),
        ])
        .sortField('createdAt')
        .sortDir('id')
        .order(1)
    )
        .addCollection(nga.collection(admin.getEntity('event'))
        .name('ongoing_event')
        .title('Event Types')
        .perPage(5)
        .fields([
            nga.field('date', 'date').label('Date').format('yyyy-MM-dd HH:mm:ss'),
            nga.field('description').label('Description'),
            nga.field('timeStart').label('Event Time'),
            nga.field('eventType', 'reference').label('Types')
            .targetEntity(admin.getEntity('eventtype'))
            .targetField(nga.field('title'))
        ])
        .sortField('createdAt')
        .sortDir('id')
        .order(1)
    )   
        .addCollection(nga.collection(admin.getEntity('event'))
        .name('past_event')
        .title('Event Status')
        .perPage(5)
        .fields([
            nga.field('date', 'date').label('Date').format('yyyy-MM-dd HH:mm:ss'),
            nga.field('description').label('Description'),
            nga.field('timeStart').label('Event Time'),
            nga.field('status'),

        ])
        .sortField('status')
        .sortDir('id')
        .order(1)
    )
        .template(customDashboardTemplate)
);

   nga.configure(admin);
}]);



