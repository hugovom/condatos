$(document).ready(function () {
  $("form#signup").validate({
    showErrors: function (errorMap, errorList) {
      // Clean up any tooltips for valid elements
      $.each(this.validElements(), function (index, element) {
        var $element = $(element);

        // Clear the title - there is no error associated anymore
        $element.data("title", "")
        .removeClass("error")
        .tooltip("destroy");
      });

      // Create new tooltips for invalid elements
      $.each(errorList, function (index, error) {
        var $element = $(error.element);
        // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
        // and create a new tooltip based on the error messsage we just set in the title
        $element.tooltip("destroy")
          .data("title", error.message)
          .addClass("error")
          .tooltip();
      });
    },
    submitHandler: function (form) { form.submit() }
  });
});
