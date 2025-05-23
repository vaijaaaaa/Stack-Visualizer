import React, { useState } from "react";

// Helper function to check if brackets match
const isMatchingPair = (open, close) =>
  (open === "(" && close === ")") ||
  (open === "{" && close === "}") ||
  (open === "[" && close === "]");

// StackItem: Colored bracket box
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

// Stack visual component
const Stack = ({ stack }) => (
  <div
    style={{
      marginTop: 30,
      padding: 15,
      width: 100,
      minHeight: 240,
      background: "#fff",
      border: "2px solid #4D96FF",
      borderRadius: 12,
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      boxShadow: "0 0 15px rgba(77, 150, 255, 0.3)",
      alignSelf: "center",
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
    {stack.length === 0 ? (
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
    ) : (
      stack.map((ch, i) => <StackItem key={i} char={ch} />)
    )}
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
      setCurrentChar(null);
      setFinished(true);
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
      return;
    }

    const ch = input[index];
    setCurrentChar(ch);

    if ("({[".includes(ch)) {
      setStack((prev) => [...prev, ch]);
      setMessage(
        <>
          <b style={{ color: "#4D96FF" }}>'{ch}'</b> is an opening bracket.{" "}
          <span style={{ color: "#1E5128" }}>Push it onto the stack.</span>
        </>
      );
    } else if (")}]".includes(ch)) {
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

  const handleInputChange = (e) => {
    if (index === 0) {
      setInput(e.target.value);
    }
  };

  const isNextDisabled = finished || input.length === 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#e8f0fe",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 12,
          boxShadow: "0 0 30px rgba(0,0,0,0.1)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "#3A86FF",
            textAlign: "center",
            marginBottom: 24,
            fontWeight: "900",
            fontSize: "clamp(20px, 5vw, 28px)",
          }}
        >
          Stack Visualizer: Bracket Validator
        </h1>

        <input
          type="text"
          placeholder="Enter bracket expression e.g. {[()]}"
          value={input}
          onChange={handleInputChange}
          style={{
            width: "100%",
            fontSize: 18,
            padding: "12px 16px",
            borderRadius: 8,
            border: `2px solid ${index > 0 ? "#ccc" : "#4D96FF"}`,
            marginBottom: 20,
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: index > 0 ? "#f5f5f5" : "#fff",
            color: index > 0 ? "#666" : "#000",
            cursor: index > 0 ? "not-allowed" : "text",
          }}
          readOnly={index > 0}
          aria-label="Bracket expression input"
        />

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={nextStep}
            disabled={isNextDisabled}
            style={{
              padding: "12px 24px",
              fontSize: 16,
              backgroundColor: isNextDisabled ? "#ccc" : "#3A86FF",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: isNextDisabled ? "not-allowed" : "pointer",
              boxShadow: isNextDisabled ? "none" : "0 4px 10px #3A86FFaa",
              transition: "all 0.2s ease",
            }}
            aria-label="Execute next step of validation"
          >
            Next Step
          </button>
          <button
            onClick={reset}
            style={{
              padding: "12px 24px",
              fontSize: 16,
              backgroundColor: "#FF5C5C",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 4px 10px #FF5C5Caa",
              transition: "all 0.2s ease",
            }}
            aria-label="Reset validation"
          >
            Reset
          </button>
        </div>

        <div
          style={{
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
            fontWeight: "600",
            userSelect: "none",
          }}
        >
          Current character:{" "}
          <span style={{ color: "#4D96FF", fontSize: 22 }}>
            {currentChar === null ? "-" : `'${currentChar}'`}
          </span>
        </div>

        <div
          style={{
            fontSize: 16,
            minHeight: 80,
            backgroundColor: "#F0F4FF",
            padding: 16,
            borderRadius: 10,
            color: "#333",
            boxShadow: "inset 0 0 8px #A9C0FF",
            userSelect: "text",
            lineHeight: "1.4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {message}
        </div>

        <Stack stack={stack} />
      </div>
    </div>
  );
}