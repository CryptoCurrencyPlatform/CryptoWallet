import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1 className="app-title">WalletByte</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">About</li>
          <li className="nav-item">Wallet</li>
          <li className="nav-item">Market</li>
          <li className="nav-item">Something else</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header