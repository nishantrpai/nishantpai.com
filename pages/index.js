import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import SocialIcon from '@/components/social-icons'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const { whatIknow, whatIveDone, whatnext } = siteMetadata
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="">
        <section>
          <span>
            Name: <b>{siteMetadata.author}</b>
          </span>
        </section>
        <section>
          <span>
            Timezone: <b>{siteMetadata.timezone}</b>
          </span>
        </section>
        <section>
          <span>
            Contact: &nbsp;
            <Link
              href={`mailto:${siteMetadata.contact}`}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {siteMetadata.contact}
            </Link>
          </span>
        </section>
        <div className="flex my-3 space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size="5" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
        </div>
        <section className="mt-8 flex flex-col space-y-10">
          <div>
            <h2 className="text-black hover:text-blue-600 dark:text-white text-md font-bold">
              What I know
            </h2>
            <p className="mt-2 text-gray-500">{whatIknow}</p>
          </div>
          <div>
            <h2 className="text-black hover:text-blue-600 dark:text-white text-md font-bold">
              What I've done
            </h2>
            <p className="mt-2 text-gray-500" dangerouslySetInnerHTML={{ __html: whatIveDone }} />
          </div>
          <div>
            <h2 className="text-black hover:text-blue-600 dark:text-white text-md font-bold	">
              What I want to do next
            </h2>
            <p className="mt-2 text-gray-500" dangerouslySetInnerHTML={{ __html: whatnext }} />
          </div>
        </section>
      </div>
    </>
  )
}
