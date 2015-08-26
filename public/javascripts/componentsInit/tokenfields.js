$("#searchTags").tokenfield({
   limit: 20,
   autocomplete: {
     //source:['Funcional','Não-Funcional','Regra de Negócio'],
     delay: 100
   },
   showAutocompleteOnFocus: true,
   createTokensOnBlur: true
 });

$("#insertTags").tokenfield({
	limit: 20,
	autocomplete: {
	  //source:['Funcional','Não-Funcional','Regra de Negócio'],
	  delay: 100
	},
	showAutocompleteOnFocus: true,
	createTokensOnBlur: true
});

$("#editTags").tokenfield({
   limit: 20,
   autocomplete: {
     //source:['Funcional','Não-Funcional','Regra de Negócio'],
     delay: 100
   },
   showAutocompleteOnFocus: true,
   createTokensOnBlur: true
});
