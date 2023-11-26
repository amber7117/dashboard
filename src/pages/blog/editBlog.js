import React from "react";
// react router dom
import { useParams, useNavigate } from "react-router-dom";
//components
import {
  HeaderBreadcrumbs,
  BlogForm,
  Page,
  Toolbar,
} from "src/components";
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function UpdateBlog() {
  const { t } = useTranslation("brand");
  const { blid } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading } = useQuery(
    ["update-blog-categories", blid],
    () => api.getBlogCategory(blid),
    {
      enabled: Boolean(blid),
      retry: false,
      onError: (error) => {
        if (!error.response.data.success) {
          navigate("/404");
        }
      },
    }
  );
  const data = blog?.data;
  return (
    <Page title={`Edit Blog Categories | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="Blog Categories List"
          links={[
            {
              name: t("dashboard"),
              href: "/dashboard",
            },
            {
              name: t("Blog Categories"),
              href: "/blog/blog-categories",
            },
            {
              name: t("edit"),
              href: "",
            },
          ]}
        />
      </Toolbar>
      <BlogForm currentCategory={data} categoryLoading={isLoading} />
    </Page>
  );
}
