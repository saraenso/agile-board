import {
  AppBar,
  FormControl,
  Select,
  Toolbar,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { GridStyle } from "./styles";
import User from "../common/User";

function Header() {
  const { boards, users } = useStore();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container sx={GridStyle}>
          <Grid item>
            <Box display="flex" alignItems="center" p={1}>
              <Typography variant="h6" color="inherit">
                Dashboard:
              </Typography>
              <FormControl variant="outlined">
                <Select
                  style={{
                    backgroundColor: "#ffffff",
                    marginLeft: 10,
                  }}
                  id="active"
                  native
                  value={boards?.active?.id || ""}
                  onChange={(event) => {
                    const { value } = event.target;

                    boards.selectBoard(value);
                  }}
                >
                  <option value={""} disabled>
                    –
                  </option>
                  {boards?.boards.map((board) => {
                    return (
                      <option key={board?.id} value={board?.id}>
                        {board?.title}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <User user={users?.me} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default observer(Header);
