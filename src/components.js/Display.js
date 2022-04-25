import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import moment from "moment";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Display(props) {

    console.log(props)
if(!props.open){
    return null
}
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Event details</DialogTitle>
      <DialogContent>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
          {props.detail.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {moment(props.detail.start).format('DD/MM/YYYY/')}
        </Typography>
        <Typography variant="body2">
        {moment(props.detail.start).format('HH:mm')}
        </Typography>
      </CardContent>
      </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Close Screen</Button>
        <Button style={{color:'red'}} onClick={props.handleDelete}>Delete event</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Display;
