      $('#editTags').on('tokenfield:createtoken', function(event){
             var existingTokens = $(this).tokenfield('getTokens');
             $.each(existingTokens, function(index, token){
                   if (token.value === event.attrs.value) {
                          event.preventDefault();
                   }
             });
      });

      $('#itensArquivos button.btn.btn-default.btn-xs').on('click',function(event){
         var i = $(this).attr('id');
         var value = $(this).attr('value');
         $('div #'+i).remove();
         var count = $('#itensArquivos').children().length;
         if (count == 0)
                   $('#listaArquivos').attr('style','display: none');
         rest.del('/documents',{codigo:"#{codigo}",value: value});
         rest.get('/version',{codigo:"#{codigo}"}, function(data){
                   $('#versao.form-control').val(data.versao);
         });
         $('#comando.form-control').val('edit');
      });

      $('select#perfil').on('click',function(event){
             $('#editTags').tokenfield('createToken','Perfil: '+$('select#perfil option:selected').text());
      });

      $('select#perfil').on('keypress',function(event){
             var key = event.which || event.keyCode;
             if (event.keyCode == 13) {
                    $('#editTags').tokenfield('createToken','Perfil: '+$('select#perfil option:selected').text());
             }
             event.preventDefault();
      });

      $('select#funcionalidade').on('click',function(event){
             var descricao = $('select#funcionalidade option:selected').text();
             rest.get('/edit/funcionalidade/'+descricao, function(data){
                   $('select#subTipos').empty();
                   $.each(data, function(i, value){
                          $('select#subTipos').append($('<option>').text(value).attr('value', value));
                   });
             });
             event.preventDefault();
      });

      $('select#funcionalidade').on('keydown',function(event){
             var descricao = $('select#funcionalidade option:selected').text();
             rest.get('/edit/funcionalidade/'+descricao, function(data){
                   $('select#subTipos').empty();
                   $.each(data, function(i, value){
                          $('select#subTipos').append($('<option>').text(value).attr('value', value));
                   });
             });
      });

      $('select#funcionalidade').on('keypress',function(event){
             var descricao = $('select#funcionalidade option:selected').text();
             rest.get('/edit/funcionalidade/'+descricao, function(data){
                   $('select#subTipos').empty();
                   $.each(data, function(i, value){
                          $('select#subTipos').append($('<option>').text(value).attr('value', value));
                   });
             });
             event.preventDefault();
      });

      $('select#subTipos').on('click',function(event){
             var funcionalidade = $('select#funcionalidade option:selected').text();
             var subTipo = $('select#subTipos option:selected').text();
             if ((funcionalidade != "") && (subTipo != "")) {
                    $('#editTags').tokenfield('createToken','Funcionalidade: '+funcionalidade+'>>'+subTipo);
             }
             event.preventDefault();
      });

      $('select#subTipos').on('keypress',function(event){
             var key = event.which || event.keyCode;
             if (key == 13) {
                   var funcionalidade = $('select#funcionalidade option:selected').text();
                   var subTipo = $('select#subTipos option:selected').text();
                   if ((funcionalidade != "") && (subTipo != "")) {
                         $('#editTags').tokenfield('createToken','Funcionalidade: '+funcionalidade+'>>'+subTipo);
                   }
             }
             event.preventDefault();
      });

      $(document).on('click','a',function(event){
         var value = $(this).attr('value');
         rest.post('/documents',{codigo: "#{codigo}", value: value},function(data){
               window.open(data,'_blank','top=200,left=200,toolbar=no,resizable=yes,scrollbars=no,width=800,height=600');
         });
      });

      $(document).on('ready', function(){
         var count = $('#itensArquivos').children().length;
         if (count == 0)
            $('#listaArquivos').attr('style','display: none');
         else
            $('#listaArquivos').attr('style','display: block');
      });

      $('#editIssue').on('keyup',function(event){
             var numero = $(this).val().replace(/[^a-zA-Z\-\d]/g,'');
             $('#editIssue').val(numero.toUpperCase());
      });

      $('#editIssue').on('blur', function(event){
             var numero = $('#editIssue').val();
             if (numero != ""){
                   $('#editTags').tokenfield('createToken', 'Issue: '+numero);
             }
      });
