import { Play } from 'lucide-react'

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

function getYouTubeThumbnail(url) {
  const videoId = getYouTubeId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null
}

export function VideoThumbnailCard({ video, onClick }) {
  const thumbnailUrl = video.thumbnail || getYouTubeThumbnail(video.url) || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
  const youtubeId = getYouTubeId(video.url)

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex-shrink-0"
    >
      <div
        className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
        style={{
          boxShadow: `
            rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
            rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
            rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
            rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
          `,
        }}
      >
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="p-4 rounded-full bg-white/90 group-hover:bg-white transition-colors">
            <Play size={32} className="fill-black text-black ml-1" />
          </div>
        </div>

        {youtubeId && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            YouTube
          </div>
        )}

        {video.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-medium">{video.title}</p>
          </div>
        )}
      </div>
    </div>
  )
}
