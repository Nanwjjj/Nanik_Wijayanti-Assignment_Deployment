import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fungsi ini akan menambakan data menggunakan http method yakni POST
  // Data yang kita kirimkan adalah inputan yang sudah dilakuakn pada page addphoto
  const addPhoto = async (e) => {
    e.preventDefault();
    if (secret === "password") {
      await fetch("https://gallery-app-server.vercel.app/photos", {
        method: "POST",
        body: JSON.stringify({ imageUrl, captions, secret, createdAt: "12/02/03", updatedAt: "22/12/2022" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/photos");
    } else {
      setError("You are not authorized");
    }
  };

  return (
    <>
      <div className="container">
        {error && (
          <div className="error-msg" color="white">
            {error}
          </div>
        )}
        <form className="add-form" onSubmit={addPhoto}>
          <label>
            Image Url:
            <input className="add-input" type="text" data-testid="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </label>
          <label>
            Captions:
            <input className="add-input" type="text" data-testid="captions" value={captions} onChange={(e) => setCaptions(e.target.value)} />
          </label>
          <label>
            Secret:
            <input className="add-input" type="text" value={secret} data-testid="secret" onChange={(e) => setSecret(e.target.value)} />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
