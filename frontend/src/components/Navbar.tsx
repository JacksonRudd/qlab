function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/scholar">
        Qlab
      </a>
      <div className="collapse navbar-collapse">
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
