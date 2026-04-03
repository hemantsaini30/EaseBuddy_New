import { getDriveEmbedUrl, getDriveDownloadUrl } from "../../utils/helpers";

/**
 * Embeds a Google Drive PDF (NCERT chapter or notes)
 * @param {object} resource - resource object with driveFileId
 */
const NotesSection = ({ resource }) => {
  if (!resource?.driveFileId) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
        <p className="text-4xl">📄</p>
        <p className="mt-2 text-sm text-gray-400">
          PDF not uploaded yet.
          {/* TODO: Upload PDF to Google Drive and add the file ID to the database */}
          {/* Drive embed URL: https://drive.google.com/file/d/FILE_ID/preview */}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 dark:text-white">{resource.title}</h3>
        <a
          href={getDriveDownloadUrl(resource.driveFileId)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400"
        >
          ⬇ Download PDF
        </a>
      </div>
      <iframe
        src={getDriveEmbedUrl(resource.driveFileId)}
        title={resource.title}
        className="h-[600px] w-full rounded-xl border border-gray-200 dark:border-gray-700"
        allow="autoplay"
      />
    </div>
  );
};

export default NotesSection;
