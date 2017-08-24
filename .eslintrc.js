module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": ["error", 4, {"SwitchCase": 1}],
        "comma-dangle": ["error", "never"],
        "react/jsx-indent": ["error", 'tab'|4],
        "react/jsx-indent-props": ["error", 'tab'|4],
        "max-len": ["error", 180],
        "import/no-extraneous-dependencies": ["error", {
                "devDependencies": true,
                "optionalDependencies": false,
                "peerDependencies": false
            }],
        // 首字母不必大写
        "new-cap": "off",
        "global-require": "off",
        'jsx-a11y/no-static-element-interactions': [
            'off',
            {
                handlers: [
                    'onClick',
                    'onMouseDown',
                    'onMouseUp',
                    'onKeyPress',
                    'onKeyDown',
                    'onKeyUp',
                ],
            },
        ],
        "no-underscore-dangle": ["off", { "allow": ["foo_", "_bar"] }]
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    }
};
