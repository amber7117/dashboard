// ----------------------------------------------------------------------

export default function Paper() {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 24,
      },

      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  };
}
