import * as Yup from "yup";
import React from "react";
import toast from "react-hot-toast";
import { capitalCase } from "change-case";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Chip,
  Grid,
  Stack,
  Select,
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  RadioGroup,
  Radio,
} from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import * as api from "src/services";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import configData from "src/configData";
import { useTranslation } from "react-i18next";
import ProductVariantsForm from "./productVariantsForm";
import { VariantCard } from "src/components/cards";
import TextGenerator from "src/components/textGenerator";

// ----------------------------------------------------------------------
const { GENDER_OPTION, STATUS_OPTIONS, TAGS_OPTION, SIZE, COLOR } = configData;
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  span: {
    fontSize: 12,
    float: "right",
    fontWeight: 400,
  },
}));

// ----------------------------------------------------------------------

export default function ProductForm({
  categories,
  currentProduct,
  categoryLoading,
  isInitialized,
  brandData,
  brandLoading,
}) {
  const [open, setOpen] = React.useState(false);
  const [del, setDel] = React.useState(null);
  const { t } = useTranslation("product");
  const { pid } = useParams();
  const navigate = useNavigate();
  const { mutate, isLoading: updateLoading } = useMutation(
    pid ? "update" : "new",
    pid ? api.updateProduct : api.newProduct,
    {
      onSuccess: (data) => {
        toast.success(
          pid
            ? t(`common:errors.${data.message}`)
            : t(`common:errors.${data.message}`)
        );
        navigate("/products");
      },
      onError: (error) => {
        toast.error(t(`common:errors.${error.message}`));
      },
    }
  );
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(t("name-is-required")),
    code: Yup.string().required(t("code-is-required")),
    tags: Yup.array().min(1, t("tags-is-required")),
    status: Yup.string().required(t("status-is-required")),
    description: Yup.string().required(t("description-is-required")),
    category: Yup.string().required(t("category-is-required")),
    slug: Yup.string().required(t("slug-is-required")),
    brand: Yup.string().required(t("brand-is-required")),
    metaTitle: Yup.string().required(t("meta-name-is-required")),
    metaDescription: Yup.string().required(t("description-is-required")),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      variants: currentProduct?.variants || [],
      code: currentProduct?.code || "",
      slug: currentProduct?.slug || "",
      metaTitle: currentProduct?.metaTitle || "",
      metaDescription: currentProduct?.metaDescription || "",
      brand: currentProduct?.brand || brandData[0]?._id || "",
      tags: currentProduct?.tags || [],
      gender: currentProduct?.gender || "",
      category:
        currentProduct?.category || (categories && categories[0]?._id) || "",
      subCategory: currentProduct?.subCategory || "",
      status: currentProduct?.status || STATUS_OPTIONS[0],
      blob: currentProduct?.blob || [],
      isFeatured: currentProduct?.isFeatured || false,
      selectedIndex: null,
      selectedVariant: 0,
    },

    validationSchema: NewProductSchema,
    onSubmit: async (values) => {
      const { blob, category, selectedIndex, ...rest } = values;
      try {
        const date = new Date().toISOString();
        mutate({
          ...rest,
          category: category,
          createdAt: date,
          priceSale: values.priceSale || values.price,
          ...(pid && { id: pid }),
        });
        console.log(values);
      } catch (error) {
        console.error(error);
      }
    },
  });
  const {
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleClickOpen = () => {
    setFieldValue("selectedIndex", null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setDel(null);
  };
  console.log(currentProduct, "asdasd");
  return (
    <Stack spacing={3}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Typography variant="h4" color="text.primary">
                      {pid ? t("edit-products") : t("add-products")}
                    </Typography>
                    <div>
                      {isInitialized ? (
                        <Skeleton variant="text" width={140} />
                      ) : (
                        <LabelStyle>{t("product-name")}</LabelStyle>
                      )}
                      {isInitialized ? (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={56}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          {...getFieldProps("name")}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      )}
                    </div>
                    <div>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={100} />
                            ) : (
                              <LabelStyle>{t("category")}</LabelStyle>
                            )}
                            {!categoryLoading ? (
                              <Select
                                native
                                {...getFieldProps("category")}
                                value={values.category}
                                id="grouped-native-select"
                              >
                                {categories?.map((category) => (
                                  // <optgroup
                                  //   label={capitalCase(category.name)}
                                  //   key={Math.random()}
                                  // >

                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </option>

                                  // </optgroup>
                                ))}
                              </Select>
                            ) : (
                              <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={56}
                              />
                            )}
                            {touched.category && errors.category && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched.category && errors.category}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={120} />
                            ) : (
                              <LabelStyle>{t("sub-category")}</LabelStyle>
                            )}
                            {!categoryLoading ? (
                              <Select
                                // inputProps={{ readOnly: true }}
                                // disabled
                                native
                                {...getFieldProps("subCategory")}
                                value={values.subCategory}
                                id="grouped-native-select"
                              >
                                <option value={""}>
                                  <em>None</em>
                                </option>
                                {categories
                                  ?.find((cat) => cat._id === values.category)
                                  ?.subCategories?.map((subCategory) => (
                                    <option
                                      key={subCategory._id}
                                      value={subCategory?._id}
                                    >
                                      {subCategory.name}
                                    </option>
                                  ))}
                              </Select>
                            ) : (
                              <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={56}
                              />
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={100} />
                            ) : (
                              <LabelStyle>{t("brand")}</LabelStyle>
                            )}
                            {!brandLoading ? (
                              <Select
                                native
                                {...getFieldProps("brand")}
                                value={values.brand}
                                id="grouped-native-select"
                              >
                                {brandData?.map((brand) => (
                                  <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                  </option>
                                ))}
                              </Select>
                            ) : (
                              <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={56}
                              />
                            )}
                            {touched.brand && errors.brand && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched.brand && errors.brand}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={80} />
                            ) : (
                              <LabelStyle>{t("gender")}</LabelStyle>
                            )}
                            {isInitialized ? (
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={56}
                              />
                            ) : (
                              <Select
                                native
                                {...getFieldProps("gender")}
                                error={Boolean(touched.gender && errors.gender)}
                              >
                                <option value={""}>
                                  <em>None</em>
                                </option>
                                {GENDER_OPTION.map((gender) => (
                                  <option key={gender} value={gender}>
                                    {capitalCase(gender)}
                                  </option>
                                ))}
                              </Select>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            {isInitialized ? (
                              <Skeleton variant="text" width={80} />
                            ) : (
                              <LabelStyle>{t("status")}</LabelStyle>
                            )}
                            {isInitialized ? (
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={56}
                              />
                            ) : (
                              <Select
                                native
                                {...getFieldProps("status")}
                                error={Boolean(touched.status && errors.status)}
                              >
                                <option value="" style={{ display: "none" }} />
                                {STATUS_OPTIONS.map((status) => (
                                  <option key={status} value={status}>
                                    {capitalCase(status)}
                                  </option>
                                ))}
                              </Select>
                            )}
                            {touched.status && errors.status && (
                              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                {touched.status && errors.status}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div>
                            {isInitialized ? (
                              <Skeleton variant="text" width={120} />
                            ) : (
                              <LabelStyle>{t("product-code")}</LabelStyle>
                            )}
                            {isInitialized ? (
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={56}
                              />
                            ) : (
                              <TextField
                                fullWidth
                                {...getFieldProps("code")}
                                error={Boolean(touched.code && errors.code)}
                                helperText={touched.code && errors.code}
                              />
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          {isInitialized ? (
                            <Skeleton variant="text" width={70} />
                          ) : (
                            <LabelStyle>{t("tags")}</LabelStyle>
                          )}
                          {isInitialized ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={56}
                            />
                          ) : (
                            <Autocomplete
                              multiple
                              freeSolo
                              value={values.tags}
                              onChange={(event, newValue) => {
                                setFieldValue("tags", newValue);
                              }}
                              options={[]}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    {...getTagProps({ index })}
                                    key={option}
                                    size="small"
                                    label={option}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={Boolean(touched.tags && errors.tags)}
                                  helperText={touched.tags && errors.tags}
                                />
                              )}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <div>
                            {isInitialized ? (
                              <Skeleton variant="text" width={100} />
                            ) : (
                              <LabelStyle>{t("meta-title")}</LabelStyle>
                            )}
                            {isInitialized ? (
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={56}
                              />
                            ) : (
                              <TextGenerator
                                prompt="I need a meta title for a product without quotation "
                                touched={touched}
                                errors={errors}
                                values={values}
                                setFieldValue={setFieldValue}
                                getFieldProps={getFieldProps}
                                fieldName="metaTitle"
                              />
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      {isInitialized ? (
                        <Skeleton variant="text" width={120} />
                      ) : (
                        <LabelStyle> {t("description")} </LabelStyle>
                      )}
                      {isInitialized ? (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={240}
                        />
                      ) : (
                        <TextGenerator
                          prompt="I need a SEO description for my ecommerce website nextstore for a product attractive"
                          touched={touched}
                          errors={errors}
                          values={values}
                          setFieldValue={setFieldValue}
                          getFieldProps={getFieldProps}
                          fieldName="description"
                          rows={9}
                          multiline
                        />
                      )}
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3} pb={1}>
                  <div>
                    {isInitialized ? (
                      <Skeleton variant="text" width={70} />
                    ) : (
                      <LabelStyle> {t("slug")}</LabelStyle>
                    )}
                    {isInitialized ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={56}
                      />
                    ) : (
                      <TextGenerator
                        prompt="I need a slug for a product without spacing and quotation "
                        touched={touched}
                        errors={errors}
                        values={values}
                        setFieldValue={setFieldValue}
                        getFieldProps={getFieldProps}
                        fieldName="slug"
                      />
                    )}
                  </div>
                  <div>
                    {isInitialized ? (
                      <Skeleton variant="text" width={140} />
                    ) : (
                      <LabelStyle> {t("meta-description")} </LabelStyle>
                    )}
                    {isInitialized ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={240}
                      />
                    ) : (
                      <TextGenerator
                        prompt="I need a meta description for my ecommerce website nextstore for a product "
                        touched={touched}
                        errors={errors}
                        values={values}
                        setFieldValue={setFieldValue}
                        getFieldProps={getFieldProps}
                        fieldName="metaDescription"
                        rows={9}
                        multiline
                      />
                    )}
                  </div>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch {...getFieldProps("isFeatured")} />}
                        label={t("featured-product")}
                      />
                    </FormGroup>
                  </div>
                  <div>
                    {values?.variants?.length === 0 ? (
                      ""
                    ) : (
                      <VariantCard
                        data={values.variants}
                        setFieldValue={setFieldValue}
                        selectedVariant={values.selectedVariant}
                        onUpdateVariant={(id) => {
                          setOpen(true);
                          setFieldValue("selectedIndex", id);
                        }}
                        onDeleteVariant={(id) => {
                          setDel(id);
                        }}
                      />
                    )}
                  </div>
                  <Stack spacing={2}>
                    {isInitialized ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={56}
                      />
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleClickOpen}
                      >
                        {t("add-variant")}
                      </Button>
                    )}
                    {isInitialized ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={56}
                      />
                    ) : (
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        loading={updateLoading}
                      >
                        {pid ? t("update-product") : t("create-product")}
                      </LoadingButton>
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogContent>
          <ProductVariantsForm
            selectedIndex={values.selectedIndex}
            setParentFieldValue={setFieldValue}
            valuesData={values}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={del}
        onClose={handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
          <WarningRoundedIcon sx={{ mr: 1 }} />
          {t("warning")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("are-you-sure-you-want-to-delete-this-variant?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}> {t("cancel")} </Button>
          <Button
            onClick={() => {
              const filtered = values.variants.filter((v) => v._id !== del);
              setFieldValue("variants", filtered);
              handleDelete();
            }}
            variant="contained"
          >
            {" "}
            {t("delete")}{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
