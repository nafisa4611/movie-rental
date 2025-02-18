import React, { useContext, useState } from 'react'
import { getImgUrl } from '../utils/cine-utility';
import Rating from './Rating';
import MovieDetailsModal from './MovieDetailsModal';
import tag from '../assets/tag.svg';
import { MovieContext } from '../context';
import { toast } from 'react-toastify';

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // const {cartData, setCartData} = useContext(MovieContext);
  const {state, dispatch} = useContext(MovieContext);
  
  function handleAddToCart(e, movie){
    e.stopPropagation();
    const found = state.cartData.find((item) => item.id === movie.id);
    // if(!found){
    //   setCartData([...state.cartData, movie]);
    // }
    // else {
    //   alert('Movie already in Cart');
    // }
    if(!found){
      dispatch({
        type: 'ADD_TO_CART', 
        payload:{
          ...movie,
        }
      })
      toast.success('Movie added to cart',  {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    else {
      toast.error('Movie added to cart already',  {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  function handleModalClose() {
    setSelectedMovie(null);
    setShowModal(false);
  }

  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  
  return (
    <>

      {showModal && <MovieDetailsModal
        movie={selectedMovie}
        onCartAdd={handleAddToCart}
        onClose={handleModalClose}
      />}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href='#' onClick={() => handleMovieSelection(movie)}>
          <img className="w-full object-cover" src={getImgUrl(movie.cover)} alt={movie.title} />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e)=>handleAddToCart(e, movie)}
              >
              <img src={tag} alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  )
}
