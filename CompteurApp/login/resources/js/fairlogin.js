function removeError(event) {
  if ($('#' + event.target.id).hasClass('is-invalid')) {
    $('#' + event.target.id).removeClass('is-invalid');
  }
}

function addError(event) {
  $('#' + event.target.id).addClass('is-invalid');
}

function setNickname() {
  if (!$('#nickname').val()) {
    const nickname = $('#firstName').val() + '.' + $('#lastName').val();
    $('#nickname').val(nickname.toLowerCase());
  }
}

$(document).ready(() => {
  $('#password-confirm').change(event => {
    const password = $('#password').val();

    if (password !== $('#password-confirm').val()) {
      addError(event);
    }
  });

  $('#password-confirm').focus(removeError);

  $('#password').change(event => {
    const regex = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$');

    if (!regex.test($('#password').val())) {
      addError(event);
    }
  });

  $('#password').focus(removeError);

  $('#language-picker-dropdown').change(() => {
    var redirectUrl = $('#language-picker-dropdown').val();
    window.location.href = redirectUrl;
  });

  $('#agreeTerms').change(event => {
    if (!$('#agreeTerms').is(':checked')) {
      $('#registerBtn').prop('disabled', true);
    } else {
      $('#registerBtn').prop('disabled', false);
      $('#agreeTerms').val($.now());
      setNickname();
    }
  });

  $('form').submit(() => {
    if (!$('#firstName').val()) {
      $('#firstName').val('fairapps');
    }

    if (!$('#lastName').val()) {
      $('#lastName').val('fairapps');
    }
  });
});
