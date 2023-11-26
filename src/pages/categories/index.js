import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// react router dom
import { useSearchParams } from "react-router-dom";
// notification
import toast from "react-hot-toast";
// api
import * as api from "src/services";
// usequery
import { useQuery } from "react-query";
// mui
import { Dialog } from "@mui/material";
// components
import {
  HeaderBreadcrumbs,
  DeleteDialog,
  Page,
  Toolbar,
  CategoryCard,
  Table,
  CategoryRow,
} from "src/components";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "category", alignRight: false, sort: true },
  { id: "name", label: "total-items", alignRight: false, sort: true },
  { id: "description", label: "description", alignRight: false },
  { id: "createdAt", label: "created-at", alignRight: false, sort: true },
  { id: "", label: "actions", alignRight: true },
];

// ----------------------------------------------------------------------
export default function EcommerceProductList() {
  const { t } = useTranslation(["categories", "common"]);

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data, isLoading } = useQuery(
    ["categories", apicall, searchParam, pageParam],
    () => api.getCategories(+pageParam || 1, searchParam || ""),
    {
      onError: (err) =>
        toast.error(
          t(`common:errors.${err.response.data.message}`) ||
            "Something went wrong!"
        ),
    }
  );

  const handleClickOpen = (props) => () => {
    setId(props);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(data, "categories");
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteCategory"
          type={t("common:category-deleted")}
          deleteMessage={t("delete-message")}
        />
      </Dialog>
      <Page title={`Categories | ${process.env.REACT_APP_DOMAIN_NAME}`}>
        <Toolbar>
          <HeaderBreadcrumbs
            heading="Categories List"
            links={[
              {
                name: t("dashboard"),
                href: "/",
              },
              {
                name: t("categories"),
                href: "/categories",
              },
            ]}
            action={{
              href: `/categories/main-categories/add`,
              title: t("add-category"),
            }}
          />
        </Toolbar>
        <Table
          headData={TABLE_HEAD}
          data={data}
          mobileRow={CategoryCard}
          isLoading={isLoading}
          row={CategoryRow}
          handleClickOpen={handleClickOpen}
        />
      </Page>
    </>
  );
}
