/**
 * GenreCarousel
 * Componente que muestra un carrusel horizontal de películas para un género específico.
 * Permite navegar entre grupos de películas usando botones de flecha.
 *
 * Props:
 * - genreName: string. Nombre del género a mostrar como título.
 * - movies: array. Lista de películas de ese género (cada una debe tener al menos id, title).
 * - carouselIndex: number. Índice actual del primer elemento visible en el carrusel.
 * - setCarouselIndex: function. Setter para actualizar el índice del carrusel.
 * - cardDetPop: array. Lista de detalles completos de las películas populares (para mostrar descripción, etc).
 * - maxTitleLength: number (opcional, default 22). Máximo de caracteres para el título antes de recortar con '...'.
 * - visibleCount: number (opcional, default 6). Número de películas visibles a la vez en el carrusel.
 *
 * Ejemplo de uso:
 * <GenreCarousel
 *   genreName="Acción"
 *   movies={arrayDePeliculas}
 *   carouselIndex={carouselIndexes["Acción"]}
 *   setCarouselIndex={fnSetCarouselIndex}
 *   cardDetPop={cardDetPop}
 * />
 */
import React from "react";
import { ButtonCarrusel, Card } from "../../../index.js";

const GenreCarousel = ({
  genreName,
  movies,
  carouselIndex,
  setCarouselIndex,
  cardDetPop,
  maxTitleLength = 22,
  visibleCount = 6,
}) => {
  let safeVisibleCount = Math.min(visibleCount, movies.length);
  let start = carouselIndex;
  let end = Math.min(start + safeVisibleCount, movies.length);
  if (start < 0) start = 0;
  if (end > movies.length) end = movies.length;
  if (movies.length <= visibleCount) {
    start = 0;
    end = movies.length;
  } else {
    if (start > movies.length - safeVisibleCount) {
      start = Math.max(movies.length - safeVisibleCount, 0);
      end = movies.length;
    }
  }
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
            const cardData = cardDetPop.find((c) => c.id === card.id) || card;
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
    </div>
  );
};

export default GenreCarousel;
