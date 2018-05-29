/**
 * Global helpers to handle the i18n
 */

getI18nText = function (templateName, fieldName) {
    const targetData = GDPRconfig.ui[templateName];
    if (targetData && targetData[GDPRconfig.language]) {
        return targetData[GDPRconfig.language][fieldName];
    }
};

Template.registerHelper('getI18nText', function (fieldName) {
    const templateRef = Template.instance().view.name;
    const CamelCaseTemplate = templateRef.split(".")[1];
    const templateName = CamelCaseTemplate.charAt(0).toLowerCase() + CamelCaseTemplate.slice(1);
    return getI18nText(templateName, fieldName);
});
