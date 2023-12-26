function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/party">
        Qlab
      </a>
      {/* Navbar toggler button */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* Navbar items */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/party">
              Party Mode
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/scholar">
              Scholar Mode
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
