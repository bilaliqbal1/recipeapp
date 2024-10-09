import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchMeals, addMealToWeek } from "../store/features/MealSlice";
import MealCard from "./MealCard";
import Modal from "../components/SelectWeek";

// Define the Week type
type Week = "week1" | "week2" | "week3" | "week4";

const MealsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allMeals, status, error, weekMeals } = useAppSelector(
    (state) => state.meals
  );
  const [selectedMeal, setSelectedMeal] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState<"all" | Week>("all");

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const handleOpenModal = (meal: any) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const handleAddMeal = (week: Week) => {
    if (selectedMeal) {
      dispatch(addMealToWeek({ week, meal: selectedMeal }));
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  const handleTabChange = (tabName: "all" | Week) => {
    setTab(tabName);
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-around items-center p-4 rounded-lg">
        <button
          className={`text-lg font-bold ${
            tab === "all"
              ? "text-blue-700 border-b-4 border-blue-700"
              : "text-gray-600"
          }`}
          onClick={() => handleTabChange("all")}
        >
          All Meals
        </button>
        {["week1", "week2", "week3", "week4"].map((week, index) => (
          <button
            key={index}
            className={`text-lg font-bold ${
              tab === week
                ? "text-blue-700 border-b-4 border-blue-700"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange(week as Week)}
          >
            Week {index + 1}
          </button>
        ))}
      </div>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
        {tab === "all" ? (
          allMeals.length > 0 ? (
            allMeals.map((meal) => (
              <MealCard
                key={meal.id}
                name={meal.name}
                imageUrl={meal.image}
                instructions={meal.instructions}
                rating={meal.rating}
                onOpenModal={() => handleOpenModal(meal)}
              />
            ))
          ) : (
            <p>No meals available.</p>
          )
        ) : weekMeals[tab]?.length > 0 && status !== "loading" ? (
          weekMeals[tab].map((meal) => (
            <MealCard
              key={meal.id}
              name={meal.name}
              imageUrl={meal.image}
              instructions={meal.instructions}
              rating={meal.rating}
              onOpenModal={() => {}}
            />
          ))
        ) : (
          <p>No meals available for {tab.replace("week", "Week ")}.</p>
        )}
      </div>

      {/* Modal for selecting week */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddMeal}
      />
    </div>
  );
};

export default MealsList;
