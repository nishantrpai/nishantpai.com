import { readdirSync } from 'fs'
import path from 'path'
import { useRef, useState } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export function getStaticProps() {
  const tracksDirectory = path.join(process.cwd(), 'public', 'tracks')
  const tracks = readdirSync(tracksDirectory)
    .filter((filename) => filename.toLowerCase().endsWith('.mp3'))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => ({
      filename,
      name: filename.replace(/\.mp3$/i, ''),
      src: `/tracks/${encodeURIComponent(filename)}`,
    }))

  return { props: { tracks } }
}

export default function Tracks({ tracks }) {
  const audioRef = useRef(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayingAll, setIsPlayingAll] = useState(false)

  const playTrack = (track) => {
    const audio = audioRef.current
    audio.pause()
    audio.src = track.src
    audio.currentTime = 0
    setCurrentTrack(track.filename)
    audio.play().catch((error) => {
      console.error(`Unable to play ${track.filename}:`, error)
      setIsPlaying(false)
      setIsPlayingAll(false)
    })
  }

  const toggleTrack = (track) => {
    const audio = audioRef.current
    setIsPlayingAll(false)

    if (currentTrack === track.filename && !audio.paused) {
      audio.pause()
      return
    }

    if (currentTrack === track.filename) {
      audio.play().catch((error) => {
        console.error(`Unable to play ${track.filename}:`, error)
        setIsPlaying(false)
      })
    } else {
      playTrack(track)
    }
  }

  const togglePlayAll = () => {
    const audio = audioRef.current

    if (isPlayingAll && isPlaying) {
      audio.pause()
      return
    }

    setIsPlayingAll(true)
    const track = tracks.find((item) => item.filename === currentTrack) || tracks[0]
    if (!track) return

    if (currentTrack === track.filename && audio.src) {
      audio.play().catch((error) => {
        console.error(`Unable to play ${track.filename}:`, error)
        setIsPlaying(false)
        setIsPlayingAll(false)
      })
    } else {
      playTrack(track)
    }
  }

  const handleTrackEnded = () => {
    if (!isPlayingAll) {
      setIsPlaying(false)
      return
    }

    const currentIndex = tracks.findIndex((track) => track.filename === currentTrack)
    const nextTrack = tracks[currentIndex + 1]
    if (nextTrack) {
      playTrack(nextTrack)
    } else {
      setIsPlaying(false)
      setIsPlayingAll(false)
    }
  }

  return (
    <>
      <PageSEO title={`Tracks - ${siteMetadata.author}`} description="Tracks" />
      <section className="min-h-screen bg-white px-6 py-8 text-gray-900 dark:bg-transparent dark:text-white sm:px-10">
        <div className="mx-auto flex max-w-3xl flex-col">
          <header className="mb-8">
            <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">"my" tracks</h1>
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
            </p>
            <p className="max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300">
              this section was possible because of{' '}
              <a
                href="https://strudel.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline underline-offset-4 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
              >
                strudel
              </a>{' '}
              that allowed me to make music programmatically and for{' '}
              <a
                href="https://x.com/sweepingfloors_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline underline-offset-4 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
              >
                gwinn
              </a>{' '}
              who told me about it. all the tracks are frequencies that found me. these are
              incomplete at the moment, but i had fun in the process. keeping them here for
              provenance.
            </p>
            <button
              type="button"
              onClick={togglePlayAll}
              disabled={tracks.length === 0}
              className="mt-5 inline-flex items-center gap-2 border border-gray-400 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900 dark:focus:ring-white"
            >
              {isPlayingAll && isPlaying ? 'Pause all' : 'Play all'}
            </button>
          </header>
          {tracks.map((track) => {
            const isCurrentTrack = currentTrack === track.filename

            return (
              <div
                key={track.filename}
                className="flex items-center gap-4 border-b border-gray-200 py-4 dark:border-gray-800"
              >
                <button
                  type="button"
                  onClick={() => toggleTrack(track)}
                  aria-label={`${isCurrentTrack && isPlaying ? 'Pause' : 'Play'} ${track.name}`}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-gray-900 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-white dark:hover:text-gray-300 dark:focus:ring-white"
                >
                  {isCurrentTrack && isPlaying ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <span className="min-w-0 break-words">{track.name}.mp3</span>
              </div>
            )
          })}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Instrumental music has no speech to caption. */}
          <audio
            ref={audioRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleTrackEnded}
          />
        </div>
      </section>
    </>
  )
}
