      $('select#funcionalidades').on('click',function(event){
             $('#descricao').val($('select#funcionalidades option:selected').text());
             var descricao = $('#descricao').val();
             rest.get('/funcionalidade/descricao/'+descricao, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades').val(descricao);
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
             });
      });

      $('select#funcionalidades').on('keyup',function(event){
             $('#descricao').val($('select#funcionalidades option:selected').text());
             var descricao = $('#descricao').val();
             rest.get('/funcionalidade/descricao/'+descricao, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades').val(descricao);
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
             });
      });

      $('select#subTipos').on('click',function(event){
             $('#subTipo').val($('select#subTipos option:selected').text());
      });

      $('select#subTipos').on('keyup',function(event){
             $('#subTipo').val($('select#subTipos option:selected').text());
      });

      $('#inserirFuncionalidade').on('click',function(event){
             var descricao = $('#descricao').val();
             rest.post('/funcionalidade/descricao/'+descricao, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades').val(descricao);
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
             });
      });

      $('#alterarFuncionalidade').on('click',function(event){
             var descricao = $('select#funcionalidades option:selected').text()
             var novadescricao = $('#descricao').val();
             rest.put('/funcionalidade/descricao/'+descricao+'/to/'+novadescricao, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades').val(novadescricao);
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
             });
      });

      $('#apagarFuncionalidade').on('click',function(event){
             var descricao = $('#descricao').val();
             rest.del('/funcionalidade/descricao/'+descricao, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades option:first-child').attr("selected", "selected");
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
             });
      });


      $('#inserirSubTipo').on('click',function(event){
             var descricao = $('select#funcionalidades option:selected').text();
             var subtipo = $.trim($('#subTipo').val());
             rest.post('/funcionalidade/descricao/'+descricao+'/subtipo/'+subtipo, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades').val(descricao);
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
             });
      });

      $('#alterarSubTipo').on('click',function(event){
             var descricao = $('select#funcionalidades option:selected').text();
             var newsubtipo = $.trim($('#subTipo').val());
             var subtipo = $('select#subTipos option:selected').text();
             rest.put('/funcionalidade/descricao/'+descricao+'/subtipo/'+subtipo+'/to/'+newsubtipo, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades').val(descricao);
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
            });
      });

      $('#apagarSubTipo').on('click',function(event){
             var descricao = $('select#funcionalidades option:selected').text();
             var subtipo = $('select#subTipos option:selected').text();
             rest.del('/funcionalidade/descricao/'+descricao+'/subtipo/'+subtipo, function(data){
                   document.write(data);
                   document.close();
                   $('select#funcionalidades').val(descricao);
                   $('#descricao').val($('select#funcionalidades option:selected').text());
                   $('select#funcionalidades').focus();
             });
      });

