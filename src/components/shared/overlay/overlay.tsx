import React, { useEffect } from "react";

interface OverlayProps {
  image: string;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative">
        <img
          src={`assets/images/${image}`}
          alt="Selected Cat"
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default Overlay;
