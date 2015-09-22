var rest = require('restler');
var host = 'localhost';
var port = '12345';

module.exports = {

   newPerfil: function(descricao, callback){
      if (descricao != ""){
          rest.post('http://'+host+":"+port+'/notas/perfil/new',
            {
              data: descricao
            })
            .on('success', function(data,response){
                callback(data);
            })
            .on('error', function(err, response){
                callback({message:"Erro ao inserir perfil!!"});
            })
      } else {
          callback({message: "Não foi possível inserir Perfil!!"});
      }
   },

   getPerfils: function(callback){
      rest.get('http://'+host+":"+port+'/notas/perfil/all')
      .on('success', function(data,response){
            callback(data);
      })
      .on('error', function(err,response){
             callback({message: "Erro ao buscar Perfil"});
      });
   },

   deletePerfilByDescricao: function(descricao, callback){
      if (descricao!="") {
          rest.del('http://'+host+":"+port+'/notas/perfil/'+descricao)
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message: "Erro ao apagar Perfil!!"});
          })
      } else {
          callback({message: "Não foi possível apagar o Perfil!!"});
      }
   },

   updatePerfilById: function(id, descricao, callback){
      if (id != "") {
          rest.put('http://'+host+':'+port+'/notas/perfil/'+id+'/'+descricao)
          .on('success', function(data,response){
                callback(data);
          })
          .on('error', function(err, response){
                callback({message: "Erro ao atualizar o Perfil!!"});
          })
      } else {
          callback({message: "Não foi possível atualizar o Perfil!!"});
      }
   }

};