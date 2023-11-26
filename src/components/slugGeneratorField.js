import React, { useState } from 'react'
// material
import { Box, TextField, CircularProgress, Fab, Tooltip, Stack } from "@mui/material"
import { Configuration, OpenAIApi } from "openai";
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import { useEffect } from 'react';
// openai
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default function SlugGeneratorField({ count, prompt, getFieldProps, touched, errors, values, setFieldValue }) {
    const [state, setstate] = useState({
        seoLoading: false,
        seoDescription: "",
    });
    // onblur
    const onBlur = async (e) => {
        setFieldValue("slug", "");
        setstate({
            ...state,
            seoLoading: true,
        });
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt + values.name,
            temperature: 0.5,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        setstate({
            ...state,
            seoLoading: false,
        });
        setFieldValue("slug", response.data.choices[0].text);
    };

    useEffect(() => {
        if (count > 0) {
            onBlur()
        } else {

        }
    }, [count]);

    return (
        <>
            <Box position="relative">
                <Box sx={{
                    position: "absolute",
                    top: 1,
                    right: 1,
                    button: {
                        minHeight: 20,
                        height: 20,
                        width: 20,
                        borderRadius: 1
                    }
                }}>
                    {state.seoLoading ? (
                        <CircularProgress size="20px" />
                    ) : (
                        <Stack spacing={.5}>
                            <Tooltip title="Magic ">
                                <Fab onClick={onBlur} size="small " color="primary">
                                    <AutoFixHighRoundedIcon fontSize="10px" />
                                </Fab>
                            </Tooltip>
                        </Stack>
                    )}
                </Box>
                <TextField
                    fullWidth
                    {...getFieldProps("slug")}
                    error={Boolean(touched.slug && errors.slug)}
                    helperText={touched.slug && errors.slug}
                />
            </Box>
        </>
    )
}
