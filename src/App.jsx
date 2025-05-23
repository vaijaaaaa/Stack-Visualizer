import { useState } from "react";

// Helper function to check matching pairs
const isMatchingPair = (open, close) =>
  (open === "(" && close === ")") ||
  (open === "{" && close === "}") ||
  (open === "[" && close === "]");

// Single Stack Item component with styling
const StackItem = ({ char }) => {
  const colors = {
    "(": "#6BCB77",
    ")": "#6BCB77",
    "{": "#4D96FF",
    "}": "#4D96FF",
    "[": "#FFC93C",
    "]": "#FFC93C",
  };
  return (
    <div
      style={{
        width: 60,
        height: 50,
        margin: "6px 0",
        backgroundColor: colors[char] || "#ddd",
        borderRadius: 8,
        boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 28,
        color: "#222",
        userSelect: "none",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {char}
    </div>
  );
};

// Stack container component
const Stack = ({ stack }) => (
  <div
    style={{
      marginTop: 30,
      padding: 15,
      width: 100,
      minHeight: 240,
      background: "#f9f9f9",
      border: "2px solid #4D96FF",
      borderRadius: 12,
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      boxShadow: "0 0 15px rgba(77, 150, 255, 0.3)",
    }}
  >
    <div
      style={{
        fontWeight: "600",
        color: "#4D96FF",
        marginBottom: 8,
        fontSize: 16,
        userSelect: "none",
      }}
    >
      Stack (Top ↓)
    </div>
    {stack.length === 0 && (
      <div
        style={{
          color: "#aaa",
          fontStyle: "italic",
          marginTop: 70,
          userSelect: "none",
          fontSize: 14,
        }}
      >
        Stack is empty
      </div>
    )}
    {stack.map((ch, i) => (
      <StackItem key={i} char={ch} />
    ))}
  </div>
);

// Main App component
export default function App() {
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const [stack, setStack] = useState([]);
  const [currentChar, setCurrentChar] = useState(null);
  const [message, setMessage] = useState(
    "Enter a bracket expression and press Next Step"
  );
  const [finished, setFinished] = useState(false);

  const reset = () => {
    setIndex(0);
    setStack([]);
    setCurrentChar(null);
    setMessage("Enter a bracket expression and press Next Step");
    setFinished(false);
  };

  const nextStep = () => {
    if (finished) return;

    if (index >= input.length) {
      if (stack.length === 0) {
        setMessage(
          <span style={{ color: "green" }}>
            ✅ Expression is <b>VALID</b> (stack empty at end)
          </span>
        );
      } else {
        setMessage(
          <span style={{ color: "red" }}>
            ❌ Expression is <b>INVALID</b> (stack NOT empty at end)
          </span>
        );
      }
      setCurrentChar(null);
      setFinished(true);
      return;
    }

    const ch = input[index];
    setCurrentChar(ch);

    if ("({[".includes(ch)) {
      // Opening bracket - push it
      setStack((prev) => [...prev, ch]);
      setMessage(
        <>
          <b style={{ color: "#4D96FF" }}>'{ch}'</b> is an opening bracket.{" "}
          <span style={{ color: "#1E5128" }}>Push it onto the stack.</span>
        </>
      );
    } else if (")}]".includes(ch)) {
      // Closing bracket - check match & pop
      if (stack.length === 0) {
        setMessage(
          <span style={{ color: "red" }}>
            ❌ Stack is empty but found closing bracket <b>'{ch}'</b>. Invalid!
          </span>
        );
        setFinished(true);
      } else {
        const top = stack[stack.length - 1];
        if (isMatchingPair(top, ch)) {
          setStack((prev) => prev.slice(0, prev.length - 1));
          setMessage(
            <>
              Closing bracket <b style={{ color: "#4D96FF" }}>'{ch}'</b> matches
              the stack top <b style={{ color: "#4D96FF" }}>'{top}'</b>.{" "}
              <span style={{ color: "#1E5128" }}>Pop it from the stack.</span>
            </>
          );
        } else {
          setMessage(
            <span style={{ color: "red" }}>
              ❌ Closing bracket <b>'{ch}'</b> does NOT match stack top{" "}
              <b>'{top}'</b>. Expression is invalid!
            </span>
          );
          setFinished(true);
        }
      }
    } else {
      setMessage(
        <>
          Character <b>'{ch}'</b> is ignored as it is not a bracket.
        </>
      );
    }

    setIndex((prev) => prev + 1);
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 0 30px rgba(0,0,0,0.1)",
        background: "#ffffff",
      }}
    >
      <h1
        style={{
          color: "#3A86FF",
          textAlign: "center",
          marginBottom: 24,
          fontWeight: "900",
        }}
      >
        Stack Visualizer: Bracket Validator
      </h1>

      <input
        type="text"
        placeholder="Enter bracket expression e.g. {[()]}"
        value={input}
        disabled={index !== 0}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          fontSize: 20,
          padding: "10px 12px",
          borderRadius: 8,
          border: "2px solid #4D96FF",
          marginBottom: 20,
          outline: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <button
          onClick={nextStep}
          disabled={finished || input.length === 0}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            backgroundColor: "#3A86FF",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 4px 10px #3A86FFaa",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#265FCF")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3A86FF")}
        >
          Next Step
        </button>
        <button
          onClick={reset}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            backgroundColor: "#FF5C5C",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 4px 10px #FF5C5Caa",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#C94343")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FF5C5C")}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          fontSize: 20,
          marginBottom: 20,
          textAlign: "center",
          fontWeight: "600",
          userSelect: "none",
        }}
      >
        Current character:{" "}
        <span style={{ color: "#4D96FF", fontSize: 24 }}>
          {currentChar === null ? "-" : `'${currentChar}'`}
        </span>
      </div>

      <div
        style={{
          fontSize: 18,
          minHeight: 72,
          backgroundColor: "#F0F4FF",
          padding: 14,
          borderRadius: 10,
          color: "#333",
          boxShadow: "inset 0 0 8px #A9C0FF",
          userSelect: "text",
        }}
      >
        {message}
      </div>

      <Stack stack={stack} />
    </div>
  );
}
