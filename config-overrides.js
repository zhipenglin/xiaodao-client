const { getLoader, loaderNameMatches } = require("react-app-rewired");
module.exports = function override(config, env) {
    const oneOfRule = config.module.rules.find(
        rule => rule.oneOf !== undefined,
    );

    const loaderOptions={
        remUnit: 75,
        remPrecision: 8
    };

    const createRule = (rule, cssRules) => {
        if (env === "production") {
            return {
                ...rule,
                loader: [
                    ...cssRules.loader,
                    { loader: "px2rem-loader", options: loaderOptions },
                ],
            };
        } else {
            return {
                ...rule,
                use: [
                    ...cssRules.use,
                    { loader: "px2rem-loader", options: loaderOptions },
                ],
            };
        }
    };

    const cssRules = createRule(
        {
            test: /\.css$/
        },
        getLoader(
            config.module.rules,
            rule => String(rule.test) === String(/\.css$/),
        ),
    );

    if (oneOfRule) {
        oneOfRule.oneOf.unshift(cssRules);
    } else {
        config.module.rules.push(cssRules);
    }
    return config;
};
