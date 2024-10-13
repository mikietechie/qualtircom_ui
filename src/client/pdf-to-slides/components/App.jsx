/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useState } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';

const App = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      console.log(newFile);
      const { size, name } = newFile;
      if (size > 1024 * 1024 * 6) {
        alert('File should be less than 6 MB');
        return;
      }
      const fileBuffer = btoa(
        new Uint8Array(await newFile.arrayBuffer()).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      setFileName(name);
      setFile(fileBuffer);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const baseURL = 'https://app-o6cilvuuja-uc.a.run.app';
      // const baseURL = 'http://127.0.0.1:5001/qualtircomapi/us-central1/app';
      try {
        const res = await fetch(`${baseURL}/api/v1/slides/convert`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            title,
            document: file,
          }),
        });
        if (res.status !== 200) {
          console.log(res.body);
          throw new Error(res.statusText);
        }
        const data = await res.json();
        console.log(data);
        await serverFunctions.loadSlides(data);
      } catch (error) {
        console.error(error);
        alert(
          'An error occured, please try again, try something else or contact the developers'
        );
      }
    } else {
      alert('File not found.');
    }
    return false;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="my-3 text-center">PDF to Slides</h1>
          <form
            onSubmit={handleSubmit}
            className="py-3"
            encType="multipart/form-data"
          >
            <div className="form-group mb-4">
              <label htmlFor="file">Presentation Title</label>
              <input
                onChange={(e) => setTitle(e.target.value || '')}
                value={title}
                placeholder="A mass whatsapp messaging platform software project proposal"
                className="form-control"
                type="text"
                name="title"
                required
              />
            </div>
            <div className="form-group mb-4 document-form-group p-1 py-3">
              <label htmlFor="file" className="w-100 text-center mb-2">
                <i className="fa-solid fa-2x fa-upload"></i>
                &nbsp;Upload PDF
              </label>
              <label htmlFor="file" className="w-100 text-center">
                {fileName || 'No file selected!'}
              </label>
              <input
                onChange={handleFileChange}
                placeholder="PDF file"
                className="form-control"
                type="file"
                name="file"
                required
              />
            </div>
            <div className="form-group mb-4 text-center">
              <button className="btn bg-dark-subtle rounded-pill" type="submit">
                <i className="fa-solid fa-wand-sparkles"></i>
                &nbsp;Generate Slide Deck
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
