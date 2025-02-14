import { useState } from 'react';
import html2canvas from 'html2canvas';
import { TextField, Button, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function MudanzasForm() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    numeroPersonas: '',
    tipoResidente: 'Residente',
    marcaVehiculo: '',
    tarjetaCirculacion: '',
    empresaMudanza: '',
    datosChofer: '',
    notas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateImage = () => {
    const input = document.getElementById('capture');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      const fileName = `Autorizacion_Condominio_Xiris_para: ${formData.nombreCompleto}.jpg`;
      link.download = fileName;
      link.click();
    });
  };

  const formatText = (text, maxLength) => {
    const lines = [];
    let currentPosition = 0;
    while (currentPosition < text.length) {
      lines.push(text.slice(currentPosition, currentPosition + maxLength));
      currentPosition += maxLength;
    }
    return lines;
  };

  return (
    <Container>
      <form>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre Completo"
            variant="outlined"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Número de Personas que Visitan"
            variant="outlined"
            name="numeroPersonas"
            value={formData.numeroPersonas}
            onChange={handleChange}
          />
        </FormControl>

        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="tipo-residente-label">Tipo de Residente</InputLabel>
          <Select
            labelId="tipo-residente-label"
            name="tipoResidente"
            value={formData.tipoResidente}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="Residente">Residente</MenuItem>
            <MenuItem value="Inquilino">Inquilino</MenuItem>
            <MenuItem value="Airbnb">Airbnb</MenuItem>
          </Select>
        </FormControl> */}

        <FormControl fullWidth margin="normal">
          <TextField
            label="Marca de Vehículo"
            variant="outlined"
            name="marcaVehiculo"
            value={formData.marcaVehiculo}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Tarjeta de Circulación"
            variant="outlined"
            name="tarjetaCirculacion"
            value={formData.tarjetaCirculacion}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Numero de vivienda"
            variant="outlined"
            name="empresaMudanza"
            value={formData.empresaMudanza}
            onChange={handleChange}
          />
        </FormControl>

        {/* <FormControl fullWidth margin="normal">
          <TextField
            label="Datos del Chofer y Trabajadores"
            variant="outlined"
            name="datosChofer"
            value={formData.datosChofer}
            onChange={handleChange}
          />
        </FormControl> */}

        <FormControl fullWidth margin="normal">
          <TextField
            label="Notas"
            variant="outlined"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </FormControl>

        <Button
          variant="contained"
          style={{ backgroundColor: '#26A9E1', color: '#FFFFFF', marginTop: '20px' }}
          onClick={handleGenerateImage}
        >
          Generar Imagen
        </Button>
      </form>

      <div id="capture" style={{ position: 'absolute', left: '-9999px', width: '800px', height: '1000px' }}>
        <div style={{ position: 'absolute', top: '254px', left: '564px', color: 'black', fontSize: '18px', textTransform: 'uppercase' }}>
          {formData.nombreCompleto}
        </div>
        <div style={{ position: 'absolute', top: '430px', left: '275px', color: 'black', fontSize: '18px' }}>
          {formData.numeroPersonas}
        </div>
        <div style={{ position: 'absolute', top: '530px', left: '278px', color: 'black', fontSize: '18px' }}>
          {formData.marcaVehiculo}
        </div>
        <div style={{ position: 'absolute', top: '630px', left: '275px', color: 'black', fontSize: '18px', whiteSpace: 'pre-wrap' }}>
          {formatText(formData.tarjetaCirculacion, 34).map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', top: '730px', left: '275px', color: 'black', fontSize: '18px' }}>
          {formData.empresaMudanza}
        </div>
        <div style={{ position: 'absolute', top: '775px', left: '275px', color: 'black', fontSize: '18px', whiteSpace: 'pre-wrap' }}>
          {formatText(formData.datosChofer, 43).map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', top: '850px', left: '275px', color: 'black', fontSize: '18px', whiteSpace: 'pre-wrap' }}>
          {formatText(formData.notas, 36).map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default MudanzasForm;
