import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const RecommendedMovies = ({movieTitles}) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQzYWE0MzBmNzQ4NjJmOWMwMWQyYzU0M2MwMjQyNCIsIm5iZiI6MTc1MDEzMDg3OC4zOTMsInN1YiI6IjY4NTBlMGJlZDVjYzFjNjU0NWVjOTIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JWR8pbdeTaS0DGQrvG5j9WSoFUS5dg9o8Qakb_KAMNA'
    }
  };

  // !! This code is already inside the fetchMovie method
  // fetch('https://api.themoviedb.org/3/search/movie?query=Morgan&include_adult=false&language=en-US&page=1', options)
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async (title) => {
      const encodedTitle = encodeURIComponent(title);
      const url = "https://api.themoviedb.org/3/search/movie?query="+encodedTitle+"&include_adult=false&language=en-US&page=1";

      try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data.results?.[0] || null;
      } catch (error) {
        console.log("Error in fetching movie. ", error);
        return null;
      }
  }
  
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const result = await Promise.all(movieTitles.map((title, index) => fetchMovie(title)));
      setMovies(result.filter(Boolean)); //! USE FILTER BECAUSE SOMETIMES RESULT CAN BE NONE, NULL, UNDEFINED THAT CAUSE APP TO BREAK
      setLoading(false);
    }

    if(movieTitles?.length){
      loadMovies();
    }
  }, [movieTitles])

  if(loading){
    return <p>Loading...</p>
  }
  
  // console.log(movies);

  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
      {movies.map((movie, index) => (
          <Link to={"/movie/"+movie.id} key={index} className='bg-[#232232] rounded-lg overflow-hidden cursor-pointer'>
            <img src={"https://image.tmdb.org/t/p/w300/"+movie.poster_path} loading="lazy" alt="Recommendation Image" className='w-full h-50 object-cover'/>

            <div className='p-2 bg-[#000]'>
              <h3 className='text-sm font-semibold text-white'>{movie.title}</h3>
              <span className='text-xs text-gray-400'>{movie.release_date?.slice(0, 4)}</span>
            </div>
          </Link>
      ))}
    </div>
  )
}

export default RecommendedMovies
