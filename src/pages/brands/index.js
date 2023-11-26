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
  BrandsCard,
  Table,
  BrandsRow,
} from "src/components";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "brands", alignRight: false, sort: true },
  { id: "description", label: "description", alignRight: false },
  { id: "createdAt", label: "created-at", alignRight: false, sort: true },
  { id: "", label: "actions", alignRight: true },
];

// ----------------------------------------------------------------------
export default function EcommerceBrandsList() {
  const { t } = useTranslation(["brand", "common"]);

  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data, isLoading } = useQuery(
    ["brands", apicall, searchParam, pageParam],
    () => api.getBrands(+pageParam || 1, searchParam || ""),
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
  console.log(data, "brands");
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteBrand"
          type={t("common:brand-deleted")}
          deleteMessage={t("delete-message")}
        />
      </Dialog>
      <Page title={`Brands | ${process.env.REACT_APP_DOMAIN_NAME}`}>
        <Toolbar>
          <HeaderBreadcrumbs
            heading="Brands List"
            links={[
              {
                name: t("dashboard"),
                href: "/",
              },
              {
                name: t("brands"),
                href: "/brands",
              },
            ]}
            action={{
              href: `/brands/add`,
              title: t("add-brands"),
            }}
          />
        </Toolbar>
        <Table
          headData={TABLE_HEAD}
          data={data}
          mobileRow={BrandsCard}
          isLoading={isLoading}
          row={BrandsRow}
          handleClickOpen={handleClickOpen}
        />
      </Page>
    </>
  );
}
