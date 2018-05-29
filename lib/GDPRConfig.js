/**
 * Client-sided file allowing for a customizable UI (i18n-like)
 */

import SimpleSchema from 'simpl-schema';

const i18n = new SimpleSchema({
    language: {type: String, max: 2, min: 2},
    consentWindow: Object,
    'consentWindow.title': {type: String},
    'consentWindow.confirmationBox': {type: String},
    'consentWindow.validationBtn': {type: String},
    profileWindow: Object,
    'profileWindow.title': {type: String},
    'profileWindow.lastConnection': {type: String},
    'profileWindow.lastConnectionMomentFormat': {type: String},
    'profileWindow.contactBtn': {type: String},
    'profileWindow.closeBtn': {type: String},
    'profileWindow.legalNotice': {type: String},
    contactForm: Object,
    'contactForm.title': {type: String},
    'contactForm.email': {type: String},
    'contactForm.subject': {type: String},
    'contactForm.change': {type: String},
    'contactForm.access': {type: String},
    'contactForm.delete': {type: String},
    'contactForm.comment': {type: String},
    'contactForm.validationBtn': {type: String},
});

const userFields = new SimpleSchema({
    firstName: {type: String},
    lastName: {type: String},
    picture: {type: String},
    email: {type: String},
});

GDPRconfig = {
    ui: {
        consentWindow: {},
        profileWindow: {},
        contactForm: {},
    },
    addi18n: function (config) {
        try {
            i18n.validate(config);
        }
        catch (e) {
            console.error('GDPRconfig.addi18n()', e.message);
        }

        GDPRconfig.language = config.language;
        GDPRconfig.ui.consentWindow[config.language] = config.consentWindow;
        GDPRconfig.ui.profileWindow[config.language] = config.profileWindow;
        GDPRconfig.ui.contactForm[config.language] = config.contactForm;
    },

    setUserFields(config) {
        try {
            userFields.validate(config);
        }
        catch (e) {
            console.error('GDPRconfig.setUserFields()', e.message);
        }

        GDPRconfig.user = config;
    }
};


GDPRconfig.setUserFields({
    firstName: 'profile.firstName',
    lastName: 'profile.lastName',
    picture: 'profile.picture',
    email: "profile.email"
});