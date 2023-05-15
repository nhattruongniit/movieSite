import { useMediaQueries } from '@/hooks/useMediaQueries';
import React, { useRef } from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import MediaActions from '../MediaActions';
import Trailers from '../Trailers';
import MovieMediaDetail from './MovieMediaDetail';
import { useGetItemExtraQuery } from '../../hooks/useGetItemExtraQuery';
import ReactPlayerComponent from '../player/ReactPlayerComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import Wrapper from '@/components/handling/Wrapper';
import { poster } from '@/config/images';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BsPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { MovieType } from '@/types/types';
import { AiOutlineSearch } from 'react-icons/ai';

const MovieMedia = () => {
  const { isMd } = useMediaQueries();
  const { data } = useGetItemDetailQuery();
  const { data: extraData } = useGetItemExtraQuery();
  const reactPlayerRef = useRef<HTMLInputElement>(null);
  const [isMediaWindowDisplay, setIsMediaWindowDisplay] = React.useState(false);

  const [animationParentRef] = useAutoAnimate();
  const [animationParentRef2] = useAutoAnimate();

  const [serverSource, setServerSource] = React.useState('2embed.to');

  const [selectedTrailer, setSelectedTrailer] = React.useState<null | {
    name?: string | undefined;
    key?: string | undefined;
  }>(null);

  return isMd ? (
    <div className='w-11/12 min-h-screen flex flex-col justify-start items-center z-0 rounded-b-xl shadow-xl font-poppins'>
      <div className='relative z-10 aspect-[22/12] w-full grid grid-cols-3 grid-rows-2 overflow-hidden'>
        <div className='ml-6 mt-4 absolute top-0 left-0'>
          <div className='flex items-center bg-opacity-70 bg-stone-600 px-4 py-2'>
            <svg
              aria-hidden='true'
              className='w-8 h-8 text-amber-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Rating star</title>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <p className='ml-2 text-[1.6rem] text-lime-300 font-bold tracking-[0.3rem]'>
              {(data.vote_average ?? 0).toFixed(1)}
            </p>
          </div>
        </div>
        <div className=' bg-gradient-to-t from-stone-900 to-transparent row-start-2 col-start-1 col-end-4 p-6 lg:p-6 flex flex-col justify-start'>
          <h2 className='py-2 px-4  w-[40rem] bg-gradient-to-r from-transparent via-stone-900 to-transparent bg-opacity-100 border-y-2 border-stone-500'>
            <div className='h-3 text-3xl text-left text-stone-300'>“</div>
            <p className='px-4 text-lg tracking-[0.1rem] italic text-center truncate text-stone-300'>
              {data.tagline !== '' ? data.tagline : 'Have you watched Morbius?'}
            </p>
            <div className='h-3 text-3xl text-right text-stone-300'>”</div>
          </h2>
          <div className='w-2/3 truncate font-black capitalize text-[3.5rem] text-stone-200 tracking-[0.2rem] py-4'>
            {(data as MovieType).title}
          </div>
          <div className='w-2/3 text-stone-200 py-4 flex gap-4 items-center'>
            <MediaActions actionType='others' />
            <MediaActions
              actionType='play'
              refs={{ playRef: reactPlayerRef }}
              handlingFunctions={{ playFunction: setIsMediaWindowDisplay }}
            >
              Watch now
            </MediaActions>
          </div>
        </div>
        <div
          ref={animationParentRef}
          className='pt-4 px-4 pb-6 bg-gradient-to-l from-stone-900 to-transparent row-start-1 row-end-3 col-start-3 z-20 text-stone-200 flex flex-col justify-start items-end'
        >
          <Trailers setSelectedTrailer={setSelectedTrailer} />
        </div>
      </div>
      <div className='relative min-h-[15vh] w-full pr-6 grid grid-cols-4 gap-4 overflow-hidden bg-stone-200  rounded-xl shadow-xl bg-opacity-90'>
        <div className='col-start-1 col-span-1 bg-stone-900'>
          <LazyLoadImageComponent
            path={data?.poster_path ?? poster}
            styles={{
              image: '-z-10 h-full w-full object-cover    overflow-hidden aspect-[12/16]',
              size: data?.poster_path ? 'original' : undefined,
            }}
          />
        </div>
        <div className='col-start-2 col-span-3 p-2'>
          {selectedTrailer ? (
            <>
              <ReactPlayerComponent className='h-[30rem]' trailerSource={selectedTrailer} />
              <ButtonComponent
                onClick={() => setSelectedTrailer(null)}
                className='absolute right-0 top-1/2 bg-stone-900 text-stone-200 text-lg px-8 py-4 hover:bg-stone-400 z-10'
              >
                Close
              </ButtonComponent>
            </>
          ) : (
            <MovieMediaDetail />
          )}
        </div>
      </div>
      <div
        className='relative  w-full z-0 grid place-items-center py-8 gap-4 bg-gradient-to-r from-stone-900 to-stone-900 via-stone-700 bg-opacity-50'
        ref={animationParentRef2}
      >
        {!isMediaWindowDisplay ? (
          <div className='w-3/4 flex flex-col justify-center items-center border-y-2 border-stone-500 mt-16 py-8'>
            <MediaActions
              actionType='play'
              handlingFunctions={{
                playFunction: setIsMediaWindowDisplay,
              }}
            />
          </div>
        ) : null}
        {isMediaWindowDisplay ? (
          <div
            className={` w-full p-2 bg-stone-200 bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-opacity-50 rounded-xl shadow-xl pb-6`}
          >
            <div className='w-full py-4 border-b-4 border-stone-300 md:border-0 grid place-items-center mb- flex-grow'>
              <div className='w-11/12 text-center rounded-xl shadow-inner px-4 py-2 bg-stone-300 font-poppins font-bold  text-lg text-stone-400 bg-opacity-20 tracking-wide'>
                If you get any error message when trying to stream, please refresh the page or
                switch to another streaming server.
              </div>
            </div>
            <div className='relative h-0 pb-[56.25%]'>
              <ReactPlayerComponent
                serverSource={serverSource}
                className='absolute top-0 left-0 w-full h-full'
              />
            </div>
          </div>
        ) : null}
      </div>

      <div ref={reactPlayerRef}
        className='w-full grid place-items-center
      bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-opacity-50 font-poppins py-16'
      >
        <div className='w-3/4 flex flex-col justify-center items-center gap-x-custom-x-max-medium bg-stone-400 rounded shadow-inner py-4 px-8 bg-opacity-20'>
          <p className='text-left  font-bold  py-4 text-stone-300 text-lg tracking-wider'>
            If current server doesn't work please try other servers below.
          </p>
          <div className='flex xs:flex-row flex-col  justify-between text-stone-700 font-bold text-lg gap-4'>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200'
              onClick={() => setServerSource('2embed.to')}
            >
              <BsPlayFill className='text-3xl' />
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-600'>Server</span>
                2embed.to
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase px-4 py-2 bg-stone-300 rounded-lg flex items-center gap-2 hover:bg-stone-200'
              onClick={() => setServerSource('2embed.org')}
            >
              <BsPlayFill className='text-3xl' />
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-600'>Server</span>
                2embed.org
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200'
              onClick={() => setServerSource('vidsrc.me')}
            >
              <BsPlayFill className='text-3xl' />
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-600'>Server</span>
                vidsrc.me
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>

      <div
        className='relative w-full py-4 px-4 
         bg-stone-300 rounded-b-xl shadow-xl bg-opacity-20'
      >
        <h1 className='py-2 px-4 text-left font-poppins text-stone-500 font-bold  uppercase border-b-4 border-stone-400 bg-stone-200 rounded-t-lg text-2xl bg-opacity-90'>
          You may also like
        </h1>
        {extraData.similar?.results?.length ?? 0 > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-900 bg-opacity-30 rounded-b-xl shadow-xl py-8 '>
            {extraData.similar?.results?.map((media, index) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkMovieCard'
                  styles={{
                    link: 'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-xl rounded-xl bg-stone-200',
                    detail: 'mt-auto min-h-[4rem] flex flex-col w-11/12',
                    size: (media as any).poster_path ? 'w200' : undefined,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className='relative w-full flex flex-row  h-[4rem] justify-center items-baseline gap-4 bg-stone-300 bg-opacity-20 shadow-inner border-2 border-stone-400 font-poppins text-normal font-bold px-8 py-8'>
            <h1 className='text-stone-400 text-sm'>No movies or TV shows for this media</h1>
            <Link
              className='text-stone-600 hover:text-stone-800 hover:underline flex items-start justify-center relative'
              to='/discover'
              onClick={() => {
                console.log('navigating to exploring page..');
              }}
            >
              <span> Find something else to watch</span>
              <div className='rounded-full w-[1.5rem] grid place-items-center h-[1.5rem] bg-stone-400 absolute bottom-0 right-16'>
                <AiOutlineSearch className='text-lg text-stone-700' />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className='w-11/12 min-h-screen flex flex-col justify-start items-center rounded-b-xl shadow-xl font-poppins z-0'>
      <div className='relative min-h-[30rem] w-full z-10 flex flex-col justify-center items-center pt-4 pb-8 gap-4 bg-gradient-to-t from-stone-300 to-stone-900 via-stone-500'>
        <div className='-z-10 grid place-items-center w-full bg-stone-900 rounded-t-xl overflow-hidden'>
          <LazyLoadImageComponent
            path={data?.poster_path ?? poster}
            styles={{
              image: '-z-10 w-full object-cover',
              size: data?.poster_path ? 'original' : undefined,
            }}
          />
        </div>
        <div
          className='sm:w-4/5 w-[90%] bg-stone-100 -mt-[4rem]  py-4 px-8
         rounded-xl shadow-xl flex flex-col items-center'
        >
          <div className='grid place-items-center w-full py-4'>
            <MediaActions
              actionType='play'
              refs={{ playRef: reactPlayerRef }}
              handlingFunctions={{ playFunction: setIsMediaWindowDisplay }}
              styles={{ play: 'px-16 py-4' }}
            />
          </div>
          <div className='grid place-items-center w-full'>
            <MediaActions actionType='others' styles={{ others: 'w-full flex-col' }} />
          </div>
        </div>
        <div
          className='sm:w-4/5 w-[90%] py-4 
        px-custom-x-max-medium bg-stone-200 rounded-xl shadow-xl'
        >
          <MovieMediaDetail />
        </div>
        <div
          ref={animationParentRef}
          className='sm:w-4/5 w-[90%] relative py-4
    px-custom-x-max-medium flex flex-col h-full bg-stone-200 rounded-xl shadow-xl items-center justify-start font-poppins'
        >
          <Trailers />
        </div>
      </div>
      <div
        className='relative w-full z-0 flex flex-col justify-center items-center py-4 gap-4 bg-stone-300'
        ref={animationParentRef2}
      >
        {!isMediaWindowDisplay ? (
          <div className='w-full flex flex-col justify-center items-center border-y-8 border-stone-400 py-2'>
            <MediaActions
              actionType='play'
              handlingFunctions={{
                playFunction: setIsMediaWindowDisplay,
              }}
            />
          </div>
        ) : null}
        {isMediaWindowDisplay ? (
          <div className={`w-11/12 p-2 bg-stone-200 rounded-xl shadow-xl pb-6`}>
            <div className='w-full py-4 border-b-4 border-stone-300 grid place-items-center mb-4'>
              <div className='w-5/6 text-center rounded-xl shadow-inner px-4 py-2 bg-stone-300 font-poppins text-sm font-bold text-stone-500'>
                If you get any error message when trying to stream, please refresh the page or
                switch to another streaming server.
              </div>
            </div>
            <div className='relative h-0 pb-[56.25%]'>
              <ReactPlayerComponent
                serverSource={serverSource}
                className='absolute top-0 left-0 w-full h-full'
              />
            </div>
          </div>
        ) : null}
      </div>
      <div
        ref={reactPlayerRef}
        className='w-full md:w-3/4 xl:w-1/2 bg-stone-300 grid place-items-center font-poppins py-4 '
      >
        <div className='w-11/12 flex flex-col justify-center items-center gap-x-custom-x-max-medium bg-stone-400 rounded shadow-inner py-4 px-8'>
          <p className='text-left text-sm font-bold text-stone-700 py-4 '>
            If current server doesn't work please try other servers below.
          </p>
          <div className='flex xs:flex-row flex-col gap-2 justify-between text-stone-500 font-bold'>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200'
              onClick={() => setServerSource('2embed.to')}
            >
              <BsPlayFill className='text-3xl' />
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-400'>Server</span>
                2embed.to
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase px-4 py-2 bg-stone-300 rounded-lg flex items-center gap-2 hover:bg-stone-200'
              onClick={() => setServerSource('2embed.org')}
            >
              <BsPlayFill className='text-3xl' />
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-400'>Server</span>
                2embed.org
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200'
              onClick={() => setServerSource('vidsrc.me')}
            >
              <BsPlayFill className='text-3xl' />
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-400'>Server</span>
                vidsrc.me
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>
      <div
        className='relative w-full py-4 
        px-custom-x-max-medium bg-stone-300 rounded-b-xl shadow-xl'
      >
        <h1 className='py-2 px-4 text-left font-poppins text-stone-500 font-bold text-xl uppercase border-b-4 border-stone-400 bg-stone-200 rounded-t-lg'>
          You may also like
        </h1>
        {extraData.similar?.results?.length ?? 0 > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-300 rounded-b-xl shadow-xl py-8'>
            {extraData.similar?.results?.map((media, index) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkMovieCard'
                  styles={{
                    link: 'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-lg rounded-xl',
                    detail: 'mt-auto min-h-[4rem] flex flex-col w-11/12',
                    size: (media as any).poster_path ? 'w200' : undefined,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className='relative w-full flex md:flex-row flex-col h-[5rem] justify-center items-baseline gap-4 bg-stone-300 shadow-inner border-2 border-stone-400 font-poppins text-normal font-bold px-8 py-8'>
            <h1 className='text-stone-400 text-sm'>No movies or TV shows for this media</h1>
            <Link
              className='text-stone-600 hover:text-stone-800 hover:underline flex items-start justify-center relative'
              to='/discover'
              onClick={() => {
                console.log('navigating to exploring page..');
              }}
            >
              <span> Find something else to watch</span>
              <div className='rounded-full w-[1.5rem] grid place-items-center h-[1.5rem] bg-stone-400 absolute bottom-0 -right-8 md:right-16'>
                <AiOutlineSearch className='text-lg text-stone-700' />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default () => (
  <Wrapper>
    <MovieMedia />
  </Wrapper>
);
