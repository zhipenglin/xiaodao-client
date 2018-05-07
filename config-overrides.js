module.exports = function override(config, env) {
    config.module.rules[1]['oneOf'][2]['use'].push({
        loader:'px2rem-loader',
        options: {
            remUnit: 75,
            remPrecision: 8
        }
    });
    return config;
}