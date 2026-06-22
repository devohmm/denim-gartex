export default function AdminFloatButton() {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = window.location.origin + window.location.pathname + '?admin=true';
  };

  return (
    <a 
      href="?admin=true"
      onClick={handleClick}
      className="admin-float-button"
      title="Admin Login"
    >
      <span className="admin-float-icon">🔐</span>
      <span className="admin-float-text">Admin</span>
    </a>
  );
}

