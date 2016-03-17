      $('select#perfils').on('click',function(event){
         $('#descricao').val('');
         $('#descricao').val($('select#perfils option:selected').text());
      });

      $('select#perfils').on('keyup',function(event){
         $('#descricao').val('');
         $('#descricao').val($('select#perfils option:selected').text());
      });

      $('#salvarPerfil').on('click',function(event){
         var descricao = $.trim($('#descricao').val());
         var token = $('#token').attr('value');
         rest.post('/perfil/new',{token: token, descricao: descricao}, function(data){
                document.write(data);
                document.close();
                $('select#perfils').val(descricao);
                $('select#perfils').focus();
                $('#descricao').val($('select#perfils option:selected').text());
         });
      });

      $('#atualizarPerfil').on('click',function(event){
         var perfil = $.trim($('#descricao').val());
         var id = $("select#perfils option:selected").attr('id');
         var token = $('#token').attr('value');
         rest.put('/perfil/'+id+'/'+perfil, {token: token}, function(data){
                document.write(data);
                document.close();
                $('select#perfils').val(perfil);
                $('select#perfils').focus();
                $('#descricao').val($('select#perfils option:selected').text());
         });
      });

      $('#apagarPerfil').on('click',function(event){
         var perfil = $("select#perfils option:selected").text();
         var token = $('#token').attr('value');
         rest.del('/perfil/'+perfil, {token: token},function(data){
               document.write(data);
               document.close();
               $('select#perfils option:first-child').attr("selected", "selected");
               $('select#perfils').focus();
               $('#descricao').val($('select#perfils option:selected').text());
         });
      });
