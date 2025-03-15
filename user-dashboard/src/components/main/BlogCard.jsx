const BlogCard = ({title, description, date, readTime, imageUrl, link}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
    >
      {/* Resim Alanı */}
      <div className="h-48 bg-gray-100 flex-shrink-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* İçerik Alanı */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">📅 {date}</span>
          <span>•</span>
          <span className="ml-2">⏱️ {readTime}</span>
        </div>
      </div>
    </a>
  )
}

export default BlogCard
