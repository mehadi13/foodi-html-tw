const searchFood = () => {
    let inputText = document.getElementById('searchInput').value;
    console.log(inputText);

    // Define the API URL
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+inputText;

    // Make a GET request
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            showMeals(response.json());
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const showMeals = ({meals}) => {
    let mealContainer = document.getElementById("mealContainer");
    mealContainer.innerHTML = '';

    meals.forEach(meal => {
        mealContainer.appendChild(showMeal(meal));
    });
}

const showMeal = (meal) => {

    const {strMealThumb, strMeal, strInstructions} = meal;

    let mealCard = document.createElement("div");
    mealCard.classList = 'card card-side bg-base-100 shadow-xl';
    mealContainer.innerHTML = `
    <figure>
      <img
        src="${strMealThumb}"
        alt="Movie" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${strMeal}</h2>
      <p>${strInstructions}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Watch</button>
      </div>
    </div>
    `;
}