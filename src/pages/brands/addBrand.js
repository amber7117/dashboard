import React from "react";
import {
  HeaderBreadcrumbs,
  BrandsForm,
  Page,
  Toolbar,
} from "src/components";
import { useTranslation } from "react-i18next";

export default function CreateBrands() {
  const { t } = useTranslation("categories");
  return (
    <Page title={`Add Category | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Categories List"
          links={[
            {
              name: t("dashboard"),
              href: "/dashboard",
            },
            {
              name: t("categories"),
              href: "/categories/main-categories",
            },
            {
              name: t("add"),
              href: "/",
            },
          ]}
        />
      </Toolbar>
      <BrandsForm />
    </Page>
  );
}
