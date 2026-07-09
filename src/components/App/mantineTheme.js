export const themeConfig = {
  colorScheme: "light",
  fontFamily: "Sans Serif, Arial, Helvetica, sans-serif",
  primaryColor: "blue",
  colors: {
    white: [
      "#fff",
      "#fff",
      "#fff",
      "#fff",
      "#fff",
      "#fff",
      "#fff",
      "#fff",
      "#fff",
      "#fff",
    ],
    linkGreen: [
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
      "#2C4C4C",
    ],
  },
  headings: {
    fontFamily: "Sans Serif, Arial, Helvetica, sans-serif",
  },
  components: {
    Button: {
      defaultProps: {
        // variant: "gradient",
        variant: "outline",
        size: "xs",
        color: "white",
        radius: "md",
      },
    },
    Switch: {
      defaultProps: {
        size: "xs",
        onLabel: "ON",
        offLabel: "OFF",
      },
    },
    Drawer: {
      defaultProps: {
        position: "left",
      },
    },
  },
};
