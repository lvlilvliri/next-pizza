import { Ingredient } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

type IngredientItem = Pick<Ingredient, "name" | "id">;
interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
}

/**
 * This hook is used to get all ingredients(from database) and loading state
 * @returns 
 */
export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<
    ReturnProps["ingredients"]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
