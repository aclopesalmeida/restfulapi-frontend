app.service('alunosServico', function($http) {
    this.url = 'http://local.classificacoes.backend/api/alunos';

    this.getAlunos = function() {
        return $http({
            method: 'GET',
            url: this.url
        })
    };

    this.criar = function($aluno) {
        return $http({
            method: 'POST',
            url: this.url,
            data: $aluno
        });
    };

  
})
.service('disciplinasServico', function() {
    this.url = 'http://local.classificacoes.backend/api/disciplinas';

    this.getDisciplinas = function() {
        return $http({
            method: 'get',
            url: this.url
        })
    };
})
.service('classificacoesServico', function($http) {
    this.url = 'http://local.classificacoes.backend/api/classificacoes';

    this.criar = function($classificacao)  {
        return $http({
            method: 'POST',
            url: this.url,
            data:$classificacao
        })
    };

    this.getClassificacao = function($aluno_id, $disciplina_id) {
        return $http({
            method: 'get',
            url: this.url + '/' + $aluno_id + '/' + $disciplina_id
,        })
    };

    this.editar = function($classificacao, $aluno_id, $disciplina_id) {
        return $http({
            method: 'put',
            url: this.url + '/' + $aluno_id + '/' + $disciplina_id + '/editar',
            data: $classificacao
,        })
    };

    this.apagar = function($aluno_id, $disciplina_id) {
        return $http({
            method: 'DELETE',
            url: this.url + '/' + $aluno_id + '/' + $disciplina_id + '/apagar'
        });
    };

    this.getClassificacoes = function($disciplina_id, $skip) {
        return $http({
            method: 'GET',
            url: this.url,
            params: { disciplina_id: $disciplina_id, skip : $skip}
        })
    };
})
.service('disciplinasServico', function($http) {
    this.url = 'http://local.classificacoes.backend/api/disciplinas';

    this.getDisciplinas = function() {
        return $http({
            method: 'GET',
            url: this.url
        })
    }
  
})
.service('utilizadoresServico', function($http) {
    this.url = 'http://local.classificacoes.backend/api/utilizadores';

    this.login = function($modelo)
    {
        return $http({
            method: 'POST',
            url: this.url + '/login',
            data: $modelo
        });
    };

    this.logout = function()
    {
        return $http({
            method: 'POST',
            url: this.url + '/logout'
        })
    };

    this.getToken = function() {
        return sessionStorage.getItem('token');
    }


    this.estaAutenticado = function() {
        return $http({
            method:'get',
            url: this.url + '/verificar'
        }).then(function(resposta) {
            return resposta.data;
        });
    };
   
});