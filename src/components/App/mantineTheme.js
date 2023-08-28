export const themeConfig = {
  colorScheme: "dark",
  primaryColor: "blue",
  fontFamily: "roboto, sans-serif",
  components: {
    Button: {
      defaultProps: {
        size: "xs",
        color: "green",
        radius: "lg",
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
