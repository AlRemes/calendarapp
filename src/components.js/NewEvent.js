import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

function NewEvent(props) {

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>New Event</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Importance</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={props.event.importance}
            onChange={props.inputChange}
            name="importance"
          >
            {props.importance.map((item, i) => (
              <MenuItem key={i.toString()} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          name="date"
          type="date"
          value={props.event.date}
          onChange={props.inputChange}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          name="time"
          type="time"
          value={props.event.time}
          onChange={props.inputChange}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          name="description"
          value={props.event.description}
          onChange={props.inputChange}
          label="Description"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewEvent;
