import React, { useState } from 'react';
import axios from "axios";
import './App.css';

const images = [
  { id: 1, url: 'https://res.cloudinary.com/decw3lpd2/image/upload/v1681825649/001_page-0001_f3rykz.jpg' },
  { id: 2, url: 'https://res.cloudinary.com/decw3lpd2/image/upload/v1681825649/002_page-0001_tzq8bw.jpg' },
  { id: 3, url: 'https://res.cloudinary.com/decw3lpd2/image/upload/v1681825649/003_page-0001_l0nnz7.jpg' }
];

function App() {
  const [selectedImage, setSelectedImage] = useState(false);
  const [details, setDetails] = useState([]);
  const [mongoID, setMongoID] = useState("");
  const handleImageClick = async (image) => {
    setSelectedImage(image);
    console.log(image.url);
    try {

      const { data } = await axios.post("/img", { source: image.url })
      console.log(data);
      let raw= data.details
      raw = raw.substring(2, raw.length - 2)
      setDetails(raw)
      setMongoID(data.msg)

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="App">
      <center>
        <div style={{ flexDirection: "row" }}>
          <section>
            {selectedImage && <img style={{ width: 400, height: 400, margin: 40, cursor: 'pointer' }} src={selectedImage.url} alt="selected_drawing" onClick={() => handleImageClick(false)} />}
          </section>
          <section>
            {selectedImage ? <> <h3><b>Co_ordinates and radius of detected circles</b></h3><p>{details}</p> </> : <h3><b> Click on picture to detect circles and store details in db </b></h3>}
            {selectedImage ? <> <h3><b>MongoDB ID</b></h3><p>{mongoID}</p> </> : <></>}

          </section>
        </div>
        <div>

          {images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={`${image.id}`}
              style={{ width: 100, height: 100, margin: 40, cursor: 'pointer' }}
              onClick={() => handleImageClick(image)}
            />
          ))}


        </div>
      </center>
    </div>
  );
}

export default App;
