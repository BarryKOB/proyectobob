import React, { useState} from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider';
import { IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

function Dahsboard() {
  interface itemtype {
    id?: number
    nombre: string
    marca: string
    tipo: string
    precio: number
  }

  const itemInitialState: itemtype = {
    nombre: '',
    marca: '',
    tipo: '',
    precio: (0)
  }
  

  const [item, setItem] = useState(itemInitialState)
  const [tableData, setTableData] = useState([])
  const userData = useSelector((state: RootState) => state.authenticator)

  const handleSubmit = (e:any) => {
    e.preventDefault();  
    fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
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
    fetch(`http://localhost:3030/getItems`)
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

  const handleChangeMarca = (e:any) =>{
    setItem({
      ...item,
      marca: e.target.value
    })
  }

  const handleChangeTipo = (e:any) =>{
    setItem({
      ...item,
      tipo: e.target.value
    })
  }

  const handleChangePrecio = (e:any) =>{
    setItem({
      ...item,
      precio: e.target.value
    })
  }

  
  
  const handleDeleteItem = (item: itemtype) => {
    fetch(`http://localhost:3030/deleteItem?id=${item.id}`)
      .then(response => response.json())
      .then((response) => {
        if (response > 0) {
          alert("Elemento eliminado con éxito");
          fetchItems()
        } else {
          alert("Error al eliminar el elemento");
        }
      })
      .catch((error) => {
        console.error("Error en la eliminación:", error);
        alert("Error en la eliminación");
      });
  };
  
  

  return (
    // si el rol es admin mostramos el boton de borrar y viceversa
    <>
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
                  label='Marca'
                  variant='outlined'
                  fullWidth
                  value= {item.marca}
                  onChange={handleChangeMarca}
              />
            </Grid>
            <Grid size={{xs:6, sm:3, md:3}}>
              <TextField 
                  required
                  label='Tipo'
                  variant='outlined'
                  fullWidth
                  value= {item.tipo}
                  onChange={handleChangeTipo}
              />
            </Grid>
            <Grid size={{xs:6, sm:3, md:3}}>
              <TextField 
                  required
                  label='Precio'
                  variant='outlined'
                  fullWidth
                  value= {item.precio}
                  onChange={handleChangePrecio}
              />
            </Grid>
          <Divider />
          <Grid container spacing={2} sx={{margin:"0 auto"}}>
            <Grid size={{xs:12, sm:12, md:12}}>
                <Button id='but' type="submit" variant='outlined' fullWidth>+ INSERTAR DATOS</Button>
            </Grid>
          </Grid>
        </Grid>
        </Box>
      </Paper>
    
    <TableContainer component={Paper} sx={{marginTop:"20px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabla Colecciones">
        <TableHead sx={{backgroundColor: "#0a2837"}}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{color:"white"}}>Nombre</TableCell>
            <TableCell sx={{color:"white"}}>Marca</TableCell>
            <TableCell sx={{color:"white"}}>Tipo</TableCell>
            <TableCell sx={{color:"white"}}>Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row: itemtype) => (
            <TableRow key={row.id}>
              <TableCell> 
                {(userData.Rol === 'admin') && (
                  <Button onClick={() => handleDeleteItem(row)}>
                    <DeleteForeverIcon/>
                  </Button>
                )}
              </TableCell>
              <TableCell component="th" scope="row">{row.nombre}</TableCell>
              <TableCell>{row.marca}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>{row.precio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
    );

}

export default Dahsboard;