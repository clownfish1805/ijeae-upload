import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./UpdatePublication.css";

const UpdatePublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState({
    title: "",
    year: "",
    volume: "",
    content: "",
    author: "",
  });
  console.log("ID from useParams:", id); // Add this to UpdatePublication.js

  useEffect(() => {
    axios
      .get(`https://eeman.in:15002/publications/${id}`)
      .then((res) => setPublication(res.data))
      .catch((err) => console.error("Error loading data:", err));
  }, [id]);

  const handleChange = (e) => {
    setPublication({ ...publication, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://eeman.in:15002/publications/${id}`, publication);
      alert("Publication updated successfully");
      navigate("/publications");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed.");
    }
  };

  return (
    <>
      <Header />
      <div className="update-container">
        <h2>Update Publication</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={publication.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="year"
            value={publication.year}
            onChange={handleChange}
            placeholder="Year"
            required
          />
          <input
            name="volume"
            value={publication.volume}
            onChange={handleChange}
            placeholder="Volume"
            required
          />
          <input
            name="content"
            value={publication.content}
            onChange={handleChange}
            placeholder="Content"
          />
          <input
            name="author"
            value={publication.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePublication;
