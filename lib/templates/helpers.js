
getI18nText = function(templateName, fieldName){
    return geti18nSetting(templateName, GDPRconfig.language, fieldName);
};

Template.registerHelper('getI18nText', function (fieldName) {
    const templateRef = Template.instance().view.name;
    const CamelCaseTemplate = templateRef.split(".")[1];
    const templateName = CamelCaseTemplate.charAt(0).toLowerCase() + CamelCaseTemplate.slice(1);
    return getI18nText(templateName,fieldName);
});
