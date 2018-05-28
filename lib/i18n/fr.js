import {GDPRConfig} from '../GDPRConfig.js';

GDPRconfig.addi18n({
    language: 'fr',
    consentWindow: {
        title: 'Votre consentement est demandé',
        content: '<div>Les informations recueillies par l\'application : nom, prénom, email **[liste paramétrable]** sont enregistrées dans un fichier informatisé par Yellow Square SAS au capital de 3000 euros, immatriculée au RCS Paris sous le numéro 822 170 007, dont le siège social est situé 110 quai de Jemmapes, 75010 Paris pour permettre l\'identification et l\'authentification des utilisateurs et de garantir un bon fonctionnement de l\'application.</div><hr><div>Elles sont conservées pendant la durée de fonctionnement de l\'application **[paramétrable ?]** et ne sont pas transmises à d\'autres organismes **[paramétrable ?]**</div><div>Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d\'accès aux données vous concernant et les faire rectifier en utilisant le formulaire de contact intégré à l\'application (par un clic sur votre nom), ou bien en contactant contact@yellowsquare.fr **[paramétrable]**.</div>',
        confirmationBox: "J'ai lu et j'accepte",
        validationBtn: 'Je valide'
    },
    profileWindow: {
        title: 'Votre profil',
        lastConnection: 'Dernière connexion le :',
        lastConnectionMomentFormat: 'DD/MM/YYYY, HH:mm',
        contactBtn: 'Contact',
        closeBtn: 'Fermer',
        legalNotice: "Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en utilisant le bouton de contact ci dessous : "
    },
    contactForm: {
        title: 'Contactez nous',
        email: 'Votre email :',
        subject: 'Objet de votre demande :',
        change: 'Je veux modifier mes données personnelles',
        access: 'Je veux l\'accès à mes données personnelles',
        delete: 'Je veux supprimer mes données personnelles',
        comment: 'Votre message :',
        validationBtn: 'Je valide'
    }
});