import React from "react";
import {
  HeaderBreadcrumbs,
  BlogForm,
  Page,
  Toolbar,
} from "src/components";
import { useTranslation } from "react-i18next";

export default function CreateBlog() {
  const { t } = useTranslation("categories");
  return (
    <Page title={`Add Blog Categories | ${process.env.REACT_APP_DOMAIN_NAME}`}>
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
              name: t("add"),
              href: "/",
            },
          ]}
        />
      </Toolbar>
      <BlogForm />
    </Page>
  );
}
