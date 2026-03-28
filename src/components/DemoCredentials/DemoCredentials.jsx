import "./DemoCredentials.css";

const DEMO_USERS = [
  { label: "User", username: "user", password: "12345U", role: "user" },
  { label: "Admin", username: "admin", password: "12345A", role: "admin" },
];

function DemoCredentials({ onSelect }) {
  return (
    <div className="demo-credentials fancy-background">
      <h2 className="demo-credentials-title">Demo access</h2>
      <p className="demo-credentials-subtitle">(for testing all features)</p>

      <ul className="demo-credentials-list">
        {DEMO_USERS.map((item) => (
          <li key={item.username} className="demo-credentials-item">
            <button
              type="button"
              className="demo-credentials-button btn btn-effect-shadow"
              onClick={() => onSelect?.({ username: item.username, password: item.password })}
            >
              <span className={`demo-credentials-role ${item.role}`}>{item.label}</span>

              <div className="demo-credentials-data">
                <div>
                  login: <span>{item.username}</span>
                </div>
                <div>
                  password: <span>{item.password}</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DemoCredentials;
