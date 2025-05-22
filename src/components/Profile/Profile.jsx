import React from "react";
import MainContent from "../MainContent/MainContent.jsx";
import { getInitialData } from "../../config/initialData.js";

const {
  cardDetails,
  genresList,
  popularByGenre,
  initialGenres,
  SEARCH_API,
  cardDetPop,
} = await getInitialData();

const Profile = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bienvenido a tu perfil</h1>
      <MainContent
        cardDetails={cardDetails}
        genresList={genresList}
        popularByGenre={popularByGenre}
        initialGenres={initialGenres}
        SEARCH_API={SEARCH_API}
        cardDetPop={cardDetPop}
      />
    </div>
  );
};

export default Profile;
