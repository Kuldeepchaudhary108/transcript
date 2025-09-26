import React, { useState } from "react";
import axios from "axios";
import { Upload, Video, FileText, Loader2 } from "lucide-react";

export default function App() {
  const [input, setInput] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTranscriptProcess = async () => {
    if (!input.trim() && !videoFile) {
      alert("Please paste a transcript or upload a video.");
      return;
    }
    setLoading(true);

    let payload = {};
    if (input.trim()) payload.transcript = input;
    if (videoFile) payload.video = videoFile;

    const res = await axios.post("http://localhost:3000/transcript", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setResult(res.data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Video size={30} /> AI Meeting Notes Assistant
          </h1>
          <p className="mt-2 text-indigo-200">
            Upload videos or transcripts → Get clean notes, summary & action
            items
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Upload Section */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload /> Upload Transcript or Video
          </h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your transcript here..."
            rows={5}
            className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <div className="mt-4 flex items-center gap-4">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="border p-2 rounded-lg"
            />
            <button
              onClick={handleTranscriptProcess}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <FileText />}
              {loading ? "Processing..." : "Generate Notes"}
            </button>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2">
                ✨ Clean Transcript
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {result.cleanTranscript}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2">📌 Summary</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {result.summary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2">✅ Action Items</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {result.actionItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        © 2025 AI Notes Assistant – Export to PDF | DOCX | TXT
      </footer>
    </div>
  );
}
