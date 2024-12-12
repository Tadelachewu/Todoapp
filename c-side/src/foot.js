import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./foot.module.css";

const Footer = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "", cgpa: "" });

  // Fetch data from the backend
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/about");
      setResponse(res.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Submit new record to the backend
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/about", formData);
      console.log("Success:", res.data);
      fetchData(); // Refresh data after submission
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Data Records</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>CGPA</th>
            </tr>
          </thead>
          <tbody>
            {response.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Add New Record</h2>
      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cgpa"
          placeholder="CGPA"
          value={formData.cgpa}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Footer;