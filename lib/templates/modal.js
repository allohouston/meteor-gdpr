showConsent = function () {
    Meteor.setTimeout(function () {
        $('#ConsentModal').modal('show');
    }, 0);
};

hideConsent = function () {
    $('#ConsentModal').modal('hide');
};

showProfile = function () {
    $('#ProfileModal').modal('show');
};


