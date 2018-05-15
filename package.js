Package.describe({
    name: 'yellowsquare:gdpr',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.4');
    api.use([
        'ecmascript',
        'mdg:validated-method',
        'accounts-base',
        'accounts-password'
    ]);

    api.use([
        'templating',
    ], 'client');

    api.add_files('lib/templates/GDPR.js', 'client');

    api.add_files('lib/server/index.js', 'server');

    api.mainModule('gdpr.js', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('yellowsquare:gdpr');
    api.mainModule('gdpr-tests.js');
});
