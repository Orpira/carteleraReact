import React, { useEffect, useState } from "react";
import { Head, Footer } from "../index.js";
import MainContent from "./components/MainContent/MainContent.jsx";
import { getInitialData } from "./config/initialData.js";

function App(props) {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getInitialData().then(setInitialData);
  }, []);

  if (!initialData) return <div>Cargando...</div>;

  return (
    <div className="bg-black min-h-screen text-gray-900 flex flex-col">
      <Head
        logo="./src/assets/react.png"
        title="Movies React"
        navClassName="flex gap-4 justify-center mb-4"
      />
      <h1 className="sr-only">Bienvenido a mi aplicación</h1>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <main className="p-0 flex-1">
        {/* Modal reutilizado para el formulario */}
        <Modal
          isOpen={isLoginFormVisible}
          onClose={() => setLoginFormVisible(false)}
        >
          <Form onSubmit={handleFormSubmit} />
        </Modal>

        {/* Modal para detalles de película */}
        <Modal
          isOpen={isMovieModalVisible}
          onClose={() => setIsMovieModalVisible(false)}
        >
          {selectedMovie && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                className="w-full h-96 object-cover mb-4 rounded-lg"
              />
              <p className="text-gray-600">{selectedMovie.overview}</p>
            </div>
          )}
        </Modal>

        <section className="m-0 w-screen h-screen relative overflow-hidden">
          <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
              <ButtonCarrusel direction="left" onClick={goToPrev} />
              <div
                className={
                  "w-screen h-screen flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] " +
                  (transition === 0
                    ? "translate-x-0"
                    : transition === 1
                    ? "translate-x-full"
                    : "-translate-x-full")
                }
              >
                <Card
                  key={currentIndex}
                  {...cardDetails[currentIndex]}
                  fullScreen
                  useImg={false}
                />
              </div>
              <ButtonCarrusel direction="right" onClick={goToNext} />
            </div>
          </div>
        </section>


        {/* Selector de géneros */}

        {/* Carruseles de populares por género o resultados de búsqueda global */}
        {searchTerm.trim() !== "" ? (
          <section
            ref={searchResultsRef}
            className="w-full min-h-screen flex flex-col items-center p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Resultados de búsqueda</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {searchedMovies.length === 0 ? (
                <p className="text-lg text-gray-500">
                  No se encontraron resultados.
                </p>
              ) : (
                searchedMovies.map((movie) => {
                  const details =
                    cardDetPop.find((c) => c.id === movie.id) || movie;
                  let displayTitle = details.title;
                  if (displayTitle && displayTitle.length > 22) {
                    displayTitle = displayTitle.slice(0, 19) + "...";
                  }
                  return (
                    <div
                      key={movie.id}
                      className="flex-shrink-0"
                      style={{ width: 220 }}
                    >
                      <Card
                        {...details}
                        title={displayTitle}
                        image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        fullScreen={false}
                        useImg={true}
                        onClick={() => {
                          setSelectedMovie(movie);
                          setIsMovieModalVisible(true);
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </section>
        ) : (
          <section className="m-0 w-screen min-h-screen relative overflow-x-hidden overflow-y-auto pb-10 bg-black">
            <div className="w-full flex flex-col gap-12 items-center p-8">
              {selectedGenres.map((genreName) => {
                const movies = popularByGenre[genreName] || [];
                if (!movies.length) return null;
                const carouselIndex = carouselIndexes[genreName] || 0;
                const setCarouselIndex = (newIndex) => {
                  setCarouselIndexes((prev) => ({
                    ...prev,
                    [genreName]: newIndex,
                  }));
                };
                return (
                  <GenreCarousel
                    key={genreName}
                    genreName={genreName}
                    movies={movies}
                    carouselIndex={carouselIndex}
                    setCarouselIndex={setCarouselIndex}
                    cardDetPop={cardDetPop}
                    maxTitleLength={22}
                    visibleCount={4}
                  />
                );
              })}
            </div>
          </section>
        )}
      </main>
=======
      <MainContent {...initialData} {...props} />
>>>>>>> Stashed changes
=======
      <MainContent {...initialData} {...props} />
>>>>>>> Stashed changes
      <Footer>
        &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
        reservados.
      </Footer>
    </div>
  );
}

export default App;
