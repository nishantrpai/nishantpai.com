import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Projects() {
  const [validProjects, setValidProjects] = useState([])
  const [arrData, setArrData] = useState({})

  useEffect(() => {
    setValidProjects(projectsData)
    fetch('/api/stripe')
      .then((res) => res.json())
      .then((data) => setArrData(data))
      .catch((err) => console.error('Error fetching ARR:', err))
  }, [])

  const totalARR = Object.values(arrData).reduce((sum, val) => sum + val, 0)
  const progress = Math.min((totalARR / 1000000) * 100, 100)

  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                ARR Progress
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                ${totalARR.toLocaleString()} / $1M
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1 dark:bg-gray-800">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="container py-12">
          <div className="space-y-2">
            {validProjects
              .sort((a, b) => (arrData[b.title] || 0) - (arrData[a.title] || 0))
              .map((d) => (
                <div
                  key={d.title}
                  className="flex items-center p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <div className="flex-shrink-0 mr-4">
                    {d.ico ? (
                      <img src={d.ico} alt={`${d.title} icon`} className="w-12 h-12 rounded-lg" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                          {d.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
                          {d.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {d.description}
                        </p>
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-2">
                          ${arrData[d.title] ? arrData[d.title].toLocaleString() : '0'} ARR
                        </div>
                      </div>
                      {d.href && (
                        <a
                          href={d.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
