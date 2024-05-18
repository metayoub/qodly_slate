import { FC, useState, useRef, useEffect } from 'react';

const VideoDialog: FC<{
  position: { top: number; left: number };
  onClose: () => void;
  onInsertEmbed: (url: string) => void;
}> = ({ position, onClose, onInsertEmbed }) => {
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onInsertEmbed(url);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    setOpen(true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className="absolute bg-white border border-gray-300 p-1 z-50 shadow"
      style={{ top: position.top, left: position.left }}
    >
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL"
          className="mr-2 p-1 border rounded"
        />
        <button type="submit" className="mr-1 p-1 text-blue-500">
          Save
        </button>
      </form>
    </div>
  );
};

export default VideoDialog;
