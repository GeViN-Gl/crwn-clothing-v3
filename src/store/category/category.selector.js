import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categotiesSlice) => {
    // console.log(`memoized selectCategories fired`);

    // console.log('categotiesSlice:', categotiesSlice);
    // console.log('categotiesSlice.categories:', categotiesSlice.categories);

    return categotiesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log(`memoized selectCategoriesMap fired`);
    return categories.reduce((acc, category) => {
      // console.log(`memoized selectCategoriesMap reduce fn fired`);
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
//TODO clean console.logs
