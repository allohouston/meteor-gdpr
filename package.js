Package.describe({
    name: 'yellowsquare:gdpr',
    version: '1.0.0',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/yellowsquaresas/meteor-gdpr',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Npm.depends({
    "moment": "2.22.1",
    "simpl-schema": "1.4.3",
    "jquery": "3.3.1",
});

Package.onUse(function (api) {
    api.versionsFrom('1.4');
    api.use([
        'underscore',
        'less',
        'ecmascript',
        'mdg:validated-method',
        'ziarno:restrict-mixin',
        'accounts-base',
        'accounts-password',
        'aldeed:collection2@3.0.0',
        'twbs:bootstrap',
        'email',
    ]);

    api.use([
        'templating',
    ], 'client');

    api.use('themeteorchef:bert');

    // files in API used in both contexts
    api.addFiles([
        'lib/api/request/index.js',
        'lib/api/user/index.js',
        'lib/api/user/methods.js',
    ], ["client", "server"]);

    // server side configuration and object
    api.addFiles([
        // publications
        'lib/api/user/server/publication.js',
        // server side methods
        'lib/api/request/server/methods.js',

        'lib/api/server/index.js',
    ], 'server');
    api.export('GDPR', ['client', 'server']);


    // client side templates
    api.addFiles('lib/templates/profileName/profileName.js', 'client');

    // client side configuration :
    api.addFiles('lib/GDPRConfig.js', 'client');
    //api.addFiles('lib/i18n/en.js', 'client');
    api.addFiles('lib/i18n/fr.js', 'client');
    api.export('GDPRconfig', 'client');

});

Package.onTest(function (api) {
    api.use(['ecmascript', 'mongo', 'meteortesting:mocha', 'practicalmeteor:chai', 'johanbrook:publication-collector']);
    api.use('yellowsquare:gdpr');
    api.mainModule('gdpr-tests.js');
});

