import React from "react";
import { useQuery } from "react-query";
import * as api from "src/services";

//components
// toast
import toast from "react-hot-toast";
import { HeaderBreadcrumbs, ProductForm, Toolbar, Page } from "src/components";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function EcommerceProduct() {
  const { pid } = useParams();
  const { t } = useTranslation(["product", "common"]);
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery(
    ["get-product-details"],
    () => api.getProductDetails(pid),
    {
      enabled: Boolean(pid),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );

  const { data, isLoading: categoryLoading } = useQuery(
    "categories",
    api.getAllCategories,
    {
      onError: (err) => {
        toast.error(
          t(`common:errors.${err.response.data.message}`) ||
            "Something went wrong!"
        );
      },
    }
  );

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
    <Page title={`Edit Product | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Edit Product"
          links={[
            { name: t("dashboard"), href: "/" },
            { name: t("products"), href: "/products" },
            { name: t("edit") },
          ]}
        />
      </Toolbar>

      <ProductForm
        categories={data?.data}
        categoryLoading={categoryLoading}
        currentProduct={product?.data}
        isInitialized={isLoading}
        brandData={isLoading ? [] : brandData?.data}
        brandLoading={brandLoading}
      />
    </Page>
  );
}
