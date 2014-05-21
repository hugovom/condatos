$( document ).ready(function() {
  $('form#signup').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: 'https://docs.google.com/forms/d/1K_CPkixxzmkQy0IQekA6-XK-i8Pf0zU8UvSUJYqmHAA/formResponse?embedded=true', 
      type: 'POST',
      data: {        
        'entry.1117179829': $('input#name').val(),
        'entry.1518802305': $('input#institucion').val(),
        'entry.203672258': $('input#email').val(),
        'entry.910027698': $('input#pais').val(),
        'entry.1520415052': $('input#sector').val(),
        'entry.1520415052.other_option_response': $('input#otrosector').val(),
        'entry.1513088725': $('input#preguntas').val(),
      },
      dataType: 'jsonp',
      complete: function() {
        // We are using the 'complete' callback, instead of 'success' or 'error'
        // because we haven't figured out the following error:
        // Uncaught SyntaxError: Unexpected token < formResponse:1
        $(".alert").text('¡Gracias por registrarte! Te mantendremos al tanto.');
        $(".alert").addClass('alert-success');
        $(".alert").show();
        $('button[type="submit"]').attr('disabled', 'disabled');
        $('button[type="submit"]').addClass('disabled');
      }
    });
  });
});

