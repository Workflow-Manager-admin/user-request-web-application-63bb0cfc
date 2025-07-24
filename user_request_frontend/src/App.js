import React, { useState, useEffect } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    request: "",
  });
  const [requests, setRequests] = useState([]);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const handleInputChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.request) {
      setRequests([
        ...requests,
        {
          id: Date.now(),
          ...formState,
        },
      ]);
      setFormState({ name: "", email: "", request: "" });
    }
  };

  return (
    <div className="App app-outer">
      <header className="main-header">
        <div className="header-content">
          <h1>User Requests</h1>
          <span className="accent-dot"></span>
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main className="main-content-area">
        <section className="user-form-section">
          <h2>Submit a Request</h2>
          <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="you@email.com"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="request">
                Request
                <textarea
                  id="request"
                  name="request"
                  value={formState.request}
                  onChange={handleInputChange}
                  placeholder="What do you need help with?"
                  rows={3}
                  required
                />
              </label>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </section>
        <section className="requests-display-section">
          <h2>User Submitted Requests</h2>
          {requests.length === 0 ? (
            <div className="empty-state">No requests yet.</div>
          ) : (
            <ul className="requests-list">
              {requests.map((req) => (
                <li className="request-card" key={req.id}>
                  <div>
                    <span className="req-name">{req.name}</span>
                    <span className="req-email">&lt;{req.email}&gt;</span>
                  </div>
                  <p className="req-body">{req.request}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <footer className="app-footer">
        <div>
          <span>User Request Web Application &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
