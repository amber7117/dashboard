// ----------------------------------------------------------------------

export default function Card(theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: theme.customShadows.z16,
          borderRadius: theme.shape.borderRadiusSm,
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius,
          // border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            "0px 10px 32px -4px rgba(19, 25, 39, 0.10), 0px 6px 14px -6px rgba(19, 25, 39, 0.12)",
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: {
          variant: "body2",
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
