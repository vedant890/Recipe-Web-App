document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('#search-box');
    const button1 = document.querySelector('#but1');
    const recp_con = document.querySelector('.Recipe-container');
    const recipe_details_button = document.querySelector('.recipe_details_button');
    const recp_close_button = document.querySelector('.closed-button');

    // function to get recipe
    const Getrecipe = async (query) => {
        recp_con.innerHTML = "<h2>fetching recipes....</h2>"
        try{

            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            const result = await data.json();
            recp_con.innerHTML = "";

            result.meals.forEach(meal => {
                const recipeDiv = document.createElement('div')
                recipeDiv.classList.add('recipeClassdiv')
                recipeDiv.innerHTML = `
        <img src= "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <h3>${meal.strCategory}</h3>
        `
                const button = document.createElement('button');
                button.textContent = "view content";
                recp_con.appendChild(recipeDiv);
                recipeDiv.appendChild(button);

                button.addEventListener('click', () => {
                    open_recipe_details(meal);
                })
            })
        }
    catch (error){
        recp_con.innerHTML = "<h2>error in fetching recipes...</h2>"
    }}

        // function to fetch ingredients and mesurements
        const fetchIngredients = (meal) => {
            let ingredientList = "<ul>"; // Start an unordered list
            for (let i = 1; i <= 20; i++) {
                let ingredient = meal[`strIngredient${i}`];
                if (ingredient) {
                    const measure = meal[`strMeasure${i}`];
                    ingredientList += `<li>${measure} ${ingredient}</li>`;
                } else {
                    break;
                }
            }
            ingredientList += "</ul>"; // Close the unordered list
            return ingredientList;
        };


        // function to get recipe details
        const open_recipe_details = (meal) => {
            recipe_details_button.innerHTML = `
            <h3 class="meal_name">${meal.strMeal}</h3>
            <ul class ="ingrdients">${fetchIngredients(meal)}</ul>
            <div>
            <h3>Instructions:</h3>
            <p class="instructions"> ${meal.strInstructions}</p>
        </div>
        `;
            recipe_details_button.parentElement.style.display = "block";
        };

        // Function close button
        recp_close_button.addEventListener = (`click`, () => {
            recipe_details_button.parentElement.style.display = "none";
        })

        button1.addEventListener('click', (e) => {
            e.preventDefault();
            const searchrecipe = searchBox.value.trim();
            if (!searchrecipe) {
                recp_con.innerHTML = `"<h2>PLEASE ENTER YOUR DISH...</h2>"`
                return;
            }
            Getrecipe(searchrecipe);
        });
    });