      $(window).on('load',function(event){
         $("#searchNota").focus();
      });

      $('#nota').on('input', function(event){
         $("#searchNota").focus();
      });

      $('#nota').on('blur',function(event){
         $("#searchNota").focus();
      });

      $('#buttonNota').on('click', function(event){
         $("#searchNota").focus();
      });

      $("#searchNota").on('keyup',function(event){
         var nota = $(this).val().replace(/[^a-zA-Z\u00C0-\u00ff0-9\-\.\!\?\:\;\," "]+/g,'');
         $(this).val(nota);
      });
