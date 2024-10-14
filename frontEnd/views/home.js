import React from 'react';
import Header from './partials/header';  // Header Component
import Footer from './partials/footer';  // Footer Component

const Home = () => {
  return (
    <div className="home-panel">
      <header className="fixed">
        <Header />
      </header>
      <main className="paddingtop-10vh">
        <img src="/img/bannerhome.png" alt="Home banner" width="100%" />

        <h2 className="margin-0 padding-8">
          <i className="fas fa-map-marker-alt"></i> Busca en el mapa la asistencia más cercana a tu posición
        </h2>
        <div className="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d17532.388538065825!2d-58.40281974631955!3d-34.61395434244975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sbicicletería!5e0!3m2!1ses-419!2sar!4v1632756164918!5m2!1ses-419!2sar"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </main>
      <Footer />

      <a
        href="https://api.whatsapp.com/send?l=es&amp;phone=5491158229190&amp;text=Hola, me gustaría recibir información..."
        className="btn-whatsapp"
        title="¡Escribinos para que podamos ayudarte!"
      >
        <img src="/img/btn-whatsapp.png" alt="WhatsApp button" />
      </a>
    </div>
  );
};

export default Home;
