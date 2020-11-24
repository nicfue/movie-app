import { FilterOption } from 'src/app/movies-list/model/filter-option';
import { Filter } from './filter';

export const FilterOptions: FilterOption[] = [
    { value: Filter.POPULAR_DESC },
    { value: Filter.POPULAR_ASC },
    { value: Filter.VOTE_DESC },
    { value: Filter.VOTE_ASC },
    { value: Filter.RELEASE_DATE_DESC },
    { value: Filter.RELEASE_DATE_ASC },
    { value: Filter.TITLE_DESC },
    { value: Filter.TITLE_ASC }
];