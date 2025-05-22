import React, { useState, useRef } from "react";
import { getInitialData } from "./config/initialData.js";

// Importa los componentes desde tus librerías personalizadas
import {
  Head,
  Footer,
  Checkbox,
  Card,
  ButtonCarrusel,
  GenreCarousel,
  Form,
  Modal, // Importa el Modal actualizado
} from "../index.js";

// Cargar datos iniciales desde un solo archivo
const {
  navItems,
  footerItems,
  cardDetails,
  cardDetPop,
  genresList,
  popularByGenre,
  DEFAULT_GENRES_TO_SHOW,
  initialGenres,
  SEARCH_API,
} = await getInitialData();

function App({ onSubmit }) {
  const [formResult, setFormResult] = useState(null);
  const [activeSection, setActiveSection] = useState("#login"); // sección activa
  const [currentIndex, setCurrentIndex] = useState(0); // índice del carrusel
  const [transition, setTransition] = useState(0); // para animación
  const [selectedGenres, setSelectedGenres] = useState(initialGenres);
  const [carouselIndexes, setCarouselIndexes] = useState({}); // Estado global para los índices de carrusel por género
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);
  const [isLoginFormVisible, setLoginFormVisible] = useState(false); // Estado para mostrar el formulario
  const searchResultsRef = useRef(null); // Ref para hacer scroll a los resultados de búsqueda

  // UI para seleccionar géneros a mostrar
  const handleGenreChange = (genreName) => {
    setSelectedGenres((prev) =>
      prev.includes(genreName)
        ? prev.filter((g) => g !== genreName)
        : [...prev, genreName]
    );
  };

  // Carrusel: funciones para navegar
  const goToPrev = () => {
    setTransition(-1);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? cardDetails.length - 1 : prev - 1
      );
      setTransition(0);
    }, 300);
  };

  const goToNext = () => {
    setTransition(1);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === cardDetails.length - 1 ? 0 : prev + 1
      );
      setTransition(0);
    }, 300);
  };

  // Manejar clics en el Navbar
  const handleNavClick = (href) => {
    if (href === "#login") {
      setLoginFormVisible(true); // Mostrar el formulario
    } else {
      setActiveSection(href); // Lógica existente
    }
  };

  // Manejar envío del formulario
  const handleFormSubmit = (data) => {
    setFormResult(data);
    setLoginFormVisible(false); // Ocultar el formulario después de enviar
    if (onSubmit) onSubmit(data);
  };

  // Hook para buscar películas en la API cuando searchTerm cambia
  React.useEffect(() => {
    let ignore = false;
    async function fetchSearch() {
      if (searchTerm.trim() === "") return;
      const LOCAL_API_KEY = import.meta.env.VITE_API_KEY;
      const url = `${SEARCH_API}api_key=${LOCAL_API_KEY}&language=es-ES&query=${encodeURIComponent(searchTerm)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!ignore && data.results) {
        setSearchedMovies(data.results);
      }
    }
    fetchSearch();
    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  React.useEffect(() => {
    if (searchTerm.trim() !== "" && searchResultsRef.current) {
      setTimeout(() => {
        searchResultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 2800);
    }
  }, [searchTerm]);

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 flex flex-col">
      <Head
        logo="./src/assets/react.png"
        title="Movies React"
        navItems={navItems}
        navClassName="flex gap-4 justify-center mb-4"
        onNavClick={handleNavClick}
        onSearch={setSearchTerm}
      />
      {/* Título para los tests */}
      <h1 className="sr-only">Bienvenido a mi aplicación</h1>
      <main className="p-0 flex-1">
        {/* Modal reutilizado para el formulario */}
        <Modal isOpen={isLoginFormVisible} onClose={() => setLoginFormVisible(false)}>
          <Form onSubmit={handleFormSubmit} />
        </Modal>
        
        {/* Modal para detalles de película */}
        <Modal isOpen={isMovieModalVisible} onClose={() => setIsMovieModalVisible(false)}>
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

        {/* Espacio entre secciones */}
        <div className="h-10 w-full" />

        {/* Selector de géneros */}
        <Checkbox
          genresList={genresList}
          selectedGenres={selectedGenres}
          handleGenreChange={handleGenreChange}
        />

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
          <section className="m-0 w-screen min-h-screen relative overflow-x-hidden overflow-y-auto pb-10 bg-gray-50">
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
      <Footer>
        &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
        reservados.
      </Footer>
    </div>
  );
}

export default App;
