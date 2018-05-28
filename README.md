# meteor-gdpr
GDPR package for meteor framework

This package requires the [simpl-schema](https://github.com/aldeed/simple-schema-js) NPM package @1.4.3, which defines the schema syntax and provides the validation logic.


## uses
Add the following to your project template

```
{{> GDPR }}
```

### i18n
you can add i18n as follow

```
import { GDPRconfig } from 'meteor/yellowsquare:gdpr';

Meteor.startup(function () {
    GDPRconfig.addi18n({
        language: 'en',
        consentWindow: {
            title: 'You need to give your consent',
            content: 'some legal stuff',
            confirmationBox: "I've read and i agree",
            validationBtn: 'I validate'
        },
        profileWindow: {
            title: 'Your Profile',
            lastConnection: ' Last connection',
            contactBtn: 'Contact',
            closeBtn: 'Close'
        },
        contactForm: {
            email: 'Your email',
            subject: 'What do you want?',
            change: 'I want to change my data',
            access: "I want access to my data",
            delete: 'I want to delete my data',
            comment: 'Your message',
            validationBtn: 'I validate'
        }
    });
}
});
```
You can add as many translation as you want.

If you add the same language twice, the previous insert is overriden

The last language inserted is used. If you want a previously inserted language, do as follow

```
GDPRconfig.language = 'wanted language (2 letters)'
```

### user personal data
The package needs to access the user firstname, lastname and picture, from the user collection record.

Default values are :

```
{
    firstname: 'profile.firstname',
    lastname: 'profile.lastname',
    picture: 'profile.picture'
}
```

But you can set your values as follow :

```
GDPRconfig.setUserFields({
    firstname: 'personalData.FirstName',
    lastname: 'personalData.surname',
    picture: 'avatar'
})
```


