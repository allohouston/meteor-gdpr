# meteor-gdpr
GDPR package for the meteor framework. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Disclaimer](#disclaimer)
- [Introduction](#introduction)
- [Requirements](#requirements)
- [How to use](#how-to-use)
  - [Email personalization](#email-personalization)
  - [Customization of the texts](#customization-of-the-texts)
  - [User personal data](#user-personal-data)
- [Contributions](#contributions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Disclaimer
We are not lawyers, you cannot rely only on using this package to be GDPR compliant. You can find official reglementation [here](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en). We advise you to read and understand the whereabouts before using the package.

## Introduction
This packages helps you comply with GDPR. It includes : 
* a modal presenting a customizable opt-in window to users, which should contain :
    - which personal data you collect 
    - which entity is collecting the data
    - information about the purpose of personal data collection
    - personal data conservation rules
    - rights of the user about his data
    - it could also contain your app Terms of Service
    
* access to a profile center (overlay div) which includes
    - first name, last name, picture
    - last connexion date
    - disconnect button
    - ability to contact you by email (using an in-app form) to ask for access, modification or deletion of personal data


## Requirements
This package requires the [simpl-schema](https://github.com/aldeed/simple-schema-js) NPM package @1.4.3, which defines the schema syntax and provides the validation logic.

This packages requires the definition of the `MAIL_URL` variable to send emails.

## How to use
Create a template containing all the information you want to display in the opt-in window, you can name it as you wish. Here we name it `OptInTemplate`. Import it in your app.
```javascript
import "/imports/ui/components/optInTemplate/optInTemplate.js"
```

Add the following in your app to activate the package
```html
{{> ProfileName optIn="OptInTemplate"}}
```

You can add an extraTemplate on the lower part of the Profile window (you could use it to include some more details about the user on the lower part)
```html
{{> ProfileName optIn="OptInTemplate" extraTemplate="TemplateName"}}
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
Two languages are built-in : english `en` and french `fr`. Anyway you need to review and personalize the texts presented according to your entity. The reference files are available in `lib/i18n`, we encourage you to copy and modify it in your app.

You can add as many translation as you want. If you add the same language twice, the previous insert is overriden

The last language inserted is used. If you want a previously inserted language, do as follow

```javascript
GDPRconfig.language = 'wanted language (2 letters)';
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
});
```


## Contributions
Contributions are welcome, please post issues or pull requests! This package has been created in May 2018. We tried to make it generic and easy to use to help other people who where struggling with GDPR, but it is surely not perfect. We will be very happy to see its use and functionalities growing.

Please respect the code style when contributing.

