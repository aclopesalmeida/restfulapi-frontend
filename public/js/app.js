// <reference path="services.js"/>
let app = angular.module('Classificacoes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider, $locationProvider) {

    $httpProvider.interceptors.push(function($injector) {
        return {
            'request' : function(config) {
                var serv = $injector.get('utilizadoresServico');
                config.headers['Authorization'] = 'Bearer ' + serv.getToken();

                return config;
            }
        };
    });


    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
        .when('/:disciplina_id?', {
            controller: 'homeCtrl',
            templateUrl: 'views/home.html'
        })
        .when('/admin/classificacoes/criar', {
            controller: 'criarClassificacoesCtrl',
            templateUrl: 'views/admin/classificacoes/criar.html',
            autenticacao: true
        })
        .when('/admin/classificacoes/:disciplina_id?', {
            controller: 'homeCtrl',
            templateUrl: 'views/admin/classificacoes/listagem.html',
            autenticacao: true
        })
        .when('/admin/classificacoes/editar/:aluno_id/:disciplina_id', {
            controller: 'editarClassificacoesCtrl',
            templateUrl: 'views/admin/classificacoes/editar.html',
            autenticacao: true
        })
        .when('/admin/classificacoes/apagar/:aluno_id/:disciplina_id', {
            controller: 'apagarClassificacoesCtrl',
            templateUrl: 'views/admin/classificacoes/apagar.html',
            autenticacao: true
        })
        .when('/admin/alunos/criar', {
            controller:'criarAlunosCtrl',
            templateUrl: 'views/admin/alunos/criar.html'
        });

        
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
        
})
.run(function($rootScope, $location, utilizadoresServico) {
    utilizadoresServico.estaAutenticado().then(function(resposta) {
        $rootScope.estaAutenticado = resposta;
    });

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if(next.$$route.autenticacao) {
            if (!$rootScope.estaAutenticado) {
                $location.path('/');
            }
        }
    });
});