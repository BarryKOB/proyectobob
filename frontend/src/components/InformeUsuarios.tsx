import React from "react";
import MaterialTable from "@material-table/core"; 
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface Informe2Props {
  data: Array<{
    nombre: string;
    login: string;
    password: string;
    rol: String;
  }>;
}

function InformeUsuarios({ data }: Informe2Props) {
  const columns = [
    { title: "Nombre", field: "nombre" },
    { title: "Login", field: "login" },
    { title: "Password", field: "password" },
    { title: "Rol", field: "rol"},
  ];

  return (
    <div>
      <MaterialTable
        title="Informe de Usuarios"
        columns={[{
          title: "Nombre",
          field: "nombre",
          filtering: true
        },
        {
          title: "Login",
          field: "login",
          filtering: false
        },
        {
          title: "Password",
          field: "password",
          filtering: false
        },
        {
          title: "Rol",
          field: "rol",
          filtering: false
        }
    ]}
        data={data}
        options={{
          exportMenu: [
            {
              label: "Exportar a PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeUsuarios"),
            },
            {
              label: "Exportar a CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeUsuarios"),
            },
          ],
          paging: true,
          search: true,
          maxColumnSort: 10,
          columnsButton: true,
          filtering: true,
          
          headerStyle: {
            backgroundColor: "#0a2837",
            color: "white"
          },
          draggable: true
        }}

        /*renderSummaryRow={({ column, data }) =>
            column.field === "precio"
              ? {
                  value: data.reduce((agg, row) => agg + row.precio, 0),
                  style: { background: "#0a2837", color:"white" },
                }
              : undefined
          }*/
      />
    </div>
  );
}

export default InformeUsuarios;