GDPR = {
    logout: function () {
        Meteor.logout();
    },
    afterGivingConsent : function () {
        console.log("consent")
    },
};