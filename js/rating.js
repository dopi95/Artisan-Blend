const starContainer = document.querySelector('#star_rating');
let selectedRating = 0;
let totalStars = 5;

//DECLARE THE STARS
const emptyStar = "./assets/icons/icons8-rating-empty.png";
const fullStar = "./assets/icons/icons8-rating-full.png";

function renderStars(){
  starContainer.innerHTML = "";
  for(let i =1; i <=totalStars; i++){
    const starImg = document.createElement('img');
    starImg.src = i<=selectedRating?fullStar:emptyStar;
    starImg.dataset.value = i;
    starImg.classList.add('transition-all','duration-200','hover:scale(110)','h-8','w-8');

    //add star as a direct child of star container
    starContainer.appendChild(starImg);

    starImg.addEventListener('click',()=>{
      selectedRating = parseInt(starImg.dataset.value);
      renderStars();
    });
  }
}
renderStars();