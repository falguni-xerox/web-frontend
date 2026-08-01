import "../styles/NotFound.css";
function NotFound() {
  return (
    <section className="not-found-page">
      <div className="container">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for does not exist.
        </p>

        <a href="/" className="not-found-btn">
          Go to Home
        </a>

      </div>
    </section>
  );
}

export default NotFound;