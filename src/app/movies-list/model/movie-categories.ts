import { Category } from 'src/app/movies-list/model/category';
import { CategoryOption } from './category-option';
import { CategoryViewValue } from './category-view-value';

export const MovieCategories: CategoryOption[] = [
    { value: Category.POPULAR, viewValue: CategoryViewValue.POPULAR_VIEW_VALUE },
    { value: Category.UPCOMING, viewValue: CategoryViewValue.UPCOMING_VIEW_VALUE },
    { value: Category.NOW_PLAYING, viewValue: CategoryViewValue.NOW_PLAYING_VIEW_VALUE },
    { value: Category.TOP_RATED, viewValue: CategoryViewValue.TOP_RATED_VIEW_VALUE }
]