import { useState } from 'react'

type ProjectMediaProps = {
  number: string
  title: string
  category: string
  image?: string
  videoEmbed?: string
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return undefined

  try {
    const videoUrl = new URL(url)
    const videoId = videoUrl.hostname === 'youtu.be'
      ? videoUrl.pathname.slice(1)
      : videoUrl.searchParams.get('v') ?? videoUrl.pathname.split('/').filter(Boolean).pop()

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`
      : undefined
  } catch {
    return undefined
  }
}

// This renders only the media inside a project banner; it has no standalone section background.
export default function DemoSection({ project }: { project: ProjectMediaProps }) {
  const videoUrl = getYouTubeEmbedUrl(project.videoEmbed)
  const [imageFailed, setImageFailed] = useState(false)
  const imageUrl = videoUrl || imageFailed ? undefined : project.image

  return <div className="laptop">
    <div className="laptop-camera" />
    <div className="laptop-screen">
      {videoUrl ? <iframe
        className="project-video"
        src={videoUrl}
        title={`${project.title} product demo`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      /> : imageUrl ? <img
        src={imageUrl}
        alt={`${project.title} preview`}
        loading="lazy"
        onError={() => setImageFailed(true)}
      /> : <div className="art-ui" aria-hidden="true"><span>{project.number}/</span><b>{project.category}</b><div className="art-lines"><i /><i /><i /></div><div className="art-shape" /></div>}
    </div>
    <div className="laptop-base" />
  </div>
}

