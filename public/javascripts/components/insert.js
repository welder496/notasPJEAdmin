      var prefixo = "";
      var selText = "";

      $("#insertCodigo").on('keyup',function(event){
           var codigo = $(this).val().replace(/[^a-zA-Z\-\d]/g,'');
           $(this).val(codigo.toUpperCase());
      });

      $('#insertCodigo').on('blur', function(event){
            $('#insertNota').focus();
      });

      $('#insertTags').on('tokenfield:createtoken', function(event){
             var existingTokens = $(this).tokenfield('getTokens');
             $.each(existingTokens, function(index, token){
                   if (token.value === event.attrs.value) {
                          event.preventDefault();
                   }
             });
      });

      $('select#perfil').on('click',function(event){
             $('#insertTags').tokenfield('createToken','Perfil: '+$('select#perfil option:selected').text());
      });

      $('select#perfil').on('keypress',function(event){
             var key = event.which || event.keyCode;
             if (event.keyCode == 13) {
                    $('#insertTags').tokenfield('createToken','Perfil: '+$('select#perfil option:selected').text());
             }
             event.preventDefault();
      });

      $('select#funcionalidade').on('click',function(event){
             var descricao = $('select#funcionalidade option:selected').text();
             rest.get('/insert/funcionalidade/'+descricao, function(data){
                   $('select#subTipos').empty();
                   $.each(data, function(i, value){
                          $('select#subTipos').append($('<option>').text(value).attr('value', value));
                   });
             });
             event.preventDefault();
      });

      $('select#funcionalidade').on('keydown',function(event){
             var descricao = $('select#funcionalidade option:selected').text();
             rest.get('/insert/funcionalidade/'+descricao, function(data){
                   $('select#subTipos').empty();
                   $.each(data, function(i, value){
                         $('select#subTipos').append($('<option>').text(value).attr('value', value));
                   });
             });
      });

      $('select#funcionalidade').on('keypress',function(event){
             var descricao = $('select#funcionalidade option:selected').text();
             rest.get('/insert/funcionalidade/'+descricao, function(data){
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
                    $('#insertTags').tokenfield('createToken','Funcionalidade: '+funcionalidade+'>>'+subTipo);
             }
             event.preventDefault();
      });

      $('select#subTipos').on('keypress',function(event){
             var key = event.which || event.keyCode;
             if (key == 13) {
                    var funcionalidade = $('select#funcionalidade option:selected').text();
                    var subTipo = $('select#subTipos option:selected').text();
                   if ((funcionalidade != "") && (subTipo != "")) {
                         $('#insertTags').tokenfield('createToken','Funcionalidade: '+funcionalidade+'>>'+subTipo);
                   }
             }
             event.preventDefault();
      });

      $("#TipoNota.dropdown-menu li a").click(function(event){
             selText = $(this).text();
             prefixo = $(this).attr('value');
             $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"> </span>');
             if (selText != "Nenhum Tipo") {
                   rest.get('/insert/prefixo/'+prefixo+'/searchnext', function(data){
                          $('#insertCodigo').val(data);
                   });
                   $('#insertTags').tokenfield('createToken', selText);
             }
      });

      $('#insertIssue').on('keyup',function(event){
             var numero = $(this).val().replace(/[^a-zA-Z\-\d]/g,'');
             $(this).val(numero.toUpperCase());
      });

      $('#insertIssue').on('blur', function(event){
             var numero = $(this).val();
             if (numero != ""){
                   $('#insertTags').tokenfield('createToken', 'Issue: '+numero);
             }
      });

      $('#salvar').on('click', function(event){
             if (selText != "Nenhum Tipo") {
                   rest.get('/insert/prefixo/'+prefixo+'/next', function(data){
                          $('#insertCodigo').val(data);
                   });
             }
      });
