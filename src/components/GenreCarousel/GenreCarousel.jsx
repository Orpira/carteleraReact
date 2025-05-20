import React, { useState } from "react";
import { ButtonCarrusel, Card } from "../../../index.js";
import Modal from "../Modal/Modal";

const GenreCarousel = ({
  genreName,
  movies,
  carouselIndex,
  setCarouselIndex,
  cardDetPop,
  maxTitleLength = 22,
  visibleCount = 5, // Aseguramos que el número de cards visibles sea 5
}) => {
  // Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Función para abrir el modal con los datos de la película seleccionada
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  // Validar las props
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p>No hay películas disponibles para el género "{genreName}".</p>;
  }

  // Aseguramos que siempre se muestren 5 cards
  const safeVisibleCount = Math.min(visibleCount, movies.length);
  const start = Math.max(0, carouselIndex);
  const end = Math.min(start + safeVisibleCount, movies.length);

  const canPrev = start > 0;
  const canNext = end < movies.length;

  const visibleMovies = movies.slice(start, end);

  const goPrev = () =>
    setCarouselIndex(Math.max(carouselIndex - safeVisibleCount, 0));
  const goNext = () =>
    setCarouselIndex(
      Math.min(
        carouselIndex + safeVisibleCount,
        movies.length - safeVisibleCount
      )
    );

  return (
    <div key={genreName} className="w-full max-w-5xl">
      <h3 className="text-2xl font-semibold mb-4 pl-2">{genreName}</h3>
      <div className="relative flex items-center">
        <ButtonCarrusel
          direction="left"
          onClick={goPrev}
          disabled={!canPrev}
          className="left-0"
        />
        <div className="flex gap-6 mx-12 w-full justify-center">
          {visibleMovies.map((card, idx) => {
            let displayTitle = card.title;
            if (card.title.length > maxTitleLength) {
              displayTitle = card.title.slice(0, maxTitleLength - 3) + "...";
            }

            // Validar cardDetPop
            const cardData = Array.isArray(cardDetPop)
              ? cardDetPop.find((c) => c.id === card.id) || card
              : card;

            return (
              <div
                key={card.id || idx}
                className="flex-shrink-0"
                style={{ width: 220 }}
              >
                <Card
                  {...cardData}
                  title={displayTitle}
                  fullScreen={false}
                  useImg={true}
                  onClick={() => openModal(cardData)} // Llama a openModal con los datos de la película
                />
              </div>
            );
          })}
        </div>
        <ButtonCarrusel
          direction="right"
          onClick={goNext}
          disabled={!canNext}
          className="right-0"
        />
      </div>

      {/* Modal para mostrar detalles de la película */}
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedMovie} />
    </div>
  );
};

export default GenreCarousel;