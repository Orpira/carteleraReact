import {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchPopularMovies,
  fetchMovieGenres,
  SEARCH_API,
} from "../api-thmdb/apiMetodos.js";

export async function getInitialData() {
  const navItems = [{ href: "#login", label: "Iniciar Sesion" }];

  const footerItems = [
    { href: "#privacy", label: "Política de privacidad" },
    { href: "#terms", label: "Términos de servicio" },
    { href: "#help", label: "Ayuda" },
    { href: "#support", label: "Soporte" },
  ];

  const cardsTrend = await fetchTrendingMovies();
  const cardsPopular = await fetchPopularMovies();

  const cardDetails = await Promise.all(
    cardsTrend.map(async (card) => {
      const details = await fetchMovieDetails(card.id);
      return {
        ...card,
        image: `url(https://image.tmdb.org/t/p/original${card.backdrop_path})`,
        title: card.title,
        content: details.overview,
        onClick: () => {
          console.log("Detalles de la película:", details);
        },
      };
    })
  );

  const cardDetPop = await Promise.all(
    cardsPopular.map(async (card) => {
      const details = await fetchMovieDetails(card.id);
      return {
        ...card,
        image: `https://image.tmdb.org/t/p/original${card.poster_path}`,
        title: card.title,
        content: details.overview,
        onClick: () => {},
      };
    })
  );

  const genresList = await fetchMovieGenres();
  const popularByGenre = {};
  genresList.forEach((genre) => {
    popularByGenre[genre.name] = cardsPopular.filter((movie) =>
      movie.genre_ids.includes(genre.id)
    );
  });

  const DEFAULT_GENRES_TO_SHOW = 4;
  const initialGenres = genresList
    .slice(0, DEFAULT_GENRES_TO_SHOW)
    .map((g) => g.name);

  const handleFormSubmit = (data) => {
    setFormResult(data);
    if (onSubmit) onSubmit(data);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (section === "#login" && productsRef.current) {
      setTimeout(() => {
        productsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return {
    navItems,
    footerItems,
    cardsTrend,
    cardsPopular,
    cardDetails,
    cardDetPop,
    genresList,
    popularByGenre,
    DEFAULT_GENRES_TO_SHOW,
    initialGenres,
    handleFormSubmit,
    handleNavClick,
    SEARCH_API,
  };
}
