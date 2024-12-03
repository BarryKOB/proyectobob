import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InformeColeccion from '../components/InformeColeccion';
import InformeUsuarios from '../components/InformeUsuarios';


function Reports() {
  const [tableDataC, setTableDataC] = useState([])
  const [pic, setPicado] = useState(false);

  const [tableDataP, setTableDataP] = useState([])
  const [pic2, setPicado2] = useState(false);

  const fetchItems = () => {
    fetch(`http://localhost:3030/getItems`)
      .then((response) => response.json())
      .then((response) => {
        console.log("Datos recibidos del backend:", response.data);
        setTableDataC(response.data);
      });
  };

  const picado = () => {
    setPicado(true);
    fetchItems()
  };

  // peliculas

  const fetchItems2 = () => {
    fetch(`http://localhost:3030/getItemsP`)
      .then((response) => response.json())
      .then((response) => {
        console.log("Datos recibidos del backend:", response.data);
        setTableDataP(response.data);
      });
  };

  const picadoP = () => {
    setPicado2(true);
    fetchItems2()
  };

  


  return (
    <>
        <Menu/>
        <Grid container spacing={2} sx={{margin:"0 auto", width:"200px", marginTop:"20px"}}>
          <Button id='but' onClick={picado} variant='contained' fullWidth>INFORME COLECCION</Button>
        </Grid>
        {(pic === true) && (
          <InformeColeccion data={tableDataC}/>
        )}
        <Grid container spacing={2} sx={{margin:"0 auto", width:"200px", marginTop:"20px"}}>
          <Button id='but1' onClick={picadoP} variant='contained' fullWidth>INFORME USUARIOS</Button>
        </Grid>
        {(pic2 === true) && (
          <InformeUsuarios data={tableDataP}/>
        )}
    </>
  );
}

export default Reports;