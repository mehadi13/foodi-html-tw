const searchFood = () => {
  let inputText = document.getElementById('searchInput').value;
  fetchFoodItems(inputText);
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn.addEventListener('click', () => {
  console.log("Hamburger button clicked!");  // Debugging log
  if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('hidden');
    console.log("Menu opened");  // Debugging log
  } else {
    mobileMenu.classList.add('hidden');
    console.log("Menu closed");  // Debugging log
  }
});

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Prevent the default action (form submission, etc.)
    searchFood();               // Call the function to send the API request
  }
});




const fetchFoodItems = (name) => {
  // Define the API URL
  const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + name;

  // Make a GET request
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let mealContainerTitle = document.getElementById("mealContainerTitle");
      let mealHeaderContainer = document.getElementById("mealHeaderContainer");
      let divider = document.getElementById('divider');
      let bannerSection = document.getElementById('bannerSection');

      bannerSection.style.display = 'none';
      mealHeaderContainer.style.display = 'block';
      divider.style.display = 'block';

      if (data != null && data.meals != null && data.meals.length > 0) {
        mealContainerTitle.innerText = "Serch Result For '" + name + "'";
        showMeals(data);
      } else {
        mealContainerTitle.innerText = "Serch Result Not Found For '" + name + "'";
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const showMeals = ({ meals }) => {

  let mealContainer = document.getElementById("mealContainer");
  mealContainer.innerHTML = '';

  meals.forEach(meal => {
    mealContainer.appendChild(showMeal(meal));
  });
}

const showMeal = (meal) => {

  const { strMealThumb, strMeal, strInstructions } = meal;

  let mealCard = document.createElement("article");
  mealCard.classList = 'overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl';
  mealCard.innerHTML = `
    <img
      alt="Dist Image"
      src="${strMealThumb}"
      class="h-56 w-full object-cover"
    />
  
    <div class="p-4 sm:p-6">
      <a href="#">
        <h3 class="text-lg font-medium text-gray-900">
          ${strMeal}
        </h3>
      </a>
  
      <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        ${strInstructions}
      </p>
  
      <a href="#" class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
        Find out more
        <span aria-hidden="true" class="block transition-all group-hover:ms-0.5 rtl:rotate-180">
          &rarr;
        </span>
      </a>
    </div>
    `;
  return mealCard;
}

const hideMealContainer = () => {
  let mealHeaderContainer = document.getElementById("mealHeaderContainer");
  let mealContainer = document.getElementById("mealContainer");
  let divider = document.getElementById('divider');
  let bannerSection = document.getElementById('bannerSection');

  bannerSection.style.display = 'block';
  mealContainer.style.display = 'none';
  mealHeaderContainer.style.display = 'none';
  divider.style.display = 'none';
}