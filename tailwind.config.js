/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            pattern: /bg-(red|green|blue|gray)-(400|500)/,
        },
    ],
};
