import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, ico }) => (
  <div className="p-2 w-full mb-4">
    <div className="h-full overflow-hidden rounded-md border-opacity-60 dark:border-gray-700 text-center">
      <div className="p-1">
        <img
          src={
            ico ||
            `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${href}/&size=128`
          }
          width={128}
          style={{ margin: 'auto', marginBottom: 20, borderRadius: '5px' }}
        />
        <h2 className="mb-1 text-sm font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        {/* <p className="mb-3 prose text-gray-500 max-w-none dark:text-gray-400">{description}</p> */}
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
