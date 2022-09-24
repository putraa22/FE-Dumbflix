import React, { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const DetailMovies = () => {
  const [state] = useContext(UserContext);
  let navigate = useNavigate();
  let { id } = useParams();

  let { data: film } = useQuery("FilmCache", async () => {
    const response = await API.get("/film/" + id);
    return response.data.data;
  });
  console.log(film);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Status
    if (state.user.status === false) {
      navigate("/pay");
    }
  }, [state]);
  return (
    <div>
      <div className="video-control">
        <iframe src={film?.linkFilm} allow="autoplay; encrypted-media" allowFullScreen title="video" width="900px" height="300px" />
      </div>
      <div className="detail-bot">
        <div className="detail-desc">
          <div className="img-mov me-3">
            <img src={film?.thumbNail} alt="" width="100%" />
          </div>
          <div className="desc-mov">
            <h2 className="text-white">{film?.title}</h2>
            <div className="d-flex text-muted">
              <p style={{ padding: "3px" }}>{film?.year} </p>
              <p className="ms-3 txt-mtd">{film?.category?.name}</p>
            </div>
            <p
              className=""
              style={{
                textAlign: "justify",
                width: "80%",
                color: "#929292",
              }}
            >
              {film?.description}
            </p>
          </div>
        </div>
        <div className="detail-play">
          <div
            className="img-in-play mt-1"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(104, 106, 116, 0), rgba(0, 0, 0, 0.99)),url(${film?.thumbNail})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="d-flex justify-content-center align-items-end" style={{ width: "100%", marginTop: "10px" }}>
              <p
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                In Play Now <br />
                <br />
                <br />
                <span className="text-muted">{film?.title}</span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovies;
