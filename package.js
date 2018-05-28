Package.describe({
    name: 'yellowsquare:gdpr',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/yellowsquaresas/meteor-gdpr',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Npm.depends({"moment": "2.22.1", "simpl-schema": "1.4.3", "@jkhong/devutils": "1.0.0"});

Package.onUse(function (api) {
    api.versionsFrom('1.4');
    api.use([
        'underscore',
        'ecmascript',
        'mdg:validated-method',
        'ziarno:restrict-mixin',
        'accounts-base',
        'accounts-password',
        'aldeed:collection2@3.0.0'
    ]);

    api.use([
        'templating',
    ], 'client');

    api.addFiles('lib/templates/GDPR.js', 'client');

    // server files to expose
    api.addFiles([
        // publications
        'lib/api/user/server/publication.js',
        // methods
        'lib/api/user/methods.js',
        'lib/api/request/methods.js',

    ], 'server');

    api.addFiles('lib/GDPR.js', 'client');
    api.export('GDPRconfig', 'client');

});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('yellowsquare:gdpr');
    api.mainModule('gdpr-tests.js');
});