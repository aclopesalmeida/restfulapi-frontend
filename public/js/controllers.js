/// <reference path="services.js" />

app.controller('navCtrl', function($scope, $rootScope, $location, utilizadoresServico) {
    $scope.open = false;

    $scope.login = function() {
        utilizadoresServico.login($scope.utilizador).then(function sucesso(resposta) {
            $rootScope.estaAutenticado = true;
            sessionStorage.setItem('token',resposta.data.token);
            $location.path('/admin/classificacoes');
            $scope.open = false;
        }, function erro(resposta) {
            alert(resposta.data.mensagem);
        }
        )
    };

    $scope.logout = function()
    {
        utilizadoresServico.logout().then(function(resposta) {
            $rootScope.estaAutenticado = false;
            $location.path('/');
        });
    };

    $scope.fechar = function() {
        $scope.open = false;
    };
    
})
.controller('layoutCtrl', function($scope, disciplinasServico) {

    disciplinasServico.getDisciplinas().then(function(resposta) {
        $scope.disciplinas = resposta.data.disciplinas;
    });


})
.controller('homeCtrl', function($scope, $location, $routeParams, classificacoesServico) {

   classificacoesServico.getClassificacoes($routeParams.disciplina_id).then(function(resposta) {
        $scope.classificacoes = resposta.data.classificacoes;
        $scope.disciplina = resposta.data.disciplina;
        $scope.disciplinas = resposta.data.disciplinas;     
        $scope.fimResultados = resposta.data.classificacoes.length < 10 ? true : false;
        
    });

    $scope.carregarMais = function($event) {
        var skip = angular.element($event.target).attr('data-ultimo');
        classificacoesServico.getClassificacoes($routeParams.disciplina_id, skip).then(function(resposta) {
            $scope.classificacoes = $scope.classificacoes.concat(resposta.data.classificacoes);
            $scope.fimResultados = resposta.data.classificacoes > 0 ? false : true;
        })
    };

})
.controller('criarClassificacoesCtrl', function($scope, $location, classificacoesServico, alunosServico, disciplinasServico) {
    $scope.criar = function() {
        classificacoesServico.criar($scope.classificacao).then(function sucesso(resposta) {
            $location.path('/admin/classificacoes');
            alert('Classificação criada com sucesso!');
        }, function erro(resposta) {
            alert('Ops! Ocorreu um problema. Por favor, tente novamente');
        });
    };

    alunosServico.getAlunos().then(function(resposta) {
        $scope.alunos = resposta.data.alunos;
    });

    disciplinasServico.getDisciplinas().then(function(resposta) {
        $scope.disciplinas = resposta.data.disciplinas;
    })

})
.controller('editarClassificacoesCtrl', function($scope, $location, $routeParams, classificacoesServico, alunosServico, disciplinasServico) {

    classificacoesServico.getClassificacao($routeParams.aluno_id, $routeParams.disciplina_id).then(function(resposta) {
        $scope.classificacao = resposta.data.classificacao;
    });

    alunosServico.getAlunos().then(function(resposta) {
        $scope.alunos = resposta.data.alunos;
    });

    disciplinasServico.getDisciplinas().then(function(resposta) {
        $scope.disciplinas = resposta.data.disciplinas;
    })


    $scope.editar = function() {
            classificacoesServico.editar($scope.classificacao, $scope.classificacao.aluno_id, $scope.classificacao.disciplina_id).then(function sucesso(resposta) {
                var url = '/admin/classificacoes/' + $scope.classificacao.disciplina_id
                $location.path(url);
                alert(resposta.data.mensagem);
            }, function erro(resposta) {
                alert(resposta.data.mensagem);
            }
        );
    };


})
.controller('apagarClassificacoesCtrl', function($scope, $location, $routeParams, classificacoesServico){

    classificacoesServico.getClassificacao($routeParams.aluno_id, $routeParams.disciplina_id).then(function(resposta) {
        $scope.classificacao = resposta.data.classificacao;
    });

    $scope.apagar = function() {
        classificacoesServico.apagar($scope.classificacao.aluno_id, $scope.classificacao.disciplina_id).then(function(resposta) {
            $location.path('/admin/classificacoes');
            alert('Classificação removida com sucesso!');
        })
    };
})
.controller('criarAlunosCtrl', function($scope, $location, alunosServico) {
    
    $scope.criar = function() {
        alunosServico.criar($scope.aluno).then(function sucesso (resposta) {
            $location.path('/admin/classificacoes/criar');
            alert('Aluno criado com sucesso!');
        }, function erro(resposta) {
            alert('Ops! Ocorreu um problema. Por favor, tente novamente');
        });
    }
});