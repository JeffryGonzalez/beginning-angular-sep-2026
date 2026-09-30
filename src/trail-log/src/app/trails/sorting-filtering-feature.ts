import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStoreFeature, withHooks, withMethods, withState } from '@ngrx/signals';

const sortByOptions = ['name', 'mileage'] as const;
const sortOrderOptions = ['asc', 'desc'] as const;
const filterOptions = ['all', 'favorites', 'non-favorites'] as const;

type SortingAndFilteringState = {
  sortBy: (typeof sortByOptions)[number];
  sortOrder: (typeof sortOrderOptions)[number];
  filter: (typeof filterOptions)[number];
};

type SortByOption = SortingAndFilteringState['sortBy'];
type SortOrderOption = SortingAndFilteringState['sortOrder'];
type FilterOption = SortingAndFilteringState['filter'];

export function withSortingAndFiltering() {
  return signalStoreFeature(
    withState<SortingAndFilteringState>({
      sortBy: 'name',
      sortOrder: 'asc',
      filter: 'all',
    }),
    withMethods(() => {
      // "injection context"
      const router = inject(Router);
      return {
        setSortBy: (sortBy: SortByOption) => {
          router.navigate([], { queryParams: { sortBy: sortBy }, queryParamsHandling: 'merge' });
        },
        setSortOrder: (sortOrder: SortOrderOption) => {
          router.navigate([], {
            queryParams: { sortOrder: sortOrder },
            queryParamsHandling: 'merge',
          });
        },
        setFilter: (filter: FilterOption) => {
          router.navigate([], { queryParams: { filter: filter }, queryParamsHandling: 'merge' });
        },
      };
    }),
    withHooks({
      onInit(store) {
        const router = inject(Router);
        // a stream of observable things over time.
        router.events.subscribe(() => {
          // if (e instanceof NavigationEnd) {
          //   console.log({ url: e.url, ar: e.urlAfterRedirects });
          // }
          const currentNavigation = router.currentNavigation();
          const queryParams = currentNavigation?.extras.queryParams || {};
          console.log(queryParams);

          if (queryParams['sortBy']) {
            if (sortOrderOptions.includes(queryParams['sortBy'])) {
              patchState(store, { sortBy: queryParams['sortBy'] });
            }
          }
          if (queryParams['sortOrder']) {
            if (sortOrderOptions.includes(queryParams['sortOrder'])) {
              patchState(store, { sortOrder: queryParams['sortOrder'] });
            }
          }
          if (queryParams['filter']) {
            if (filterOptions.includes(queryParams['filter'])) {
              patchState(store, { filter: queryParams['filter'] });
            }
          }
        });
      },
    }),
  );
}
