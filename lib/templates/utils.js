geti18nSetting = function (target, lg, field) {
    const targetData = GDPRconfig.ui[target];
    if (targetData && targetData[lg]) {
        return targetData[lg][field];
    }
};