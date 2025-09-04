import "./ErrorFallback.css";

export default function ErrorFallback({ error, resetErrorBoundary, refetch }) {
  return (
    <div className="error-container">
      <h1>Oops, something went wrong!</h1>
      {resetErrorBoundary && <p>Try reset the error or reload the page</p>}
      {refetch && <p>Try request to server again or go back</p>}
      {error && <pre className="error-msg">{error.message}</pre>}
      {resetErrorBoundary && (
        <button
          type="button"
          className="btn-effect-press"
          onClick={resetErrorBoundary}
        >
          Reset error
        </button>
      )}
      {!refetch && (
        <button
          type="button"
          className="btn-effect-press"
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload page
        </button>
      )}
      {refetch && (
        <button type="button" className="btn-effect-press" onClick={refetch}>
          Try again
        </button>
      )}
    </div>
  );
}
