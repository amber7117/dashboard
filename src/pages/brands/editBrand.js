import React from "react";
// react router dom
import { useParams, useNavigate } from "react-router-dom";
//components
import {
  HeaderBreadcrumbs,
  BrandsForm,
  Page,
  Toolbar,
} from "src/components";
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function UpdateBrands() {
  const { t } = useTranslation("brand");
  const { bid } = useParams();
  const navigate = useNavigate();
  const { data: brand, isLoading } = useQuery(
    ["update-brand", bid],
    () => api.getBrand(bid),
    {
      enabled: Boolean(bid),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );
  const data = brand?.data;
  return (
    <Page title={`Edit Brand | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Brands List"
          links={[
            {
              name: t("dashboard"),
              href: "/dashboard",
            },
            {
              name: t("brands"),
              href: "/brands",
            },
            {
              name: t("edit"),
              href: "",
            },
          ]}
        />
      </Toolbar>
      <BrandsForm currentCategory={data} categoryLoading={isLoading} />
    </Page>
  );
}
