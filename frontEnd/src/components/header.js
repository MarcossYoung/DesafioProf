import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserProvider';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="background_amarillo zindex-1">
      <div>
        <div className="titulo">
          <Link to="/">
            <img className="logo" src="/img/appedal-logo.svg" alt="logo" />
          </Link>
          <h1 className="h1-header">Ayudándote donde estés</h1>
        </div>
        <form action="/login" method="GET" className="align-center">
          <button className="size-65x20">
            Login <i className="fas fa-sign-in-alt"></i>
          </button>
        </form>
      </div>

      <nav className="navbar  no-wrap">
        <ul className="ul-md">
          <li><Link className="quienes" to="/">Quiénes Somos</Link></li>
          <li><Link to="/api/products">Productos</Link></li>


          {!user ? (
            <>
              <li className="floatR"><Link to="/api/users/login">Login</Link></li>
              <li className="floatR"><Link to="/api/users/registro">Registro</Link></li>
            </>
          ) : (
            <li className="floatR"><Link to="/api/users/profile">Perfil</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
