import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
// import toast from 'react-hot-toast';
import { capitalCase } from "change-case";
import toast from "react-hot-toast";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Card, Stack, TextField, Typography, Box, Select, FormControl, FormHelperText, Grid, Skeleton } from "@mui/material";
import * as api from "src/services";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextGenerator from "src/components/textGenerator";
import { UploadSingleFile } from "src/components";
// ----------------------------------------------------------------------

const CATEGORY_OPTIONS = [
    "bags",
    "shoes",
    "shirts",
    "makeup",
    "sports",
    "electronics",
    "home appliances",
];

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
// const STATUS_OPTIONS = ["active", "deactive"]

export default function BlogForm({ currentCategory, categoryLoading }) {
    const [count, setcount] = useState(0);
    const navigate = useNavigate();
    const { blid } = useParams()
    const [state, setstate] = useState({
        loading: false,
        name: "",
        search: "",
        open: false,
    });

    const { t } = useTranslation("brand");
    const { mutate, isLoading } = useMutation(blid ? "update" : "new", blid ? api.updateBlogCategory : api.addBlogCategory, {
        ...(blid && {
            enabled: Boolean(blid)
        })
        ,
        retry: false,
        onSuccess: () => {
            toast.success(blid ? "Blog Category Updated" : "New Blog Category Created");
            navigate("/blog/blog-categories");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const NewProductSchema = Yup.object().shape({
        title: Yup.string().required(t("name-is-required")),
        logo: Yup.mixed().required(t("logo-is-required")),
        slug: Yup.string().required(t("slug-is-required")),
        description: Yup.string().required(t("meta-description-is-required")),
        // metaTitle: Yup.string().required(t("meta-name-is-required")),
        // metaDescription: Yup.string().required(t("description-is-required")),

    });

    const formik = useFormik({
        initialValues: {
            title: currentCategory?.title || "",
            // metaTitle: currentCategory?.metaTitle || "",
            logo: currentCategory?.logo || null,
            description: currentCategory?.description || "",
            // metaDescription: currentCategory?.metaDescription || "",
            file: currentCategory?.logo || "",
            slug: currentCategory?.slug || "",
            // status: currentCategory?.status || STATUS_OPTIONS[0]
        },
        enableReinitialize: true,
        validationSchema: NewProductSchema,
        onSubmit: async (values) => {
            const { file, ...rest } = values;
            try {
                mutate({
                    ...rest, ...(blid && {
                        id: blid
                    })
                });
                // console.log(values)
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

    const handleDrop = async (acceptedFiles) => {
        setstate({ ...state, loading: 2 });
        const file = acceptedFiles[0];
        if (file) {
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
        }
        setFieldValue("file", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my-uploads");
        const config = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                const percentage = Math.floor((loaded * 100) / total);
                setstate({ ...state, loading: percentage });
            },
        };
        await axios
            .post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData,
                config
            )
            .then(({ data }) => {
                setFieldValue("logo", {
                    _id: data.public_id,
                    url: data.secure_url,
                });
                setstate({ ...state, loading: false });
            })
            .then(() => {
                if (values.file) {
                    deleteMutate({ _id: values.file._id });
                }
                setstate({ ...state, loading: false });
            });
    };


    return (
        <Box position="relative">
            <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <div>
                                        {
                                            categoryLoading ? <Skeleton variant="text" width={140} /> :
                                                <LabelStyle> {t("brand-name")} </LabelStyle>}
                                        {categoryLoading ? (
                                            <Skeleton variant="rectangular" width="100%" height={56} />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                {...getFieldProps("title")}
                                                error={Boolean(touched.title && errors.title)}
                                                helperText={touched.title && errors.title}
                                                onBlur={() => setcount(count + 1)}
                                            />)}
                                    </div>
                                    {/* <div>
                                        {
                                            categoryLoading ?
                                                <Skeleton variant="text" width={100} /> :
                                                <LabelStyle>{t("meta-title")}</LabelStyle>

                                        }
                                        {categoryLoading ? (
                                            <Skeleton variant="rectangular" width="100%" height={56} />
                                        ) : (
                                            <TextGenerator prompt="I need a meta title for a category without quotation " touched={touched} errors={errors} values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} fieldName="metaTitle" />
                                        )}
                                    </div> */}
                                    <div>
                                        {
                                            categoryLoading ?
                                                <Skeleton variant="text" width={70} /> :
                                                <LabelStyle> {t("slug")}</LabelStyle>
                                        }
                                        {categoryLoading ? (
                                            <Skeleton variant="rectangular" width="100%" height={56} />
                                        ) : (
                                            <TextGenerator prompt="I need a slug for a category without quotation " touched={touched} errors={errors} values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} fieldName="slug" />
                                        )}
                                    </div>
                                    <div>
                                        {
                                            categoryLoading ?
                                                <Skeleton variant="text" width={100} /> :
                                                <LabelStyle> {t("description")} </LabelStyle>
                                        }
                                        {categoryLoading ? (
                                            <Skeleton variant="rectangular" width="100%" height={240} />
                                        ) : (
                                            <TextGenerator prompt="I need a SEO description for my ecommerce website nextstore for a category" touched={touched} errors={errors} values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} fieldName="description" rows={9} multiline />
                                        )}
                                    </div>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div style={{
                                position: '-webkit-sticky',
                                position: 'sticky',
                                top: 0,

                            }}>
                                <Stack spacing={3}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                          
                                            <div>
                                                {
                                                    categoryLoading ?
                                                        <Skeleton variant="text" width={150} /> :
                                                        <LabelStyle>
                                                            {t("image")} <span>512 * 512</span>
                                                        </LabelStyle>
                                                }
                                                {categoryLoading ? (
                                                    <Skeleton variant="rectangular" width="100%" height={225} />
                                                ) : (
                                                    <UploadSingleFile
                                                        file={values.logo}
                                                        onDrop={handleDrop}
                                                        error={Boolean(touched.logo && errors.logo)}
                                                        category
                                                        accept="image/*"
                                                        loading={state.loading}
                                                    />
                                                )}
                                                {touched.logo && errors.logo && (
                                                    <FormHelperText error sx={{ px: 2, mx: 0 }}>
                                                        {touched.logo && errors.logo}
                                                    </FormHelperText>
                                                )}
                                            </div>
                                        </Stack>
                                    </Card>
                                    {
                                        categoryLoading ?
                                            <Skeleton variant="rectangular" width="100%" height={56} /> :
                                            <LoadingButton
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                loading={isLoading}
                                                sx={{ ml: "auto", mt: 3 }}>
                                                {t(blid ? "edit-brand" : "create-brand")}
                                            </LoadingButton>}
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </Box >
    );
}
