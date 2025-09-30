import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { Carousel, CarouselContent, CarouselItem } from './carousel'
import { VideoModal } from './VideoModal'
import { VideoThumbnailCard } from './VideoThumbnailCard'

export function PortfolioGallery({
  title = "Browse my video library",
  archiveButton = {
    text: "View gallery",
    href: "/projects"
  },
  videos = [],
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onVideoClick,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [carouselApi, setCarouselApi] = useState(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) return

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateSelection()
    carouselApi.on('select', updateSelection)

    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  const handleVideoClick = (video, index) => {
    setSelectedVideo(video)
    onVideoClick?.(index)
  }

  const handleCloseModal = () => {
    setSelectedVideo(null)
  }

  const defaultVideos = [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Project Showcase 1",
    },
    {
      url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      title: "Project Showcase 2",
    },
    {
      url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      title: "Project Showcase 3",
    },
    {
      url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      title: "Project Showcase 4",
    },
    {
      url: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
      title: "Project Showcase 5",
    },
    {
      url: "https://www.youtube.com/watch?v=fRh_vgS2dFE",
      title: "Project Showcase 6",
    },
    {
      url: "https://www.youtube.com/watch?v=RgKAFK5djSk",
      title: "Project Showcase 7",
    },
    {
      url: "https://www.youtube.com/watch?v=CevxZvSJLk8",
      title: "Project Showcase 8",
    },
    {
      url: "https://www.youtube.com/watch?v=hT_nvWreIhg",
      title: "Project Showcase 9",
    },
    {
      url: "https://www.youtube.com/watch?v=nfWlot6h_JM",
      title: "Project Showcase 10",
    },
  ]

  const videoList = videos.length > 0 ? videos : defaultVideos

  return (
    <section
      className={`relative min-h-screen py-20 px-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="relative z-10 text-center pt-16 pb-8 px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            {title}
          </h2>

          <Link
            to={archiveButton.href}
            className="inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors group mb-20"
          >
            <span>{archiveButton.text}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
            {videoList.map((video, index) => {
              const totalVideos = videoList.length
              const middle = Math.floor(totalVideos / 2)
              const distanceFromMiddle = Math.abs(index - middle)
              const staggerOffset = maxHeight - distanceFromMiddle * 20
              const zIndex = totalVideos - index
              const isHovered = hoveredIndex === index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ zIndex }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => handleVideoClick(video, index)}
                >
                  <VideoThumbnailCard video={video} onClick={() => handleVideoClick(video, index)} />
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="block md:hidden relative pb-8">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="ml-0">
              {videoList.map((video, index) => (
                <CarouselItem key={index} className="pl-4 md:max-w-[452px]">
                  <VideoThumbnailCard video={video} onClick={() => handleVideoClick(video, index)} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
        videoUrl={selectedVideo?.url || ''}
        title={selectedVideo?.title || 'Video'}
      />
    </section>
  )
}
