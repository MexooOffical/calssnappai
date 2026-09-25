const mealForm = document.getElementById('mealForm');
const foodList = document.getElementById('foodList');
const dailyCaloriesEl = document.getElementById('dailyCalories');
const proteinValueEl = document.getElementById('proteinValue');
const carbValueEl = document.getElementById('carbValue');
const fatValueEl = document.getElementById('fatValue');

const meals = [
  { name: 'Greek yogurt bowl', calories: 310, protein: 20, carbs: 24, fat: 12 },
  { name: 'Avocado toast', calories: 380, protein: 15, carbs: 30, fat: 18 },
  { name: 'Salmon rice bowl', calories: 540, protein: 35, carbs: 42, fat: 20 }
];

function renderMeals() {
  foodList.innerHTML = '';

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  meals.forEach((meal) => {
    totalCalories += meal.calories;
    totalProtein += meal.protein;
    totalCarbs += meal.carbs;
    totalFat += meal.fat;

    const item = document.createElement('li');
    item.className = 'food-item';
    item.innerHTML = `
      <div>
        <strong>${meal.name}</strong>
        <small>${meal.calories} kcal · ${meal.protein}g protein</small>
      </div>
      <span>${meal.carbs}g carbs / ${meal.fat}g fat</span>
    `;
    foodList.appendChild(item);
  });

  dailyCaloriesEl.textContent = totalCalories;
  proteinValueEl.textContent = `${totalProtein}g`;
  carbValueEl.textContent = `${totalCarbs}g`;
  fatValueEl.textContent = `${totalFat}g`;
}

mealForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(mealForm);
  const meal = {
    name: (formData.get('mealName') || '').toString().trim() || 'Custom meal',
    calories: Number(formData.get('calories')) || 0,
    protein: Number(formData.get('protein')) || 0,
    carbs: Number(formData.get('carbs')) || 0,
    fat: Number(formData.get('fat')) || 0
  };

  if (meal.calories === 0 && meal.protein === 0 && meal.carbs === 0 && meal.fat === 0) {
    return;
  }

  meals.push(meal);
  renderMeals();
  mealForm.reset();
});

renderMeals();
