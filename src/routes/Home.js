import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    //data를 가져오는데 시간이 걸리기때문에 async를 사용
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false }); // {movies:movies}와 동일, 데이터를 다 가져오면 isLoading의 값을 false로 변경
  };
  componentDidMount() {
    //render을 호출하면 제일 먼저 실행되는 함수
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state; //변수의 값을 가져오기. 이거 안하면 변수 사용을 this.state.movie로 사용해야함
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie //map은 항상 return 해야함
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
