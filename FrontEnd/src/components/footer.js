import React from 'react';

const Footer = () => {
  return (
    <footer>
      {}
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

      <div className="row">
        <div className="col-footer">
          <h4>APPEDAL</h4>
          <div className="separador1"></div>
          <p className="marginbtm-0 justify">
            Con el auge de la movilidad individual urbana sustentable surge
            la necesidad de contar con una red de asistencia para la
            reparación de la bici durante las salidas por las calles de la
            ciudad.
          </p>
          <p className="margintop-0 justify">
            Nuestra plataforma se basa en poder conectarte con un mecanico
            ambulante para bicicletas. La aplicación y la página web ambas
            tendrán un mapa interactivo de tu localidad que te dirá dónde
            están las bicicleterías más cercanas y además tendrá la ubicación
            de los mecánicos ambulantes para que puedan ir a ayudarte, con
            el beneficio de poder pagar el arreglo con tu tarjeta de débito
            o crédito desde tu billetera virtual.
          </p>
        </div>

        <div className="col-footer">
          <h4>ENLACES ÚTILES</h4>
          <div className="separador1"></div>
          <ul className="padliless">
            <li><a href="quienessomos.html">Quiénes Somos</a></li>
            <li><a href="/product">Productos</a></li>
            <li><a href="faq.html">Preguntas Frecuentes</a></li>
            <li><a href="/legales">Aviso Legal</a></li>
          </ul>
        </div>

        <div className="col-footer">
          <h4>CONTACTO</h4>
          <div className="separador1"></div>
          <p className="marginbtm-0">Dirección Real</p>
          <p className="margin-0">Ciudad de Buenos Aires</p>
          <p>Tel: +54 (011) 2000-2000</p>
          <a href="contacto.html" className="foot-contacto">Contacto</a>
          <div className="row-fix">
            <a href="https://www.facebook.com/pages/appdal" className="fb">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/appedal" className="tw">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://plus.google.com/pin" className="gp">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="https://www.linkedin.com/company/appedal" className="lin">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="btm-foot">
        <div>
          Todos los derechos reservados / © 2021 APPEDAL /
          <a href="/legales">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
