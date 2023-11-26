import React from "react";

//components
import { HeaderBreadcrumbs, ProductForm, Toolbar, Page } from "src/components";
// notification
import toast from "react-hot-toast";
// api
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";

export default function Create() {
  const { t } = useTranslation(["product", "common"]);

  const { data, isLoading } = useQuery("categories", api.getAllCategories, {
    onError: (err) => {
      toast.error(
        t(`common:errors.${err.response.data.message}`) ||
          "Something went wrong!"
      );
    },
  });

  const { data: brandData, isLoading: brandLoading } = useQuery(
    "brands",
    api.getAllBrands,
    {
      onError: (err) => {
        toast.error(
          t(`common:errors.${err.response.data.message}`) ||
            "Something went wrong!"
        );
      },
    }
  );

  return (
    <Page title={`Add Product | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: t("dashboard"), href: "/" },
            { name: t("products"), href: "/products" },
            { name: t("add") },
          ]}
        />
      </Toolbar>
      <ProductForm
        isLoading={isLoading}
        categories={isLoading ? [] : data?.data}
        brandData={isLoading ? [] : brandData?.data}
        brandLoading={brandLoading}
      />
    </Page>
  );
}
