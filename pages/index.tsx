import Video from '@/components/components/Video';
import Filter from '@/components/components/Filter';
import Search from '@/components/components/Search';
import Layout from '@/components/Layout/Layout';
import { filterList, meta } from '@/constants/config';
import { title, visitTitle, youtubeLink } from '@/constants/data';
import { cheNomJson } from '@/constants/mock';

export default function Home() {
  const resultData = cheNomJson;

  return (
    <>
      <Layout meta={meta}>
        <div className='bg-primary-backgroud-blue text-primary-dark-blue'>
          <h1 className='font-bold py-5 text-2xl flex items-center justify-center w-1/'>
            <a target="_blank" href={youtubeLink} rel="noopener noreferrer" title={visitTitle}>
              {title}
            </a>
          </h1>
          <div className='w-full flex items-center justify-center'>
            <Search />
          </div>
          <div className='flex items-center justify-center py-5'>
            <Filter data={filterList}/>
          </div>
          <div className='grid grid-cols-12 gap-y-5 px-5'>
            <div className="col-span-12 md:col-span-2"></div>
            <div className="col-span-12 md:col-span-8 flex flex-wrap">
              {resultData.map((video) => (
                <Video
                  key={video.id.videoId}
                  videoTitle={video.snippet.title}
                  channelTitle={video.snippet.channelTitle}
                  imgUrl={video.snippet.thumbnails.medium.url}
                  altTitle={video.snippet.title}
                  videoUrl={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                />
              ))}
            </div>
            <div className="col-span-12 md:col-span-2"></div>
          </div>
        </div>
      </Layout>
    </>
  )
}

