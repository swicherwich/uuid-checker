import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Make sure to run: npm install uuid
import gearLoadGif from './assets/gear-load.gif';
import "./UuidChecker.css"; // Import the CSS file

export default function UuidChecker() {
  const [uuid, setUuid] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!uuid.trim()) return; // Do nothing if input is empty

    setLoading(true);
    setResult(""); // Clear previous result

    // Simulate processing delay (e.g., API call)
    setTimeout(() => {
      const alreadyChecked = checkedList.includes(uuid);
      if (alreadyChecked) {
        setResult("UUID was found in Global Exposed UUID Database");
      } else {
        setResult("UUID is unique");
        setCheckedList((prev) => [...prev, uuid]);
      }
      setLoading(false);
      setUuid("");
    }, 2000);
  };

  // Generate a random UUID and update the input value
  const handleGenerate = () => {
    const randomUuid = uuidv4();
    setUuid(randomUuid);
  };

  return (
    <div className="uuid-checker-container">
      <form onSubmit={handleSubmit} className="uuid-checker-form">
        <label htmlFor="userInput">Enter UUID to verify</label>
        <input
          id="userInput"
          type="text"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {/* New button to generate a random UUID */}
      {!loading && (
        <button
          onClick={handleGenerate}
          className="uuid-checker-generate-btn"
          disabled={loading}
        >
          Generate Random UUID
        </button>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="uuid-checker-loading">
          <img
            src={gearLoadGif}
            alt="Loading..."
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      )}

      {/* Result message */}
      {result && <p className="uuid-checker-result">{result}</p>}
    </div>
  );
}
