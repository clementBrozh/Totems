(function() {
	'use strict';

	angular
	.module('TotemsApp')
	.config(Config);

	Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function Config($stateProvider, $urlRouterProvider, $locationProvider) {

		$stateProvider
		.state('projects', {
			url: '/',
			templateUrl: '/app/components/projects/projects.view.html',
			controller: 'ProjectController',
			controllerAs: 'vm',
			resolve: {
				projectsPromise: projectPromise,
			}
		});

		$urlRouterProvider.otherwise('/');

		// use the HTML5 History API
		$locationProvider.html5Mode(true);
	};

	projectPromise.$inject =  ['ProjectFactory'];
	function projectPromise(ProjectFactory) {
		return ProjectFactory.getAll();
	}

})();
