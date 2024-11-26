import React, {useState} from 'react';
import Menu from '../components/Menu';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';

// import { useSelector } from 'react-redux';
// import { RootState } from '../store/index';

import { IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import Tooltip from '@mui/material/Tooltip';


function Gestion() {
  interface itemtype {
    id?: number
    nombre: string
    login: string
    password: string
    rol: string
  }

  const itemInitialState: itemtype = {
    nombre: '',
    login: '',
    password: '',
    rol: ''
  }
  

  const [item, setItem] = useState(itemInitialState)
  const [tableData, setTableData] = useState([])
  // const userData = useSelector((state: RootState) => state.authenticator)

  const handleSubmit = (e:any) => {
    e.preventDefault();  
    fetch(`http://localhost:3030/addItemU?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
      .then(response => response.json())
      .then (response => {
        if(response > 0) {
          alert("Datos guardados con exito")
          setItem(itemInitialState) // poner todos los valores al estado inicial
          fetchItems()
        }else {
          alert("Los datos no se han guardado")
        }
      })
  }


  const fetchItems = () => {
    fetch(`http://localhost:3030/getItemsU`)
      .then((response) => response.json())
      .then((response) => {
        setTableData(response.data);
      });
  };
  

  useEffect(() => {
    fetchItems()
  },[])


  const handleChangeNombre = (e:any) =>{
    setItem({
      ...item,
      nombre: e.target.value
    })
  }

  const handleChangeLogin = (e:any) =>{
    setItem({
      ...item,
      login: e.target.value
    })
  }

  const handleChangePassword = (e:any) =>{
    setItem({
      ...item,
      password: e.target.value
    })
  }

  const handleChangeRol = (e:any) =>{
    setItem({
      ...item,
      rol: e.target.value
    })
  }

  return (
    <>
      <Menu/>
      <Container sx={{marginBottom: "70px"}}>
      <Paper elevation={3} square={true} sx={{textAlign:'center', marginTop:"20px"}}>
        <Box sx={{padding: "20px"}}
          component='form'
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid size={{xs:6, sm:3, md:3}}>
              <TextField 
                required
                label='Nombre'
                variant='outlined'
                fullWidth
                value= {item.nombre}
                onChange={handleChangeNombre}
              />
            </Grid>
            <Grid size={{xs:6, sm:3, md:3}}>
              <TextField 
                  required
                  label='Login'
                  variant='outlined'
                  fullWidth
                  value= {item.login}
                  onChange={handleChangeLogin}
              />
            </Grid>
            <Grid size={{xs:6, sm:3, md:3}}>
              <TextField 
                  required
                  label='Password'
                  variant='outlined'
                  fullWidth
                  value= {item.password}
                  onChange={handleChangePassword}
              />
            </Grid>
            <Grid size={{xs:6, sm:3, md:3}}>
              <TextField 
                  required
                  label='Rol'
                  variant='outlined'
                  fullWidth
                  value= {item.rol}
                  onChange={handleChangeRol}
              />
            </Grid>
          <Divider />
          <Grid container spacing={2} sx={{margin:"0 auto"}}>
            <Grid size={{xs:12, sm:12, md:12}}>
              <Tooltip title="Insertar usuario" arrow placement="bottom">
                  <Button id='but' type="submit" variant='outlined' fullWidth>+ INSERTAR USUARIO</Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        </Box>
      </Paper>
      <TableContainer component={Paper} sx={{marginTop:"20px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabla Usuarios">
        <TableHead sx={{backgroundColor: "#0a2837"}}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{color:"white"}}>Nombre</TableCell>
            <TableCell sx={{color:"white"}}>Login</TableCell>
            <TableCell sx={{color:"white"}}>Password</TableCell>
            <TableCell sx={{color:"white"}}>Rol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row: itemtype) => (
            <TableRow key={row.id}>
              <TableCell></TableCell>
              <TableCell component="th" scope="row">{row.nombre}</TableCell>
              <TableCell>{row.login}</TableCell>
              <TableCell>{row.password}</TableCell>
              <TableCell>{row.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
}

export default Gestion;