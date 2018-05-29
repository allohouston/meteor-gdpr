# meteor-gdpr
GDPR package for the meteor framework. 

This packages helps you comply with GDPR. It includes : 
- presentation to users of a customizable opt-in window that they are forced to validate to use the app
- access to a profile center including first name, last name, picture, last connexion date, disconnect button
- ability to contact you by email (using a form) to ask for access, modification or deletion of personnal data


## Requirements
This package requires the [simpl-schema](https://github.com/aldeed/simple-schema-js) NPM package @1.4.3, which defines the schema syntax and provides the validation logic.

This packages requires the definition of the `MAIL_URL` variable to send emails.

## How to use
Add the following to your project template

```html
{{> ProfileName }}
```

You can add an extraTemplate on the lower part of the Profile window (you could use it to include some more details about the user on the lower part)
```html
{{> ProfileName extraTemplate="TemplateName"}}
```

### Email personalization

In your `imports/startup/server/index.js` file :
```javascript
GDPR.addServerConfig({
    emailSender: "no-reply@app.com",
    emailTo: "contact@app.com"
});
```

### Customization of the texts
Two languages are built-in : english and french. Anyway you need to review and personnalize the texts presented according to your entity.

You can add or modify a translation as follow

```javascript
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

```javascript
GDPRconfig.language = 'wanted language (2 letters)'
```

### User personal data
The package needs to access the user firstname, lastname and picture, from the user collection record.

Default values are :

```javascript
{
    firstname: 'profile.firstname',
    lastname: 'profile.lastname',
    picture: 'profile.picture'
}
```

But you can set your values as follow :

```javascript
GDPRconfig.setUserFields({
    firstname: 'personalData.FirstName',
    lastname: 'personalData.surname',
    picture: 'avatar'
})
```


