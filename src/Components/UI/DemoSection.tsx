import { useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'

type ProjectMediaProps = {
  title: string
  category: string
  image?: string
  videoEmbed?: string
}

function getYouTubeId(url?: string) {
  if (!url) return undefined

  try {
    const videoUrl = new URL(url)
    return videoUrl.hostname === 'youtu.be'
      ? videoUrl.pathname.slice(1)
      : videoUrl.searchParams.get('v') ?? videoUrl.pathname.split('/').filter(Boolean).pop()
  } catch {
    return undefined
  }
}

function getYouTubeEmbedUrl(videoId?: string) {
  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`
    : undefined
}

export default function DemoSection({ project }: { project: ProjectMediaProps }) {
  const videoId = getYouTubeId(project.videoEmbed)
  const videoUrl = getYouTubeEmbedUrl(videoId)
  const [playing, setPlaying] = useState(false)
  const [posterIndex, setPosterIndex] = useState(0)

  // Largest YouTube still first, then the smaller still, then any local capture.
  const posterCandidates = (videoId
    ? [
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        project.image,
      ]
    : [project.image]
  ).filter((candidate): candidate is string => Boolean(candidate))
  const posterUrl = posterCandidates[posterIndex]

  return (
    <figure className="project-media">
      <div className="project-frame crop">
        <div className="project-screen">
          {videoUrl && playing ? (
            <iframe
              className="project-video"
              src={videoUrl}
              title={`${project.title} product demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : posterUrl ? (
            <>
              <img
                className="project-poster"
                src={posterUrl}
                alt=""
                onError={() => setPosterIndex((index) => index + 1)}
              />
              <button
                className="project-play"
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play the ${project.title} product demo`}
              >
                <Play size={14} aria-hidden="true" />
                Play demo
              </button>
            </>
          ) : (
            <div className="project-fallback">
              <p>{project.title}</p>
              <p>{project.category}</p>
              <span>No capture available.</span>
            </div>
          )}
        </div>
      </div>

      <figcaption>
        <span>{project.title} product demo</span>
        <span className="figure-meta">
          {videoUrl ? (
            <>
              <a href={project.videoEmbed} target="_blank" rel="noreferrer">
                YouTube <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <span>16 : 9</span>
            </>
          ) : (
            <span>{project.category}</span>
          )}
        </span>
      </figcaption>
    </figure>
  )
}
