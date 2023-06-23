module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: [
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  rules: {
    "import/order": "off",
    "react-hooks/exhaustive-deps": "error",
    "prettier/prettier": ["warn", {
      "tabWidth": 4,
    }],
  },
};
