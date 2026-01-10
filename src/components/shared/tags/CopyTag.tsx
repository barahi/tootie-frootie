import { useState } from "react";
import { Copy } from "lucide-react";

type CopyTagProps = {
  title: string;
  copyableTag: string;
  isPassword?: boolean;
};

export function CopyTag({
  title,
  copyableTag,
  isPassword = false,
}: CopyTagProps) {
  const [isTaggCopied, setIsTagCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(copyableTag);
    setIsTagCopied(true);
    setTimeout(() => setIsTagCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <p className="font-thin tracking-wide text-sm px-1">{title}</p>
      <div
        className="flex flex-row items-center justify-between gap-2 px-2 py-1 border-none rounded-lg bg-honeydew-90 cursor-pointer hover:bg-honeydew-80 transition-all duration-200"
        onClick={copyToClipboard}
      >
        {" "}
        {isPassword ? (
          <p className="text-black text-sm font-light tracking-wider">
            {"•".repeat(copyableTag.length)}
          </p>
        ) : (
          <p className="text-black text-sm font-light tracking-wider">
            {copyableTag}
          </p>
        )}
        <Copy className="w-4 text-gray-99" />
        {isTaggCopied && (
          <span className="absolute bg-white text-gray-99 text-xs px-2 py-1 rounded-md">
            {`${title} copied!`}
          </span>
        )}
      </div>
    </div>
  );
}

export default CopyTag;
