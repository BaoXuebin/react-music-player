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
        "max-len": ["error", 180]
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    }
};
