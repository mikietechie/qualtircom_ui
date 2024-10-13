/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useState } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';

const App = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('title', title);
      try {
        const res = await fetch(
          'https://app-o6cilvuuja-uc.a.run.app/api/v1/slides/convert',
          {
            method: 'POST',
            body: formData,
          }
        );
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
          <h1 className="my-3 text-center">PDF 2 Slides</h1>
          <form
            onSubmit={handleSubmit}
            className="py-5"
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
            <div className="form-group mb-4">
              <label htmlFor="file">PDF File</label>
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
              <button className="btn btn-primary" type="submit">
                Upload 🚀🚀🚀
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
