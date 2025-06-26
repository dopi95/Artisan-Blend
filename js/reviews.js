const reviews = [
  {
    author: "Jonathan",
    rating: 5,
    comment: `What a gem! I stumbled upon Artisan Blend while exploring Nairobi, and it became my daily stop. Excellent 
            service, a warm vibe, and honestly, better coffee than some places back home`,
    category: "ambience"
  },
  {
    author: "Jane",
    rating: 5,
    comment: `Their signature burger is juicy, well-seasoned, and served with crispy fries. A must-try!`,
    category: "food"
  },
  {
    author: "James",
    rating: 4,
    comment: `I wasn't expecting much from the vegan bowl, but it blew me away. So satisfying!`,
    category: "ambience"
  },
  {
    author: "Annicole",
    rating: 5,
    comment: `The avocado toast was fresh and flavorful-simple, but done perfectly!`,
    category: "food"
  }
];

// LOAD DOM ELEMENTS
const reviewsContainer = document.querySelector('#reviews_container');
const loadMoreBtn = document.querySelector('#load_more_btn');
const categoryBtns = document.querySelectorAll('#category_btn');

// VARIABLES FOR DEFINING THE STATE OF REVIEWS
let selectedCategory = 'all';
let visibleCount = 4;
let filteredReviews = [...reviews]; // spread operator to copy the reviews array

// RENDER REVIEWS FN
function renderReviews(){
  reviewsContainer.innerHTML = "";
  const visibleReviews = filteredReviews.slice(0,visibleCount);
  //loop through visible reviews
  for (let review of visibleReviews){
    const reviewCard = document.createElement('div');
    reviewCard.className = "bg-inherit border-2 border-solid border-gray-600 rounded-lg p-4 min-h-52";
    reviewCard.innerHTML = `
      <h3 class="text-white text-2xl font-bold">${review.author}</h3>
      <blockquote class="text-xl italic"><q>${review.comment}</q></blockquote>
    `;
    reviewsContainer.appendChild(reviewCard);
  }
}
renderReviews();