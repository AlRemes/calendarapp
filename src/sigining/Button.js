import Button from '@mui/material/Button'

export default function Buttons({title, handleData}){
    return (
    <Button
    variant="outlined" style={{marginTop:10}}>
        {title}
    </Button>
    )
}