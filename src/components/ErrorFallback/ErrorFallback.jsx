import "./ErrorFallback.css";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h1>Oops, something went wrong!</h1>
      <p>Try reset the error or reload the page</p>
      {error && <pre className="error-msg">{error.message}</pre>}
      <button className="btn-effect-press" onClick={resetErrorBoundary}>
        Reset error
      </button>
      <button
        className="btn-effect-press"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload page
      </button>
    </div>
  );
}
