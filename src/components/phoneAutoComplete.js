import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Box from "@mui/material/Box";
import useDirection from "src/hooks/useDirection";
import { useTranslation } from "react-i18next";

export default function phoneAutocomplete({ ...props }) {
  const { setFieldValue, phone } = props;
  const [focus, setfocus] = React.useState(false);
  const { t } = useTranslation("setting");
  const themeDirection = useDirection();
  return (
    <Box
      specialLabel={t("phone")}
      component={PhoneInput}
      sx={{
        direction: themeDirection === "rtl" ? "rtl" : "ltr",
        "& .special-label": {
          bgcolor: (theme) => theme.palette.background.paper,
          left: themeDirection === "rtl" ? 8 : 8,
          right: themeDirection === "rtl" ? "auto" : "auto",
          color: (theme) => theme.palette.grey[500],
          ...(focus && {
            color: (theme) => theme.palette.primary.main,
          }),
        },
        input: {
          bgcolor: (theme) => theme.palette.background.paper + "!important",
          borderColor: (theme) => theme.palette.divider + "!important",
          borderRadius: "8px",
          width: "100%!important",
          color: (theme) => theme.palette.text.primary,
          "&:hover": {
            borderColor: (theme) => theme.palette.text.primary + "!important",
          },
          "&:focus": {
            borderColor: (theme) => theme.palette.primary.main + "!important",
          },
        },
        "& .country-list ": {
          bgcolor: (theme) => theme.palette.background.default + "!important",
          border: (theme) => "1px solid " + theme.palette.primary.main,
          px: 1,
        },
        "& .country-list .country:hover, .country.highlight": {
          bgcolor: (theme) => theme.palette.primary.light + "!important",
          // border: (theme) => "1px solid " + theme.palette.primary.main,
          borderRadius: "8px",
        },
      }}
      country={"us"}
      onBlur={() => setfocus(false)}
      onFocus={() => setfocus(true)}
      //   defaultErrorMessage="asdasd"
      inputProps={{
        error: true,
        required: true,
      }}
      value={phone}
      onChange={(v) => setFieldValue("phone", v)}
    />
  );
}
