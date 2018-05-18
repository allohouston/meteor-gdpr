import DevUtils from '@jkhong/devutils';

geti18nSetting = function (target, lg, field) {
    const targetData = DevUtils.getField(GDPRconfig.ui, target, null);
    if (DevUtils.isNotSet(targetData)) {
        throw new DevError('GDPRconfig > 18n', `the object [${target}] is not defined in ui`);
    }
    const lgData = DevUtils.getField(targetData, lg, targetData.fr);
    if (DevUtils.isNotSet(lgData[field])) {
        throw new DevError('GDPRconfig > 18n', `the field [${field}] is not defined in ui.${target}.${lg}`);
    }
    return lgData[field];
};