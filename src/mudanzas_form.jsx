import { useState, useEffect } from "react";
import { TextField, Button, Container, FormControl } from "@mui/material";
import { jsPDF } from "jspdf";
import background from "/home/alex1986/aviso_mudanza_xiris/src/assets/airbnb_xiris.jpg";
import CropImage from "./componentes/crop/cropimage";

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

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImages, setCroppedImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 595;
      canvas.height = 842;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 595, 842);
      setBackgroundImage(canvas.toDataURL("image/jpeg"));
    };
    img.src = background;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setCroppedImages((prevImages) => [...prevImages, croppedImage]);
    setImageSrc(null);
  };

  const generatePDF = () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

    if (backgroundImage) {
      pdf.addImage(backgroundImage, "JPEG", 0, 0, 446, 631);
    }

    pdf.text(formData.nombreCompleto, 100, 290);
    pdf.text(formData.numeroPersonas, 100, 385);
    pdf.text(formData.marcaVehiculo, 100, 475);
    pdf.text(formData.tarjetaCirculacion, 100, 570);
    pdf.text(formData.empresaMudanza, 100, 660);
    pdf.text(formData.datosChofer, 275, 775);
    pdf.text(formData.notas, 20, 750);

    croppedImages.forEach((img) => {
      pdf.addPage();
      pdf.addImage(img, "PNG", 50, 100, 295, 202);
    });

    pdf.save(`Autorizacion_${formData.nombreCompleto}.pdf`);
  };

  return (
    <Container>
      <form>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre Completo"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Número de Personas"
            name="numeroPersonas"
            value={formData.numeroPersonas}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Marca de Vehículo y placas"
            name="marcaVehiculo"
            value={formData.marcaVehiculo}
            onChange={handleChange}
          />
        </FormControl>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageSrc && (
          <CropImage
            imageSrc={imageSrc}
            onCropCompleteCallback={handleCropComplete}
            onClose={() => setImageSrc(null)}
          />
        )}
        <Button variant="contained" style={{ marginTop: "20px" }} onClick={generatePDF}>
          Generar PDF
        </Button>
      </form>
    </Container>
  );
}

export default MudanzasForm;