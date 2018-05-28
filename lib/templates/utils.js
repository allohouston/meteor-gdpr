import DevUtils from '@jkhong/devutils';

geti18nSetting = function (target, lg, field) {
    const targetData = GDPRconfig.ui[target];
    return targetData[lg][field];
};