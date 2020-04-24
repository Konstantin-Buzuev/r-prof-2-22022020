module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2019,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "parser": "babel-eslint",
    "rules": {
        "react/prop-types": "off",
        "semi": "warn",
        "no-unused-vars": "warn",
        "react/state-in-constructor": "off",
        "react/no-string-refs": "warn",
        "no-empty": "warn",
        "no-undef": "warn",
    }
};