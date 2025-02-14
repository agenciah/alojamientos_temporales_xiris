import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { TextField, Button, Container, FormControl } from "@mui/material";
import background from "/home/alex1986/aviso_mudanza_xiris/src/assets/airbnb_xiris.jpg";

function MudanzasForm() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    numeroPersonas: "",
    marcaVehiculo: "",
    tarjetaCirculacion: "",
    empresaMudanza: "",
    datosChofer: "",
    notas: "",
  });

  const captureRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateImage = () => {
    const input = captureRef.current;
  
    if (!input) return;
  
    input.style.display = "block"; // Mostrar temporalmente el div
    html2canvas(input, { useCORS: true }).then((canvas) => {
      input.style.display = "none"; // Ocultar nuevamente
  
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `Autorizacion_Condominio_Xiris_para_${formData.nombreCompleto}.jpg`;
      link.click();
  
      // Limpiar los campos después de la generación de la imagen
      setFormData({
        nombreCompleto: "",
        numeroPersonas: "",
        marcaVehiculo: "",
        tarjetaCirculacion: "",
        empresaMudanza: "",
        datosChofer: "",
        notas: "",
      });
    });
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

        <FormControl fullWidth margin="normal">
          <TextField
            label="Marca de Vehículo y placas"
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
            label="Número de vivienda"
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
            label="Notas (opcional)"
            variant="outlined"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            multiline
            rows={4}
            inputProps={{ maxLength: 445 }} // Límite de caracteres
          />
        </FormControl>

        <Button
          variant="contained"
          style={{ backgroundColor: "#26A9E1", color: "#FFFFFF", marginTop: "20px" }}
          onClick={handleGenerateImage}
        >
          Generar Imagen
        </Button>
      </form>

      {/* Div Oculto que Captura html2canvas */}
      <div
        ref={captureRef}
        style={{
          display: "none",
          position: "relative",
          width: "800px",
          height: "1000px",
        }}
      >
        <img src={background} alt="Formato" style={{ width: "100%", height: "100%" }} />
        <div style={{ position: "absolute", top: "290px", left: "100px", color: "black", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>
          {formData.nombreCompleto}
        </div>
        <div style={{ position: "absolute", top: "385px", left: "100px", color: "black", fontSize: "22px" }}>
          {formData.numeroPersonas}
        </div>
        <div style={{ position: "absolute", top: "475px", left: "100px", color: "black", fontSize: "22px" }}>
          {formData.marcaVehiculo}
        </div>
        <div style={{ position: "absolute", top: "570px", left: "100px", color: "black", fontSize: "22px", whiteSpace: "pre-wrap" }}>
          {formData.tarjetaCirculacion}
        </div>
        <div style={{ position: "absolute", top: "660px", left: "100px", color: "black", fontSize: "22px" }}>
          {formData.empresaMudanza}
        </div>
        <div style={{ position: "absolute", top: "775px", left: "275px", color: "black", fontSize: "22px", whiteSpace: "pre-wrap" }}>
          {formData.datosChofer}
        </div>
        <div style={{ position: "absolute", top: "750px", left: "20px", color: "black", fontSize: "22px", whiteSpace: "pre-wrap" }}>
          {formData.notas}
        </div>
      </div>
    </Container>
  );
}

export default MudanzasForm;
