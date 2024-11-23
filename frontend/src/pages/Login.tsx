import React from 'react';
import { Typography, Container, Button,Paper,Box, TextField,IconButton } from '@mui/material';
import { useState } from 'react'
import Grid from '@mui/material/Grid2'
import LockIcon from '@mui/icons-material/Lock';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import Menu from '../components/Menu';
import Tooltip from '@mui/material/Tooltip';

function Login() {
  const [data, setData] = useState({usuario:'', contraseña:'',corresponden:0})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e:any) => {
    e.preventDefault();  
    fetch(`http://localhost:3030/login?user=${data.usuario}&password=${data.contraseña}`)
      .then(response => response.json())
      .then (response => {
        console.log("Lo que nos llega de la base de datos: ")
        console.log(response.data)
        if(response.data.length !== 0) {
          dispatch(authActions.login( {
            nombreUsuario: data.usuario,
            rol: response.data.rol
          }))
          navigate("/Home")
        }else {
          alert("usuario/contraseña son incorrectas ")
        }
      })
  }

  const handleChangeUser = (e:any) =>{
    setData({
      ...data,
      usuario: e.target.value
    })
  }

  const handleChangePassword = (e:any) =>{
    setData({
      ...data,
      contraseña: e.target.value
    })
  }
  return (
    <>
      <Container sx={{marginTop: "30px"}}>
      <Paper elevation={3} square={true} sx={{textAlign:'center', padding:"7px"}}>
        <Typography variant='h5'>Sistema de acceso</Typography>
        <Tooltip title="Candado" arrow placement="bottom">
          <IconButton>
            <LockIcon/>
          </IconButton>
        </Tooltip>
        <Box
          component = 'form'
          onSubmit={handleSubmit}
          >
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:12, md:12}}>
              <TextField
                required
                label = "Usuario"
                variant='outlined'
                fullWidth
                value= {data.usuario}
                onChange={handleChangeUser}
              />
            </Grid>
            <Grid size={{xs:12, sm:12, md:12}}>
              <TextField
                required
                label = "Contraseña"
                variant='outlined'
                fullWidth
                value= {data.contraseña}
                type='password'
                onChange={handleChangePassword}
              />
            </Grid>
          </Grid>
          <Tooltip title="Acceder" arrow placement="bottom">
            <Button sx={{padding:"10px",marginTop:"10px"}} /*onClick={mostrar}*/ variant='contained' fullWidth type='submit' >Acceder</Button>
          </Tooltip>
          {data.corresponden !== 0 && (
            data.corresponden === 1 ? (
            <Alert severity="success">Acesso concedido</Alert>
            ) : (
            <Alert severity="error">Usuario y/o contraseña incorrecta</Alert>
            )
          )}
        </Box>
      </Paper>
    </Container>
    </>
  );
}

export default Login;


