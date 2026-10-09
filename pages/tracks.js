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

  const toggleTrack = (track) => {
    const audio = audioRef.current

    if (currentTrack === track.filename && !audio.paused) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    if (currentTrack !== track.filename) {
      audio.pause()
      audio.src = track.src
      audio.currentTime = 0
      setCurrentTrack(track.filename)
    }

    audio.play().catch((error) => {
      console.error(`Unable to play ${track.filename}:`, error)
      setIsPlaying(false)
    })
    setIsPlaying(true)
  }

  return (
    <>
      <PageSEO title={`Tracks - ${siteMetadata.author}`} description="Tracks" />
      <section className="min-h-screen px-6 py-8 text-white sm:px-10">
        <div className="mx-auto flex max-w-3xl flex-col">
          <header className="mb-8">
            <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">"my" tracks</h1>
            <p className="mb-3 text-sm text-gray-400">
              {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
            </p>
            <p className="max-w-2xl leading-relaxed text-gray-300">
              this section was possible because of{' '}
              <a
                href="https://strudel.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-gray-300"
              >
                strudel
              </a>{' '}
              that allowed me to make music programmatically and for{' '}
              <a
                href="https://x.com/sweepingfloors_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-gray-300"
              >
                gwinn
              </a>{' '}
              who told me about it. all the tracks are frequencies that found me. these are
              incomplete at the moment, but i had fun in the process. keeping them here for
              provenance.
            </p>
          </header>
          {tracks.map((track) => {
            const isCurrentTrack = currentTrack === track.filename

            return (
              <div
                key={track.filename}
                className="flex items-center gap-4 border-b border-gray-800 py-4"
              >
                <button
                  type="button"
                  onClick={() => toggleTrack(track)}
                  aria-label={`${isCurrentTrack && isPlaying ? 'Pause' : 'Play'} ${track.name}`}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
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
                <span className="min-w-0 break-words">{track.name}</span>
              </div>
            )
          })}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Instrumental music has no speech to caption. */}
          <audio
            ref={audioRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </section>
    </>
  )
}
