import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <>
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f7f7f8",
          }}
        >
          <section
            style={{
              background: "#fff",
              borderRadius: "1.2rem",
              boxShadow: "0 4px 24px rgba(220, 38, 38, 0.15)",
              padding: "2.5rem 2rem",
              minWidth: 340,
              maxWidth: 400,
              textAlign: "center",
              border: "2px solid #dc2626",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                color: "#dc2626",
                marginBottom: "1rem",
              }}
            >
              &#9888;
            </div>
            <h1 style={{ color: "#dc2626", marginBottom: "0.5rem" }}>
              Servicio fuera de línea
            </h1>
            <p style={{ color: "#b91c1c", marginBottom: "1.5rem" }}>
              Error: No se pueden obtener los trabajadores de la base de datos.
            </p>
            <small style={{ color: "#888" }}>
              Intenta recargar la página más tarde.
            </small>
          </section>
        </div>
      </>;
    }
    return this.props.children;
  }
}



export default ErrorBoundary;
