import { useState, useEffect } from "react";
// mui
import { Box } from "@mui/material";
// components
import { Page } from "src/components";
import HomeSlides from "./homeSlides";
import { useTranslation } from "react-i18next";

export default function MainSlides() {
  const [data, setData] = useState(false);
  const { t } = useTranslation("setting");
  return (
    <Page title={`Slides | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Box className="application" sx={{ m: "0 -16px" }}>
        <HomeSlides />
      </Box>
    </Page>
  );
}
