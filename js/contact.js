$(document).ready(function () {
    $('#output').hide();
    //bind send message here
    $('#submit').click(sendMessage);
    $('#output button').on('click', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        $('#output').hide();
        return false;
    });
});

/* Contact Form */
function checkEmail(email) {
    var check = /^[\w\.\+-]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,6}$/;
    if (!check.test(email)) {
        return false;
    }
    return true;
}

function sendMessage() {
    // receive the provided data
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();
    // check if all the fields are filled
    if (name == '' || email == '' || subject == '' || message == '') {
        $('#output').removeClass('alert-success').addClass('alert-error').show().html('<div class="alert alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>Debe completar todos los campos!</div>');

        return false;
    }

    // verify the email address
    if (!checkEmail(email)) {
        $("#output").removeClass('alert-success').addClass('alert-error').show().html(' <div class="alert alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>Por favor ingrese un mail válido.</div>');
        return false;
    }

    // make the AJAX request
    var dataString = $('#contactForm').serialize();
    $.ajax({
        type: "POST",
        url: 'contact.php',
        data: dataString,
        dataType: 'json',
        success: function (data) {
            if (data.success == 0) {
                var errors = '<ul><li>';
                if (data.name_msg != '')
                    errors += data.name_msg + '</li>';
                if (data.email_msg != '')
                    errors += '<li>' + data.email_msg + '</li>';
                if (data.message_msg != '')
                    errors += '<li>' + data.message_msg + '</li>';
                if (data.subject_msg != '')
                    errors += '<li>' + data.subject_msg + '</li>';

                $("#output").removeClass('alert-success').addClass('alert-error').show().html('<div class="alert alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>No se pudo completar su solicitud. Vea los errores detallados.</div>' + errors);
            }
            else if (data.success == 1) {

                $("#output").removeClass('alert-error').addClass('alert-success').show().html('<div class="alert alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>Su mensaje fue enviado correctamente!</div>');
            }

        },
        error: function (error) {
            $("#output").removeClass('alert-success').addClass('alert-error').show().html('<div class="alert alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>No se pudo completar su solicitud. Vea los errores detallados.</div>' + error);
        }
    });

    return false;
}