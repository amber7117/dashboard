import * as api from "src/services";
import * as Yup from "yup";
import React, { useState } from "react";
// axios
import axios from "axios";
// toast
import toast from 'react-hot-toast';
// form
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import {
    Card,
    Grid,
    Stack,
    TextField,
    Typography,
    InputAdornment,
    FormHelperText, Button,

} from "@mui/material";
import { styled } from "@mui/material/styles";
//
import { UploadMultiFile } from "src/components";
import { fCurrency } from "src/utils/formatNumber";
import { useTranslation } from "react-i18next";
//
// -----------------------------------------------------------------------

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

//
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------

export default function ProductVariantsForm({ setParentFieldValue, valuesData, onClose, selectedIndex }) {
    const [loading, setloading] = useState(false);
    // translation
    const { t } = useTranslation("product");
    // formaik
    const currentValue = valuesData?.variants[selectedIndex]
    // currentProduct?.variants
    const NewProductSchema = Yup.object({
        images: Yup.array().min(1, t("images-is-required")),
        variant: Yup.array(),
        variantName: Yup.string().required(t("name-is-required")),
        sku: Yup.string().required(t("sku-is-required")),
        available: Yup.number().required(t("quantaty-is-required")),
        color: Yup.string().required(t("color-is-required")),
        size: Yup.string().required(t("size-is-required")),
        price: Yup.number().required(t("price-is-required")),
        priceSale: Yup.number().required(t("price-is-required")).lessThan(
            Yup.ref("price"),
            t("sale-price-should-be-smaller-than-price")
        ),
    });
    console.log(selectedIndex)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            images: currentValue?.images || [],
            sku: currentValue?.sku || "",
            variantName: currentValue?.variantName || "",
            price: currentValue?.price || "",
            priceSale: currentValue?.priceSale || "",
            color: currentValue?.color || "",
            size: currentValue?.size || "",
            available: currentValue?.available || "",
            blob: currentValue?.blob || [],
        },
        validationSchema: NewProductSchema,
        onSubmit: async (values) => {

            const { variantName, size, color, price, priceSale, sku, available, images } = values

            if (selectedIndex !== null) {
                let all = valuesData.variants
                all[selectedIndex] = {
                    ...all[selectedIndex],
                    variantName,
                    size,
                    color,
                    images,
                    price,
                    priceSale,
                    sku,
                    available
                }
                setParentFieldValue("variants", all);
            }

            else {
                setParentFieldValue("variants", [...valuesData.variants, {
                    variantName,
                    size,
                    color,
                    images,
                    price,
                    priceSale,
                    sku,
                    available
                }]);
            }


            onClose()
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

    const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
        onError: (error) => {
            toast.error(error.message);
        },
    });
    // handle drop
    const handleDrop = (acceptedFiles) => {
        setloading(true);
        const uploaders = acceptedFiles.map((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "my-uploads");
            setFieldValue("blob", values.blob.concat(acceptedFiles));
            return axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
        });
        const blobs = acceptedFiles.map((file) => {
            return URL.createObjectURL(file);
        });
        axios.all(uploaders).then((data) => {
            const newImages = data.map(({ data }, i) => ({
                url: data.secure_url,
                _id: data.public_id,
                // blob: blobs[i],
            }));
            setloading(false);
            setFieldValue("images", values.images.concat(newImages));
        });
    };
    // handleAddVariants

    // handleRemoveAll
    const handleRemoveAll = () => {
        values.images.forEach((image) => {
            deleteMutate({ _id: image._id });
        });
        setFieldValue("images", []);
    };
    // handleRemove
    const handleRemove = (file) => {
        const removeImage = values.images.filter((_file) => {
            if (_file._id === file._id) {
                deleteMutate({ _id: file._id });
            }
            return _file !== file;
        });
        setFieldValue("images", removeImage);
    };

    // -----------------------------------------------------------------------

    return (
        <>
            <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={3}>
                                <Typography variant="h4" color="text.primary">{t("variants")}</Typography>

                                <div>
                                    <LabelStyle>
                                        {t("variant-name")}
                                    </LabelStyle>
                                    <TextField
                                        fullWidth
                                        {...getFieldProps("variantName")}
                                        error={Boolean(touched.variantName && errors.variantName)}
                                        helperText={touched.variantName && errors.variantName}
                                    />
                                </div>
                                <div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <LabelStyle>{t("size")}</LabelStyle>
                                            <TextField
                                                fullWidth
                                                {...getFieldProps("size")}
                                                error={Boolean(touched.size && errors.size)}
                                                helperText={touched.size && errors.size}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <LabelStyle>
                                                {t("color")}
                                            </LabelStyle>

                                            <TextField
                                                fullWidth
                                                {...getFieldProps("color")}
                                                error={Boolean(touched.color && errors.color)}
                                                helperText={touched.color && errors.color}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <div>
                                                <LabelStyle>{t("product-sku")}</LabelStyle>
                                                <TextField
                                                    fullWidth
                                                    {...getFieldProps("sku")}
                                                    error={Boolean(touched.sku && errors.sku)}
                                                    helperText={touched.sku && errors.sku}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <div>
                                                <LabelStyle>{t("quantity")}</LabelStyle>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    {...getFieldProps("available")}
                                                    error={Boolean(touched.available && errors.available)}
                                                    helperText={touched.available && errors.available}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <div>
                                                <LabelStyle>{t("regular-price")}</LabelStyle>
                                                <TextField
                                                    fullWidth
                                                    placeholder="0.00"
                                                    {...getFieldProps("price")}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                {fCurrency(0)?.split("0")[0]}
                                                            </InputAdornment>
                                                        ),
                                                        type: "number",
                                                    }}
                                                    error={Boolean(touched.price && errors.price)}
                                                    helperText={touched.price && errors.price}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <div>
                                                <LabelStyle>{t("sale-price")}</LabelStyle>
                                                <TextField
                                                    fullWidth
                                                    placeholder="0.00"
                                                    {...getFieldProps("priceSale")}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                {fCurrency(0)?.split("0")[0]}
                                                            </InputAdornment>
                                                        ),
                                                        type: "number",
                                                    }}
                                                    error={Boolean(touched.priceSale && errors.priceSale)}
                                                    helperText={touched.priceSale && errors.priceSale}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <LabelStyle>
                                        {t("products-images")} <span>1080 * 1080</span>
                                    </LabelStyle>
                                    <UploadMultiFile
                                        showPreview
                                        maxSize={3145728}
                                        accept="image/*"
                                        files={values.images}
                                        loading={loading}
                                        onDrop={handleDrop}
                                        onRemove={handleRemove}
                                        onRemoveAll={handleRemoveAll}
                                        blob={values.blob}
                                        error={Boolean(touched.images && errors.images)}
                                    />
                                    {touched.images && errors.images && (
                                        <FormHelperText error sx={{ px: 2 }}>
                                            {touched.images && errors.images}
                                        </FormHelperText>
                                    )}
                                </div>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Button variant="outlined" size="large" color="error" onClick={onClose}>
                                        {t("cancel")}
                                    </Button>
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        loading={loading}
                                    >
                                        {currentValue ? t("update") : t("save")}
                                    </LoadingButton>

                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </>
    )
}
