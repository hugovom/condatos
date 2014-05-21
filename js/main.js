
function showSuccessWithMessage(msg) {
  $(".alert").text(msg).addClass('alert-success').show();
}

function submitToGoogleForm() {
  var sectorValue = $("input[name=sector]:checked").val();
  var otherSectorValue = ''
  if (sectorValue === "Otro")
    otherSectorValue = $("input[name=other-sector]").val();

  $.ajax({
    url: 'https://docs.google.com/forms/d/1K_CPkixxzmkQy0IQekA6-XK-i8Pf0zU8UvSUJYqmHAA/formResponse?embedded=true',
    type: 'POST',
    data: {
      'entry.1117179829': $('input#name').val(),
      'entry.1518802305': $('input#institucion').val(),
      'entry.203672258': $('input#email').val(),
      'entry.910027698': $('input#pais').val(),
      'entry.1520415052': sectorValue,
      'entry.1520415052.other_option_response': otherSectorValue,
      'entry.1513088725': $('#preguntas').val(),
    },
    dataType: 'jsonp',
    complete: function() {
      // We are using the 'complete' callback, instead of 'success' or 'error'
      // because we haven't figured out the following error:
      // Uncaught SyntaxError: Unexpected token < formResponse:1
      showSuccessWithMessage('¡Gracias por suscribirte! Te mantendremos al tanto.');
    }
  });
}

$(document).ready(function() {
  $('form#signup').on('submit', function(e) {
    e.preventDefault();
    submitToGoogleForm();
  });
});


