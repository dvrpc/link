export const themeConfig = {
  colorScheme: "dark",
  primaryColor: "blue",
  fontFamily: "Courier New",
  headings: {
    fontFamily: "Courier New",
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
