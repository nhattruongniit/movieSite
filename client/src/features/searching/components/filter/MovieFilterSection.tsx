import React from 'react';
import SelectComponent from '../../../../components/generic/SelectComponent';

import { useMovieFiltersStore } from '../../stores';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { mediaTypeConfig } from '../../queries';

const MovieFilterSection = () => {
  const movieFiltersStore = useMovieFiltersStore();
  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center dark:bg-yellow-500'>
      <div className='w-full text-xl text-stone-400 font-normal px-4 py-2 mt-4 dark:text-stone-900  dark:border-b-2 dark:border-stone-500'>
        <span className='pl-2 border-l-4 border-stone-800 font-bold '>Status</span>
        <SelectComponent
          options={[
            { value: 'popularity.desc', label: 'Most popular' },
            { value: 'release_date.desc', label: 'Most recent' },
            { value: 'vote_average.desc', label: 'Best rated' },
            { value: 'vote_count.desc', label: 'Most votes' },
          ]}
          name={'sort_by'}
          className='bg-stone-50 rounded-md shadow-inner  dark:bg-yellow-400 dark:text-stone-900 text-amber-900 my-2'
          placeholder={'Most popular '}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => movieFiltersStore.addSortBy(val?.value)}
        />
      </div>
      <div className='w-full text-xl text-stone-400 font-normal px-4 py-2 pb-8 dark:text-stone-900  dark:border-b-2 dark:border-stone-500 mt-4'>
        <h1 className='pl-2 border-l-4 border-stone-800 font-bold'>
          Genres
        </h1>
        <div className='mt-4 w-full py-4 px-2 flex-wrap flex shadow-inner gap-4 rounded-xl ring-2 ring-stone-400 bg-stone-300 dark:bg-amber-400  dark:ring-stone-900'>
          {[...(mediaTypeConfig.movie.discover.paramList.with_genres ?? [])].map((genreObject) => (
            <ButtonComponent
              className={`rounded-xl ring-2 ring-stone-500 px-4 py-2 shadow-lg   text-stone-600 dark:text-stone-900 dark:ring-stone-900 ${
                movieFiltersStore.with_genres?.has(genreObject[0]!)
                  ? 'bg-amber-200 dark:bg-stone-900 dark:text-amber-300'
                  : 'bg-stone-200 dark:bg-amber-300'
              }`}
              onClick={() => movieFiltersStore.addGenres(genreObject[0]!)}
              key={genreObject[0]}
            >
              {genreObject[1]}
            </ButtonComponent>
          ))}
        </div>
      </div>
      <div className='w-full text-xl text-stone-400 font-normal px-4 py-2 dark:text-stone-900  dark:border-b-2 dark:border-stone-500 mt-4'>
        <h1 className='pl-2 border-l-4 border-stone-800 font-bold'>From year</h1>
        <SelectComponent
          options={[
            ...Array.from(
              { length: new Date().getFullYear() - 1950 },
              (x, i) => new Date().getFullYear() - i,
            ),
          ].map((year) => ({ value: year.toString(), label: year.toString() }))}
          name={'year'}
          className='bg-stone-50 rounded-md shadow-inner  dark:bg-yellow-400 dark:text-stone-900 text-amber-900 my-2'
          placeholder={`${new Date().getFullYear().toString()}`}
          extras={{ isSearchable: true, isClearable: false }}
          handleOnChange={(val: any) => movieFiltersStore.addReleasedYear(parseInt(val?.value))}
        />
      </div>
    </div>
  );
};

export default MovieFilterSection;
