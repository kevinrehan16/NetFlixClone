import React, { useEffect, useState } from 'react'
import {Link} from 'react-router'
import CardImg from '../assets/cardimg.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"

const Cardlist = ({title, category}) => {

  const [data, setData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQzYWE0MzBmNzQ4NjJmOWMwMWQyYzU0M2MwMjQyNCIsIm5iZiI6MTc1MDEzMDg3OC4zOTMsInN1YiI6IjY4NTBlMGJlZDVjYzFjNjU0NWVjOTIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JWR8pbdeTaS0DGQrvG5j9WSoFUS5dg9o8Qakb_KAMNA'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/'+category+'?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => {
      if(res.results && res.results.length > 0){
        setData(res.results);
      }
    })
    .catch(err => console.error(err));
  }, [])

  // console.log(data);

  
  return (
    <div className='text-white md:px-4'>
      <h2 className='pt-10 pb-5 text-lg font-medium'>{title}</h2>

      <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
        {data.map((item, index) => (
            <SwiperSlide key={index} className='max-w-72'>
              <Link to={"/movie/"+item.id}>
                <img src={"https://image.tmdb.org/t/p/original/"+item.backdrop_path} loading='lazy' alt="Card" className='h-44 w-full object-center object-cover'/>
                <p className='text-center pt-2'>{item.original_title}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default Cardlist
