const searchFood = () => {
    let inputText = document.getElementById('searchInput').value;
    fetchFoodItems(inputText);
}

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
            mealContainerTitle.innerText = "Serch Result For '" + name + "'";
            console.log(data);
            showMeals(data);
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