const reviews = [
  {
    author: "Jonathan",
    rating: 5,
    comment: `What a gem! I stumbled upon Artisan Blend while exploring Nairobi, and it became my daily stop. Excellent 
            service, a warm vibe, and honestly, better coffee than some places back home`,
    category: "food"
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
    category: "food"
  },
  {
    author: "Annicole",
    rating: 5,
    comment: `The avocado toast was fresh and flavorful-simple, but done perfectly!`,
    category: "food"
  },
  {
    author: "Rock",
    rating: 4,
    comment: `Warm lighting, soft jazz, and wooden decor, it feels like a cozy escape in the city.`,
    category: "ambience"
  },
  {
    author: "Brenda",
    rating: 4,
    comment: `Quiet enough to work, but lively enough to enjoy — the vibe strikes a perfect balance`,
    category: "ambience"
  },
  {
    author: "Finlay",
    rating: 5,
    comment: `The indoor plants and earthy tones create a calm, nature-inspired atmosphere.`,
    category: "ambience"
  },
  {
    author: "Ruth",
    rating: 4,
    comment: `Spacious seating, good natural light, and a touch of Nairobi’s urban charm. Love it!`,
    category: "ambience"
  },
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
      <div class="flex items-center justify-start">
          <img src="./assets/icons/5star-rate.png" alt="5 start rating" class="h-12 w-auto">
      </div>
      <blockquote class="text-xl italic"><q>${review.comment}</q></blockquote>
    `;
    reviewsContainer.appendChild(reviewCard);
  };

  // hide load more button if all available filtered reviews are shown
  if(visibleCount >= filteredReviews.length){
    loadMoreBtn.style.display = "none";
  }
  else{
    loadMoreBtn.style.display = "block";
  }
}

//ADD 2 REVIEWS TO DISPLAY IF LOAD MORE BTN IS CLICKED
loadMoreBtn.addEventListener('click',()=>{
  visibleCount+=4;
  renderReviews();
});

//LOOP TRHOUGH CATEGORIE BUTTONS , GET IT'S DATASET VALUE AND IMPLEMENT IT'S BEHAVIOR WHEN CLICKED
for(let btn of categoryBtns){
  btn.addEventListener('click',(e)=>{
    e.preventDefault();
    selectedCategory = btn.dataset.category;
    visibleCount = 4;

    // for all category
    if (selectedCategory === 'all'){
      filteredReviews = [...reviews];
    }
    else{
      filteredReviews = reviews.filter((review)=>{
        return review.category === selectedCategory;
      });
    }
    renderReviews();
  });
}
renderReviews();