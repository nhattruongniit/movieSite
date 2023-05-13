import ButtonComponent from '@/components/generic/ButtonComponent';
import { MovieType, TVType } from '@/types/types';
import React from 'react';
import { useSectionBackdropItemsStore } from '../../stores';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import ButtonMediaCard from '@/components/specific/ButtonMediaCard';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import { FilteredMovieListType, FilteredTVListType } from '../../types';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import { BsPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface SwiperContainerProps {
  sectionName?: 'trending' | 'comingSoon' | 'airing' | 'popular' | 'top_rated' | 'history';
  data: FilteredMovieListType | FilteredTVListType | Record<string, any>;
  mediaType: any;
  sliderName: string;
  styles?: Record<string, string>;
}
const SwiperContainer: React.FC<SwiperContainerProps> = (props) => {
  const { data, mediaType, sectionName, sliderName, styles } = props;

  const [slideIndex, setSlideIndex] = React.useState(0);
  const sectionBackdropItems = useSectionBackdropItemsStore();

  const sectionBackdropItem = sectionName
    ? sectionBackdropItems.getSectionBackdropItem(sectionName)
    : null;

  const handleClick = () => {
    const slider = document.querySelector(`.${sliderName}`) as HTMLElement;
    const sliderIndex = Number(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const itemNum = Number(getComputedStyle(slider).getPropertyValue('--items-per-screen'));
    return { slider, sliderIndex, itemNum };
  };

  const { isXs, is4k, isXl } = useMediaQueries();
  return isXs ? (
    <div
      className={`z-20 w-full xs:h-[20rem] lg:h-[24rem]  ${
        styles?.swiper ?? 'absolute bottom-0 left-0 right-0'
      }`}
    >
      <div className='absolute bottom-0 left-0 right-0 w-full h-full'>
        <ButtonComponent
          className='w-20 h-full bottom-0 left-0 cursor-pointer z-30 opacity-50 bg-gray-300 absolute text-[5rem] rounded-lg bg-gradient-to-l from-stone-100 to-stone-200 flex justify-center items-center hover:opacity-70'
          onClick={() => {
            const { slider, sliderIndex } = handleClick();
            if (sliderIndex > 0) {
              slider?.style.setProperty('--slider-index', (sliderIndex - 1).toString());
            }
          }}
        >
          <MdOutlineNavigateBefore />
        </ButtonComponent>
        <div
          className={`w-full gap-x-custom-x-max-normal absolute bottom-0 flex slider ml-20 -translate-x-[(calc(var(--slider-index)*(100%/var(--items-per-screen)*(var(--items-per-screen)-1))))] h-full transition-transform duration-500 ${sliderName}`}
        >
          {data?.results?.map((media: MovieType | TVType, index: number) => {
            return (
              <React.Fragment key={index}>
                {sectionName === 'popular' || sectionName === 'top_rated' || sectionName==='history' ? (
                  <LinkMediaCard
                    role={
                      mediaType === 'multiple'
                        ? 'linkMultipleCard'
                        : mediaType === 'movie'
                        ? 'linkMovieCard'
                        : 'linkTVCard'
                    }
                    media={media}
                    styles={{
                      link: `max-w-[calc(100%/var(--items-per-screen))] flex justify-center items-center flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] 
                      transition-all
                      ease-in-out
                      duration-500 h-full shadow-xl  overflow-hidden bg-gradient-to-t from-stone-300 to-stone-200`,
                      image: 'overflow-hidden rounded-xl',
                      size: is4k ? 'original' : isXl ? 'w500' : 'w400',
                      detail: 'flex w-11/12 flex-col justify-end',
                    }}
                  />
                ) : (
                  <ButtonMediaCard
                    role={mediaType === 'movie' ? 'buttonMovieCard' : 'buttonTVCard'}
                    handleButtonClick={() => {
                      sectionName &&
                        sectionBackdropItems.setSectionBackdropItem(sectionName, media);
                    }}
                    media={media}
                    styles={{
                      button: `max-w-[calc(100%/var(--items-per-screen))] flex flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] transition-all
                      ease-in-out
                      duration-500
                      h-full rounded-xl overflow-hidden bg-gradient-to-tr from-stone-700 to-stone-500 
                      flex flex-col items-center
                      shadow-[1rem]  
                      ${
                        sectionName
                          ? sectionBackdropItems.getSectionBackdropItem(sectionName)?.id ===
                            media.id
                            ? '-mt-[4rem] 4k:-mt-[6rem] mx-2'
                            : ''
                          : ''
                      }
                      `,
                      image: 'overflow-hidden',
                      size: is4k ? 'original' : isXl ? 'w500' : 'w400',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <ButtonComponent
          className='w-20 z-30 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer opacity-50 text-[5rem] rounded-lg bg-gradient-to-l from-stone-100 to-stone-200 hover:opacity-70 '
          onClick={() => {
            const { slider, sliderIndex, itemNum } = handleClick();
            if (sliderIndex < (data?.results?.length ?? 0) / itemNum) {
              slider?.style.setProperty('--slider-index', (sliderIndex + 1).toString());
            }
          }}
        >
          <MdOutlineNavigateNext />
        </ButtonComponent>
      </div>
    </div>
  ) : (
    <div className={`relative z-20 w-full h-[24rem] overflow-hidden ${styles?.swiper}`}>
      {sectionName === 'trending' || sectionName === 'comingSoon' || sectionName === 'airing' ? (
        <Link
          to={`/${mediaType}/${sectionBackdropItem?.id}`}
          className='w-full grid place-items-end text-xl absolute top-0 z-30 '
        >
          <div className='rounded-xl flex items-center mr-20 justify-center px-4 py-2 bg-stone-700 font-poppins text-stone-50 text-sm gap-2 border-b-2 border-stone-700 shadow-lg ring-2 ring-stone-200'>
            <BsPlayFill className='text-xl font-bold' /> Watch
          </div>
        </Link>
      ) : null}

      <ButtonComponent
        className='w-16 absolute h-full z-30 cursor-pointer opacity-50 hover:opacity-70 text-[5rem] rounded-lg bg-gradient-to-l from-stone-100 to-stone-200 flex justify-center items-center'
        onClick={() => {
          if (slideIndex > 0) {
            setSlideIndex((prev) => prev - 1);
          }
        }}
      >
        <MdOutlineNavigateBefore />
      </ButtonComponent>
      <div
        className={`w-full h-full absolute inset-0 flex slider transition-transform duration-500 gap-2 ${sliderName}`}
      >
        {data?.results ? (
          <LinkMediaCard
            role={
              mediaType === 'multiple'
                ? 'linkMultipleCard'
                : mediaType === 'movie'
                ? 'linkMovieCard'
                : 'linkTVCard'
            }
            media={data?.results[slideIndex]}
            styles={{
              link: `w-full flex justify-center items-center flex-col`,
              image: 'overflow-hidden rounded-xl shadow-xl',
              height: '320px',
              width: '320px',
              detail:
                'relative flex -mt-4 z-20 flex-col bg-stone-100 w-[300px] rounded-xl shadow-xl px-8 py-2',
              size: 'original',
            }}
          />
        ) : null}
      </div>
      <ButtonComponent
        className='w-16 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer z-30 opacity-50 hover:opacity-70 rounded-lg bg-gradient-to-r from-stone-100 to-stone-200 text-[5rem]'
        disabled={data?.results?.length === 1}
        onClick={() => {
          const { itemNum } = handleClick();
          if (slideIndex < (data?.results?.length ?? 0) / itemNum) {
            setSlideIndex((prev) => prev + 1);
          }
        }}
      >
        <MdOutlineNavigateNext />
      </ButtonComponent>
    </div>
  );
};

export default SwiperContainer;
