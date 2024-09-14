import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import Chat from '@/components/Chat';

const Chatbot = () => {
  return (
    <section className="payment-transfer">
      {/* Encabezado con título y subtítulo */}
      <HeaderBox 
        title="Planes financieros"
        subtext="Inicia el viaje hacia un plan financiero hecho a tu medida. Inicia con un hola..."
      />

      {/* Contenedor del chat con padding superior */}
      <section className="size-full pt-5">
        <Chat />
      </section>
    </section>
  );
}

export default Chatbot;