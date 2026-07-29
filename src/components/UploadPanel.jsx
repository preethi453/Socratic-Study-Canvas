import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
import { useState, useRef } from "react";
import "../styles/upload.css";

import api from "../services/api";

import {
  UploadCloud,
  FileText,
  Sparkles,
  X,
} from "lucide-react";

 function UploadPanel({
  setGraphData,
  setNotes,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
const handleGenerate = async () => {
  if (!file) {
    alert("Please upload a file first.");
    return;
  }

  try {
    setLoading(true);

    let notes = "";

    // TXT
    if (file.type === "text/plain") {
      notes = await file.text();
    }

    // PDF
    else if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
        const page = await pdf.getPage(pageNo);

        const textContent = await page.getTextContent();

        notes +=
          textContent.items
            .map((item) => item.str)
            .join(" ") + "\n";
      }
    }

    // DOCX
    else if (
      file.name.endsWith(".docx")
    ) {
      const arrayBuffer = await file.arrayBuffer();

      const result = await mammoth.extractRawText({
        arrayBuffer,
      });

      notes = result.value;
    }

    // Unsupported
    else {
      alert("Unsupported file format.");
      return;
    }

    console.log("Extracted Notes:");
    console.log(notes);
    setNotes(notes);

    const response = await api.post("/generate", {
      notes,
    });

    console.log("Backend Response:");
console.log(JSON.stringify(response.data, null, 2));

setGraphData(response.data.data);

    alert("Knowledge Graph Generated Successfully!");

 } catch (error) {

  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("Response Data:", error.response.data);
    console.log("Status:", error.response.status);
  }

  alert(
    error.response?.data?.message ||
    error.message ||
    "Failed to generate knowledge graph."
  );

} finally {

  setLoading(false);

}
};

  return (
    <section className="upload-panel">

      <div className="upload-header">
        <h2>Upload Study Notes</h2>

        <p>
          Upload PDF, DOCX or TXT files to generate an AI knowledge graph.
        </p>
      </div>

      <div
        className="upload-box"
        onClick={() => fileInputRef.current.click()}
      >

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFile}
          hidden
        />

        <UploadCloud
          className="upload-icon"
          size={44}
        />

        <h3>Drag & Drop your notes here</h3>

        <p>or click to browse your files</p>

        <button
          type="button"
          className="browse-btn"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current.click();
          }}
        >
          Browse Files
        </button>

        <small>PDF • DOCX • TXT</small>

      </div>

      {file && (
        <div className="file-card">

          <div className="file-left">

            <FileText size={22} />

            <div className="file-info">
              <h4>{file.name}</h4>
              <p>{(file.size / 1024).toFixed(1)} KB</p>
            </div>

          </div>

          <button
            className="remove-btn"
            onClick={() => setFile(null)}
          >
            <X size={18} />
          </button>

        </div>
      )}

      <div className="upload-actions">

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          <Sparkles size={16} />

          {loading
            ? "Generating..."
            : "Generate Knowledge Graph"}
        </button>

      </div>

    </section>
  );
}

export default UploadPanel;