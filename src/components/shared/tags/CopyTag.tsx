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
  const [isTagCopied, setIsTagCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(copyableTag);
    setIsTagCopied(true);
    setTimeout(() => setIsTagCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <p className="px-1 text-sm font-thin tracking-wide">{title}</p>
      <div
        className="flex flex-row items-center justify-between gap-2 px-2 py-1 transition-all duration-200 border-none rounded-lg cursor-pointer bg-honeydew-90 hover:bg-honeydew-80"
        onClick={copyToClipboard}
      >
        {" "}
        {isPassword ? (
          <p className="text-sm font-light tracking-wider text-black">
            {"•".repeat(copyableTag.length)}
          </p>
        ) : (
          <p className="text-sm font-light tracking-wider text-black">
            {copyableTag}
          </p>
        )}
        <Copy className="w-4 text-gray-99" />
        {isTagCopied && (
          <span className="absolute px-2 py-1 text-xs bg-white rounded-md text-gray-99">
            {`${title} copied!`}
          </span>
        )}
      </div>
    </div>
  );
}

export default CopyTag;
