      $(window).on('load',function(event){
          $("#searchTags").focus();
      });

      /*Identifies the search*/
      $('#buttonOR').on('click', function(event){
          $("#choosenButton").val("OR");
      });

      /*Identifies the search*/
      $('#buttonAND').on('click', function(event){
          $("#choosenButton").val("AND");
      });

      $("#searchTags").on('keyup',function(event){
         var searchTags = $(this).val().replace(/[^a-zA-Z0-9\-]+/g,'');
         $(this).val(searchTags.toUpperCase());
      });

      $(".btn.btn-default.btn-xs").on('click',function(event){
          $('#searchTags').tokenfield('createToken',$(this).attr('id'));
          var search = $("#searchTags").val();
          var vector = search.split(',');
          var last = $(this).attr('id');

          for (var i=0; i < vector.length - 1; i++){
                   if (vector[i].trim() == last.trim()) {
                          vector.pop();
                   }
          }

          $('#searchTags').tokenfield('setTokens',vector);
      })

