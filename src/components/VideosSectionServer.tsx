import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import VideosSection from './VideosSection';

interface Video {
  _id: string;
  title: string;
  category: string;
  thumbnail: any;
  videoFile?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  videoUrl?: string;
  order?: number;
}

async function getVideos(): Promise<Video[]> {
  const query = `*[_type == "video"] | order(order asc) {
    _id,
    title,
    category,
    thumbnail,
    "videoFile": videoFile{
      asset->{
        _ref,
        url
      }
    },
    videoUrl,
    order
  }`;

  return client.fetch(query);
}

export default async function VideosSectionServer() {
  const videos = await getVideos();

  console.log('Videos from Sanity:', videos);

  const formattedVideos = videos.map((v) => ({
    _id: v._id,
    title: v.title,
    category: v.category,
    thumbnailUrl: v.thumbnail ? urlFor(v.thumbnail).width(1280).height(720).url() : '',
    videoUrl: v.videoFile?.asset?.url || v.videoUrl || '',
    isDirectVideo: !!v.videoFile?.asset?.url,
  }));

  return <VideosSection videos={formattedVideos} />;
}
