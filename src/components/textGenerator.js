import React, { useState } from 'react'
// material
import { Box, TextField, CircularProgress, Fab, Tooltip, Stack } from "@mui/material"
import { Configuration, OpenAIApi } from "openai";

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
// openai
const configuration = new Configuration({
     apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default function TextGenerator({ getFieldProps, touched, prompt, errors, values, setFieldValue, fieldName, ...others }) {
    const [state, setstate] = useState({
        loading: false,
        seoLoading: false,
        name: "",
        search: "",
        open: false
    });
    // onblur
    const onBlur = async (e) => {
        setFieldValue(fieldName, "");
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
        setFieldValue(fieldName, response.data.choices[0].text.replace(/\n/g, ''));
    };

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
                    {...getFieldProps(fieldName)}
                    error={Boolean(touched.fieldName && errors.fieldName)}
                    helperText={touched.fieldName && errors.fieldName}
                    {...others}
                />
            </Box>
        </>
    )
}
