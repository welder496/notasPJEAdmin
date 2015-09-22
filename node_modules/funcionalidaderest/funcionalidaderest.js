var rest = require('restler');
var host = 'localhost';
var port = '12345';

module.exports = {

      getFuncionalidades: function(callback){
            rest.get('http://'+host+":"+port+'/notas/funcionalidade/all')
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao buscar Funcionalidades"});
               });
      },

      getFuncionalidadeByDescricao: function(descricao, callback){
          if (descricao != "") {
            rest.get('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao buscar Funcionalidades"});
               });
         } else {
               callback({message: "Não foi possível buscar a Funcionalidade!!"});
         }
      },

      newFuncionalidadeByDescricao: function(descricao, callback){
          if (descricao != "") {
            rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao inserir Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível inserir Funcionalidade!!"});
         }
      },

      updateFuncionalidadeOnlyDescricao: function(descricao, novaDescricao, callback){
           if (descricao != "" && novaDescricao != "") {
            rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao atualizar Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível atualizar Funcionalidade!!"});
         }
      },

      updateFuncionalidadeByDescricao: function(descricao, funcionalidadedata, callback){
          if (descricao != "") {
            rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao,{
                  data: funcionalidadedata
               })
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao atualizar Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível atualizar Funcionalidade!!"});
         }
      },

      deleteFuncionalidadeByDescricao: function(descricao, callback){
         if (descricao != "") {
            rest.del('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao excluir Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível excluir Funcionalidade!!"});
         }
      },

      updateFuncionalidadeSubTipo: function(descricao, oldSubTipo, newSubtipo, callback){
         if (descricao != "" && oldSubTipo != "" && newSubtipo != "") {
            rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+oldSubTipo+'/to/'+newSubtipo)
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao atualizar subtipo de Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível atualizar subtipo de Funcionalidade!!"});
         }
      },

      newFuncionalidadeSubTipo: function(descricao, subTipo, callback) {
         if (descricao != "" && subTipo != "") {
            rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subTipo)
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao incluir subtipo de Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível incluir subtipo de Funcionalidade!!"});
         }
      },

      deleteFuncionalidadeSubTipo: function(descricao, subTipo, callback) {
         if (descricao != "" && subTipo != "") {
            rest.del('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subTipo)
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao excluir subtipo de Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível excluir subtipo de Funcionalidade!!"});
         }
      },

      newFuncionalidade: function(funcionalidadedata, callback){
         if (descricao != "" && subTipo != "") {
            rest.post('http://'+host+":"+port+'/notas/funcionalidade/new',{
                   data: funcionalidadedata
               })
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao incluir subtipo de Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível incluir subtipo de Funcionalidade!!"});
         }
      },

      newSubTipo: function(descricao,subtipodata, callback){
         if (descricao != "") {
            rest.post('http://'+host+":"+port+'/notas/funcionalidade/new/'+descricao+'/subtipo',{
                   data: subtipodata
               })
               .on('success', function(data,response){
                     callback(data);
               })
               .on('error', function(err,response){
                     callback({message: "Erro ao incluir subtipo de Funcionalidade"});
               });
         } else {
               callback({message: "Não foi possível incluir subtipo de Funcionalidade!!"});
         }
      }

};