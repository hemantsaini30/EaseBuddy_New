import { getYouTubeEmbedUrl } from "../../utils/helpers";

/**
 * Renders a list of YouTube video embeds for the chapter
 * @param {Array} videos - resource objects with youtubeVideoId
 */
const VideoSection = ({ videos = [] }) => {
  if (!videos.length) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
        <p className="text-4xl">📹</p>
        <p className="mt-2 text-sm text-gray-400">
          No videos added yet.
          {/* TODO: Admin can add YouTube video IDs to the database */}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div key={video._id} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          {video.youtubeVideoId ? (
            <iframe
              src={getYouTubeEmbedUrl(video.youtubeVideoId)}
              title={video.title}
              className="aspect-video w-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // TODO: Replace with actual YouTube video ID from database
            <div className="flex aspect-video w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-400 text-sm">Video coming soon</span>
            </div>
          )}
          <div className="p-3">
            <p className="text-sm font-medium text-gray-800 dark:text-white">{video.title}</p>
            {video.videoDuration && <p className="mt-0.5 text-xs text-gray-400">{video.videoDuration}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
