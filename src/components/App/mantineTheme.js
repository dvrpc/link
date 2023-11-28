export const themeConfig = {
  colorScheme: "dark",
  primaryColor: "blue",
  fontFamily: "Sans Serif, Arial, Helvetica, sans-serif",
  headings: {
    fontFamily: "Sans Serif, Arial, Helvetica, sans-serif",
  },
  components: {
    Button: {
      defaultProps: {
        // variant: "gradient",
        variant: "outline",
        size: "xs",
        color: "gray",
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
