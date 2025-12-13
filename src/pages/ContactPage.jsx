import React from "react";
import "./contact.css";

export default function ContactPage() {
  return (
    <div className="page-container">
        <section className="card">
          <h2>Contact Us</h2>
          <iframe
            title="Google Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLScSxptr0hL38kTPzhhXoENyC1QgDZpQwk7yKfWKdgL5h8LWqQ/viewform?embedded=true"
            className="iframe"
          >
            Loading…
          </iframe>
        </section>
        <footer className="footer">
          © {new Date().getFullYear()} Agasthya T & Jason Q. All rights reserved.
        </footer>

      </div>
  );
}