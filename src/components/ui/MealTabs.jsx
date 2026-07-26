import React from "react";

const defaultMeals = ['Desayuno', 'Media Mañana', 'Comida', 'Merienda', 'Cena'];

export function MealTabs({ activeMeal, mealCounts, onSelectMeal, meals = defaultMeals }) {
  return (
    <section className="meal-tabs">
      {meals.map((meal) => {
        const cantidad = mealCounts?.[meal] || 0;
        return (
          <button
            key={meal}
            className={`meal-tab ${activeMeal === meal ? 'active' : ''}`}
            onClick={() => onSelectMeal(meal)}
            type="button"
          >
            {meal}
            {cantidad > 0 && <span className="meal-count">{cantidad}</span>}
          </button>
        );
      })}
    </section>
  );
}
