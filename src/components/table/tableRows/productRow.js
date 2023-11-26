// material
import { paramCase } from "change-case";
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Rating,
  Switch,
  Tooltip,
  Link,
} from "@mui/material";
// redux
import { fCurrency } from "src/utils/formatNumber";
import { fDateShort } from "src/utils/formatTime";
// components
import { Label } from "src/components";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 50,
  height: 50,
  minWidth: 50,
  objectFit: "cover",
  background: theme.palette.background.default,
  marginRight: theme.spacing(2),
  border: "1px solid " + theme.palette.divider,
  borderRadius: theme.shape.borderRadiusSm,
}));
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function OrderRow({ isLoading, row, handleClickOpen, mutate }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { language } = i18n;
  console.log(row);
  return (
    <TableRow hover key={Math.random()}>
      <TableCell
        component="th"
        scope="row"
        padding="none"
        sx={{ maxWidth: 300 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={50}
              height={50}
              sx={{ borderRadius: 1 }}
            />
          ) : Boolean(row.cover) > 0 ? (
            <ThumbImgStyle alt={row?.name} src={row?.cover} />
          ) : (
            <Avatar> {row.name.slice(0, 1)} </Avatar>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              row?.name
            )}
          </Typography>
        </Box>
      </TableCell>
      {/* <TableCell>
        <Skeleton variant="text" />
      </TableCell> */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <>
            {fDateShort(
              row?.category?.createdAt,
              language !== "ar" ? enUS : ar
            )}
          </>
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={
              (row?.variants[0].available < 1 && "error") ||
              (row?.variants[0].available < 20 && "warning") ||
              (row?.variants[0].available >= 20 && "success") ||
              "primary"
            }>
            {/* {row?.status} */}
            {(row?.variants[0].available < 1 && "Out of stock") ||
              (row?.variants[0].available < 20 && "Low stock") ||
              (row?.variants[0].available >= 20 && "In stock")}
          </Label>
        )}
      </TableCell>
      <TableCell align="left">
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Rating
            name="text-feedback"
            size="small"
            value={row.totalRating / row.totalReview}
            readOnly
            precision={0.5}
          />
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fCurrency(row?.variants[0].salePrice || row?.variants[0].price)
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Switch
            {...label}
            defaultChecked={row.isFeatured}
            onChange={() => {
              mutate({
                isFeatured: !row.isFeatured,
                id: row._id,
              });
            }}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {isLoading ? (
          <Stack direction="row" justifyContent="flex-end">
            <Skeleton
              variant="circular"
              width={34}
              height={34}
              sx={{ mr: 1 }}
            />
            <Skeleton
              variant="circular"
              width={34}
              height={34}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="circular" width={34} height={34} />
          </Stack>
        ) : (
          <Stack direction="row" justifyContent="flex-end">
            <Link
              target="_blank"
              href={`https://nextstore.vercel.com/product/${paramCase(
                row?.name
              )}`}>
              <IconButton>
                <RemoveRedEyeIcon />
              </IconButton>
            </Link>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => navigate(`/products/${paramCase(row?.name)}`)}>
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleClickOpen(row.slug)}>
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </TableCell>
    </TableRow>
  );
}
