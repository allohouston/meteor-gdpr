showConsent = function () {
    $('#consentModal').modal('show');
};

hideConsent = function () {
    $('#consentModal').modal('hide');
};

showProfile = function () {
    $('#profileModal').modal('show');
};

// Poop code for bootstrap
initModal = function () {
    var cdnStyles = [
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    ];
    headFirstChild = document.querySelector('head').firstChild;

    for (var i = 0; i < cdnStyles.length; i++) {
        var style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', cdnStyles[i]);
        document.querySelector('head').insertBefore(style, headFirstChild);
    }

    $('head').append('<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>');

};

