import { FC, useState, useRef, useEffect } from 'react';

interface ImageDialog {
  position: { top: number; left: number };
  onClose: () => void;
  onInsertLink: (url: string) => void;
}

const ImageDialog: FC<ImageDialog> = ({ position, onClose, onInsertLink }) => {
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onInsertLink(url);
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
          placeholder="Enter image URL"
          className="mr-2 p-1 border rounded"
        />
        <button type="submit" className="mr-1 p-1 text-blue-500">
          Save
        </button>
      </form>
    </div>
  );
};

export default ImageDialog;
