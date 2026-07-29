import "../App.css";

import NoteInput from "../components/NoteInput";
import GraphCanvas from "../components/GraphCanvas";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

function Home() {
  return (
    <div className="container">

      <h1 className="title">Socratic Study Canvas</h1>

      <NoteInput />

      <div className="content">

        <GraphCanvas />

        <div className="sidebar">

          <QuestionCard />

          <ProgressBar />

        </div>

      </div>

    </div>
  );
}

export default Home;