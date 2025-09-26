import React, { useState } from "react";
import axios from "axios";
export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cleanTranscript, setCleanTranscript] = useState("");
  const [summary, setSummary] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  const handleProcess = async () => {
    if (!input.trim()) {
      alert("Please paste a transcript first.");
      return;
    }
    setLoading(true);

    // Mock AI response (replace with GPT API if available)
    // setTimeout(() => {
    //   const cleanTranscript =
    //     "We need to finish the design by Monday. John will send the client the report. We should schedule another meeting.";
    //   const summary = [
    //     "Design deadline: Monday",
    //     "John to send client report",
    //     "Another meeting to be scheduled",
    //   ];
    //   const actionItems = [
    //     "John → Send client report",
    //     "Team → Finish design by Monday",
    //   ];

    //   setResult({
    //     cleanTranscript,
    //     summary,
    //     actionItems,
    //   });
    //   setLoading(false);
    // }, 1500);

    const res = await axios.post("http://localhost:3000/transcript", input);

    console.log(res);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">
            📄 AI-Powered Meeting Notes Cleaner
          </h1>
          <p className="mt-2 text-indigo-200">
            Paste messy transcripts → Get clean notes, summary, and action items
          </p>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        {/* Input */}
        <section>
          <h2 className="text-xl font-semibold mb-2">📝 Paste Transcript</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your messy transcript here..."
            rows={6}
            className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
          <button
            onClick={handleProcess}
            disabled={loading}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Clean & Summarize"}
          </button>
        </section>

        {/* Results */}
        {result && (
          <section className="mt-8 space-y-6">
            {/* Clean Transcript */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                ✨ Clean Transcript
              </h3>
              <p className="text-gray-700">{result.cleanTranscript}</p>
            </div>

            {/* Summary */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">📌 Summary</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {result.summary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">✅ Action Items</h3>
              {result.actionItems.length > 0 ? (
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {result.actionItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No action items found.</p>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600">
        © 2025 AI Meeting Notes Cleaner
      </footer>
    </div>
  );
}
