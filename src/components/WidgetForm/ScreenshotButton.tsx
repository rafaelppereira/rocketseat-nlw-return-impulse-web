import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas';
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenShotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenShotButtonProps) {
  const [isTakingScreenShot, setIsTakingScreenShot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenShot(true);
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64Image = canvas.toDataURL('image/png');

    onScreenshotTook(base64Image);
    setIsTakingScreenShot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-500 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'center',
          backgroundSize: 180
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      { isTakingScreenShot ? <Loading /> : <Camera className="w-6 h-6 text-zinc-100" /> }
    </button>
  )
}