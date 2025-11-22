'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Video {
  _id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  isDirectVideo?: boolean;
}

interface VideosSectionProps {
  videos: Video[];
}

export default function VideosSection({ videos }: VideosSectionProps) {
  // Determina a aba inicial baseado nos vídeos disponíveis
  const hasLocalizacao = videos.some((v) => v.category === 'localizacao');
  const hasEstrutura = videos.some((v) => v.category === 'estrutura');
  const initialTab = hasLocalizacao ? 'localizacao' : hasEstrutura ? 'estrutura' : 'localizacao';

  const [activeTab, setActiveTab] = useState<'localizacao' | 'estrutura'>(initialTab);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const filteredVideos = videos.filter((v) => v.category === activeTab).slice(0, 3);
  const currentDisplayVideo = filteredVideos[currentIndex] || null;

  const handleTabChange = (tab: 'localizacao' | 'estrutura') => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredVideos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredVideos.length - 1 ? prev + 1 : 0));
  };

  const handlePlayClick = (video: Video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
  };

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="videos" className="pt-16 scroll-mt-[72px]">
      <div className="w-full max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            <span className="border-b-4 border-black pb-2">Vídeos</span>
          </h2>
        </div>

        {/* Video Player Area */}
        <div className="relative w-full aspect-video rounded-t-xl overflow-hidden group cursor-pointer">
          {/* Background/Thumbnail */}
          {currentDisplayVideo ? (
            currentDisplayVideo.thumbnailUrl ? (
              <Image
                src={currentDisplayVideo.thumbnailUrl}
                alt={currentDisplayVideo.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800" />
            )
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-500">Nenhum vídeo disponível para esta categoria.</p>
            </div>
          )}

          {/* Tabs Overlay */}
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-8 z-10">
            <button
              onClick={() => handleTabChange('localizacao')}
              className={`text-lg font-medium transition-all pb-1 ${
                currentDisplayVideo ? 'text-white' : 'text-gray-700'
              } ${
                activeTab === 'localizacao'
                  ? `opacity-100 border-b-2 ${currentDisplayVideo ? 'border-white' : 'border-gray-700'}`
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Localização
            </button>
            <button
              onClick={() => handleTabChange('estrutura')}
              className={`text-lg font-medium transition-all pb-1 ${
                currentDisplayVideo ? 'text-white' : 'text-gray-700'
              } ${
                activeTab === 'estrutura'
                  ? `opacity-100 border-b-2 ${currentDisplayVideo ? 'border-white' : 'border-gray-700'}`
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Estrutura
            </button>
          </div>

          {/* Navigation Arrows */}
          {filteredVideos.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white z-10 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white z-10 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Play Button */}
          {currentDisplayVideo && (
            <button
              onClick={() => handlePlayClick(currentDisplayVideo)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-purple-600 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && currentVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
            {currentVideo.isDirectVideo ? (
              <video
                src={currentVideo.videoUrl}
                className="w-full h-full rounded-lg"
                controls
                autoPlay
              />
            ) : (
              <iframe
                src={getEmbedUrl(currentVideo.videoUrl)}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
