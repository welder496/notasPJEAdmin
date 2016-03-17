      $('#incContador').on('click',function(event){
            var prefixo = $('#prefixo').val();
            var descricao = $('#descricao').val();
            var token = $('#token').attr('value');
            rest.put('/contador/prefixo/'+prefixo+'/inc',{token: token}, function(data){
                   document.write(data);
                   document.close();
                   $('select#contadores').val(descricao);
                   $('#descricao').val($('select#contadores option:selected').text());
                   $('select#contadores').focus();
            });
      });

      $('#decContador').on('click',function(event){
            var prefixo = $('#prefixo').val();
            var descricao = $('#descricao').val();
            var token = $('#token').attr('value');
            rest.put('/contador/prefixo/'+prefixo+'/dec',{token: token}, function(data){
                   document.write(data);
                   document.close();
                   $('select#contadores').val(descricao);
                   $('#descricao').val($('select#contadores option:selected').text());
                   $('select#contadores').focus();
            });
      });

      $('#reInitContador').on('click',function(event){
            var prefixo = $('#prefixo').val();
            var descricao = $('#descricao').val();
            var token = $('#token').attr('value');
            rest.put('/contador/prefixo/'+prefixo+'/reset',{token: token}, function(data){
                   document.write(data);
                   document.close();
                   $('select#contadores').val(descricao);
                   $('#descricao').val($('select#contadores option:selected').text());
                   $('select#contadores').focus();
            });
      });

      $('#salvar').on('click',function(event){
            var prefixo = $('#prefixo').val();
            var descricao = $('#descricao').val();
            var token = $('#token').attr('value');
            rest.post('/contador/new',{token: token, prefixo: prefixo, descricao: descricao},function(data){
                   document.write(data);
                   document.close();
                   $('select#contadores').val(descricao);
                   $('#descricao').val($('select#contadores option:selected').text());
                   $('select#contadores').focus();
            });
      });

      $('#contador').on('keyup', function(event){
         var numero = $(this).val().replace(/[^\d]/g,'');
         $('#contador').val(numero);
      });

      $('#casas').on('keyup', function(event){
         var numero = $(this).val().replace(/[^\d]/g,'');
         $('#casas').val(numero);
      });

      $('#contadores').on('click',function(event){
             $('#descricao').val($('select#contadores option:selected').text());
             var descricao = $('#descricao').val();
             rest.get('/contador/descricao/'+descricao, function(data){
                   document.write(data);
                   document.close();
                   $('select#contadores').val(descricao);
                   $('#descricao').val($('select#contadores option:selected').text());
                   $('select#contadores').focus();
             });
      });

      $('#contadores').on('keyup', function(event){
             $('#descricao').val($('select#contadores option:selected').text());
             var descricao = $('#descricao').val();
             rest.get('/contador/descricao/'+descricao, function(data){
                   document.write(data);
                   document.close();
                   $('select#contadores').val(descricao);
                   $('#descricao').val($('select#contadores option:selected').text());
                   $('select#contadores').focus();
             });
      });

      $('#atualizar').on('click',function(event){
             var descricao = $('select#contadores option:selected').text();
             var novadescricao = $('#descricao').val();
             var prefixo = $('#prefixo').val();
             var contador =$('#contador').val();
             var casas = $('#casas').val();
             var token = $('#token').attr('value');
             rest.put('/contador/descricao/'+descricao, {token: token, descricao: novadescricao, prefixo: prefixo, contador: contador, casas: casas}, function(data){
                   document.write(data);
                   document.close();
                   $('select#contadores').val(novadescricao);
                   $('#descricao').val($('select#contadores option:selected').text());
                   $('select#contadores').focus();
             });
      });

      $('#apagar').on('click',function(event){
             $('#descricao').val($('select#contadores option:selected').text());
             var descricao = $('#descricao').val();
             var token = $('#token').attr('value');
             rest.del('/contador/descricao/'+descricao, {token: token}, function(data){
                   document.write(data);
                   document.close();
             });
      });