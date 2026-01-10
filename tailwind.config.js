/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blue: {
        90: "#5f89ccff",
        50: "#a9c3eaff",
        10: "#b2c4d9ff",
      },
      red: {
        90: "#ED254E",
        50: "#F47B93",
        10: "#FAC6D1",
      },
      honeydew: {
        90: "#E1EFE6",
        50: "#F2F8F4",
        10: "#FFFFFF",
      },
      gray: {
        99: "#01040ca5",
        90: "#AEB7B3",
        50: "#D4D9D6",
        10: "#F4F5F5",
      },
      black: "#000411",
      white: "#ffffff",
    },
    extend: {
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
