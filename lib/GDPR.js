import SimpleSchema from 'simpl-schema';

const i18n = new SimpleSchema({
    language: {type: String, max: 2, min: 2},
    consentWindow: Object,
    'consentWindow.title': {type: String},
    'consentWindow.content': {type: String},
    'consentWindow.confirmationBox': {type: String},
    'consentWindow.validationBtn': {type: String},
    profileWindow: Object,
    'profileWindow.title': {type: String},
    'profileWindow.lastConnection': {type: String},
    'profileWindow.contactBtn': {type: String},
    'profileWindow.closeBtn': {type: String},
    contactForm: Object,
    'contactForm.email': {type: String},
    'contactForm.subject': {type: String},
    'contactForm.change': {type: String},
    'contactForm.access': {type: String},
    'contactForm.delete': {type: String},
    'contactForm.comment': {type: String},
    'contactForm.validationBtn': {type: String}
});

const userFields = new SimpleSchema({
    firstname: {type: String},
    lastname: {type: String},
    picture: {type: String}
});

GDPRconfig = {
    language: 'fr',
    ui: {
        consentWindow: {
            fr: {
                title: 'Votre consentement est demandé',
                content: '<div>Les informations recueillies par l\'application : nom, prénom, email **[liste paramétrable]** sont enregistrées dans un fichier informatisé par Yellow Square SAS au capital de 3000 euros, immatriculée au RCS Paris sous le numéro 822 170 007, dont le siège social est situé 110 quai de Jemmapes, 75010 Paris pour permettre l\'identification et l\'authentification des utilisateurs et de garantir un bon fonctionnement de l\'application.</div><hr><div>Elles sont conservées pendant la durée de fonctionnement de l\'application **[paramétrable ?]** et ne sont pas transmises à d\'autres organismes **[paramétrable ?]**</div><div>Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d\'accès aux données vous concernant et les faire rectifier en utilisant le formulaire de contact intégré à l\'application (par un clic sur votre nom), ou bien en contactant contact@yellowsquare.fr **[paramétrable]**.</div>',
                confirmationBox: "J'ai lu et j'accepte",
                validationBtn: 'Je valide'
            }
        },
        profileWindow: {
            fr: {
                title: 'Votre profil',
                lastConnection: ' Dernière connexion',
                contactBtn: 'Contact',
                closeBtn: 'Fermer'
            }
        },
        contactForm: {
            fr: {
                email: 'Votre email',
                subject: 'Objet de votre demande',
                change: 'Je veux modifier mes données personnelles',
                access: "Je veux l'accès à mes données personnelles",
                delete: 'Je veux supprimer mes données personnelles',
                comment: 'Votre message',
                validationBtn: 'Je valide'
            }
        }
    },
    user: {
        firstname: 'profile.firstname',
        lastname: 'profile.lastname',
        picture: 'profile.picture',
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