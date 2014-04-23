$( document ).ready(function() {
  $('form#signup').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: 'https://docs.google.com/forms/d/1e9YVlCUhFD3eRGX2gFIn35mIMkD90HSh9fKeZfgY6A8/formResponse?embedded=true',
      type: 'POST',
      data: {
        'entry.1624144845': $('input#name').val(),
        'entry.987085994':  $('input#email').val(),
        'entry.1924100915': $('input#company').val(),
        'entry.1530080620': $('input#url').val()
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

