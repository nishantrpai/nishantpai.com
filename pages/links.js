import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Projects() {
  const [validProjects, setValidProjects] = useState([])

  useEffect(() => {
    const checkProjects = async () => {
      const filtered = []
      for (const p of projectsData) {
        try {
          const res = await fetch(p.href, { method: 'HEAD' })
          if (res.status !== 404) filtered.push(p)
        } catch (error) { console.log(error) }
      }
      setValidProjects(filtered)
    }
    checkProjects()
  }, [])

  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
        </div>
        <div className="container py-12">
          <div className="grid grid-cols-4 grid-flow-row -m-4">
            {validProjects.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                ico={d.ico}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
