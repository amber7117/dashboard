import React from "react";
import { uniqueId } from "lodash";
// material
import {
    Grid,
    Paper,
    Typography,
    Skeleton,
    Box,
    Stack,
    IconButton,
    alpha,
    Radio,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Tooltip
} from "@mui/material";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled, useTheme } from "@mui/material/styles";
import { Label } from "src/components";
import { fDateShort } from "src/utils/formatTime";
import { capitalize } from "lodash";

const RootStyle = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: "0.5rem",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid " + theme.palette.divider,
    borderRadius: 4,
    width: "100%",
    position: "relative",
    "& .name": {
        fontWeight: 600,
        color: theme.palette.info.main,
    },
    "& .time svg": {
        width: 10,
        height: 10,
        "& path": {
            fill: theme.palette.text.primary,
        },
    },
    "& .date": {
        fontSize: "0.75rem",
        fontWeight: 500,
    },
    "& .callander": {
        "& svg": {
            width: 10,
            height: 10,
        },
    },
    "& .time-slot": {
        fontWeight: 500,
        fontSize: "0.75rem",
    },
    "& .phone-container": {
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "0.5rem",
        "& .phone": {
            color: theme.palette.text.secondary,
            fontWeight: 400,
            fontSize: 11,
        },
        "& .btn-phone": {
            fontSize: "1px",
        },
    }
}));



export default function VariantCard({ data, onUpdateVariant, onDeleteVariant, setFieldValue, selectedVariant }) {
    const theme = useTheme()
    return (
        <>
            <Typography variant="h4" color="text.primary" mb={2}>Variants</Typography>
            <Stack spacing={2}>
                {data?.map((item, i) => (
                    <Stack spacing={1} direction="row" alignItems="center" key={uniqueId()} onClick={() => setFieldValue("selectedVariant", i)}>
                        <FormControl sx={{
                            "& .MuiRadio-root": {
                                padding: 0,
                            },
                            "& .MuiFormControlLabel-root": {
                                marginRight: theme.spacing(1),
                            }
                        }}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={selectedVariant}
                                name="radio-buttons-group"
                            ><Tooltip title="Defualt" placement="top">
                                    <FormControlLabel value={i} control={<Radio size="small" />} />
                                </Tooltip>
                            </RadioGroup>
                        </FormControl>
                        <RootStyle sx={{
                            borderColor: selectedVariant === i ? theme.palette.primary.main : theme.palette.divider,
                        }}
                        >
                            <Stack spacing={2} direction="row" justifyContent="space-between">
                                <Stack spacing={0.5}>
                                    <Typography variant="subtitle1" color="primary" sx={{
                                        cursor: "pointer"
                                    }}>
                                        {capitalize(item?.variantName)}
                                    </Typography>
                                    <Stack spacing={1} direction={"row"} alignItems="center">
                                        <Stack spacing={1} direction={"row"} alignItems="center">
                                            <ColorLensIcon fontSize="small" />
                                            <Typography variant="body2" ml={.5}>
                                                {item.color}
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={1} direction={"row"} alignItems="center">
                                            <AspectRatioIcon fontSize="small" />
                                            <Typography variant="body2" ml={.5}>
                                                {item.size}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1} justifyContent="end">

                                    <Stack spacing={1} direction={"row"} alignItems="center">
                                        <AccountBalanceWalletIcon fontSize="small" />
                                        <Typography variant="body2" ml={.5}>
                                            {item.priceSale || item.price}
                                        </Typography>
                                    </Stack>
                                    <Box textAlign="end">
                                        <IconButton
                                            onClick={() => onUpdateVariant(i)}
                                            size="small" color="primary">
                                            <EditRoundedIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="primary" onClick={() => onDeleteVariant(item._id)}>
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Stack>
                            </Stack>
                        </RootStyle >
                    </Stack>
                ))
                }
            </Stack>
        </>
    );
}
