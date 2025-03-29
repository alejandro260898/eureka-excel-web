import React from 'react'
import ReactDOM from 'react-dom/client'

import * as XLSX from 'xlsx'

const handlerCargarExcel = (e) => {
    const documento = e.target.files[0]
    const file_reader = new FileReader()

    file_reader.onload = (event) => {
        const datos = new Uint8Array(event.target.result)
        const hojas = XLSX.read(datos, { type: 'array' });

        const nom_hoja = hojas.SheetNames[0]
        const hoja = hojas.Sheets[nom_hoja]
    
        const jsonData = XLSX.utils.sheet_to_json(hoja, { header: 1 })
    
        const encabezados = jsonData[0]
        const filas = jsonData.slice(1)
    
        console.log("Encabezados:", encabezados)
        console.log("Datos:", filas)
    }

    file_reader.readAsArrayBuffer(documento)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <p>sube tu archivo</p>
        <input
            type='file'
            accept='.xlsx'
            onChange={handlerCargarExcel}
        />
    </>
)
