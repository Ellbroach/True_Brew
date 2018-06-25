import axios from 'axios';

const GET_REVIEWS = 'GET_REVIEWS';
const CREATE_REVIEW = 'CREATE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const createReview = review => ({type: CREATE_REVIEW, review})
const updateReview = review => ({type: UPDATE_REVIEW, review})
const deleteReview = id => ({type: DELETE_REVIEW, id})

export const fetchReviews = () => dispatch =>
    axios.get('/api/reviews')
        .then(res => res.data)
        .then(reviews => dispatch(getReviews(reviews)))
        .catch(err => console.error('Fetching Reviews unsuccesful.', err))

export const addReview = review => dispatch =>
    axios.post('/api/reviews', review)
        .then(res => res.data)
        .then(newReview => dispatch(createReview(newReview)))
        .catch(err => console.error(`Creating Review ${review} unsuccesful.`, err))

export const editReview = (review, id) => dispatch =>
    axios.put(`/api/reviews/${id}`, review)
        .then(res => res.data)
        .then(editedReview => dispatch(updateReview(editedReview)))
        .catch(err => console.error(`Updating Review ${review} unsuccesful.`, err))

export const removeReview = id => dispatch =>
    axios.delete(`/api/reviews/${id}`)
        .then(() => dispatch(deleteReview(id)))
        .catch(err => console.error(`Deleting Review (id: ${id}) unsuccesful.`, err))

export default function reducer(reviews = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case CREATE_REVIEW:
      return [...reviews, action.review];
    case UPDATE_REVIEW:
      return reviews.map(review => {
        return review.id === action.review.id ? action.review : review
      });
    case DELETE_REVIEW:
      return reviews.filter(review => review.id !== action.review.id);
    default:
      return reviews;
  }
}
