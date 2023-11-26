//
import { MAvatar } from "./@material-extend";
import createAvatar from "../utils/createAvatar";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function MyAvatar({ data, ...other }) {
  return (
    <MAvatar
      src={data?.cover?.url}
      alt={data?.fullName + " cover"}
      color={data?.cover?.url ? "default" : createAvatar(data?.fullName).color}
      {...other}>
      <Typography variant="h1">
        {data?.fullName.slice(0, 1).toUpperCase()}
      </Typography>
    </MAvatar>
  );
}
