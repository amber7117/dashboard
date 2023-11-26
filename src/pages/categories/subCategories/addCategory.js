import React from "react";

//components
import {
  HeaderBreadcrumbs,
  SubCategoryForm,
  Page,
  Toolbar,
} from "src/components";
// notification
import toast from "react-hot-toast";
// api
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";

export default function CreateCategory() {
  const { t } = useTranslation(["categories", "common"]);

  const { data, isLoading } = useQuery("categories", api.getAllCategories, {
    onError: (err) => {
      toast.error(
        t(`common:errors.${err.response.data.message}`) ||
          "Something went wrong!"
      );
    },
  });
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
              name: t("sub-categories"),
              href: "/categories/sub-categories",
            },
            {
              name: t("add"),
              href: "/",
            },
          ]}
        />
      </Toolbar>
      <SubCategoryForm categories={isLoading ? [] : data?.data} />
    </Page>
  );
}
