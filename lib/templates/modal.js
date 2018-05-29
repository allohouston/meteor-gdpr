/**
 * Handling the ConsentModal
 */

showConsent = function () {
    Meteor.setTimeout(function () {
        $('#ConsentModal').modal('show');
    }, 0);
};

hideConsent = function () {
    $('#ConsentModal').modal('hide');
};

/**
 * Handling the ContactModal
 */

showContactForm = function () {
    $('#ContactForm').modal("show");
};

hideContactForm = function () {
    $('#ContactForm').modal("hide");
};

