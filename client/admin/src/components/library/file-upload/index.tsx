import { useRef, useState, type FC } from "react";

// framer motion
import { motion } from "framer-motion";

// react icons
import { HiOutlineUpload } from "react-icons/hi";

// react dropzone
import { useDropzone } from "react-dropzone";

// types
import type { FileUploadProps } from "@/types";

// FileUpload Component
import GridPattern from "./grid-pattern";
import { cn } from "@/utils/cn";
import { CiSquareRemove } from "react-icons/ci";

const FileUpload: FC<FileUploadProps> = ({ onChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    onChange(newFiles);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = files.filter(file => file !== fileToRemove);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  const { getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [],
      "image/webp": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    maxFiles: 1,
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: error => {
      console.log("🚀 --------------------------------🚀");
      console.log("🚀 ~ index.tsx:31 ~ error:", error);
      console.log("🚀 --------------------------------🚀");
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div onClick={handleClick} whileHover="animate" className="group/file relative block w-full overflow-hidden rounded-lg p-10">
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={e => handleFileChange(Array.from(e.target.files || []))}
          className="hidden cursor-pointer"
          multiple={false}
          disabled={files.length === 1}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-della-respira relative z-20 text-base font-bold text-neutral-700 dark:text-neutral-300">Upload file</p>
          <p className="font-della-respira relative z-20 mt-2 text-base font-normal text-neutral-400 dark:text-neutral-400">Drag or drop your files here or click to upload</p>
          <em className="font-della-respira z-20 mt-2 text-sm font-normal text-neutral-400">(Only *.jpeg and *.png images will be accepted)</em>
          <div className="relative mx-auto mt-10 w-full max-w-lg">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn("relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 md:h-fit dark:bg-neutral-900", "shadow-sm")}
                >
                  <div className="flex size-10 w-full justify-end">
                    <button
                      onClick={e => {
                        e.stopPropagation(); // Prevents file input from opening
                        handleRemoveFile(file);
                      }}
                      className="cursor-pointer"
                    >
                      <CiSquareRemove className="size-8" />
                    </button>
                  </div>
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout className="max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300">
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="shadow-input w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800">
                      {file.type}
                    </motion.p>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                      modified {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={{
                  initial: {
                    x: 0,
                    y: 0,
                  },
                  animate: {
                    x: 20,
                    y: -20,
                    opacity: 0.9,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] cursor-pointer items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                {isDragActive ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-neutral-600">
                    Drop it
                    <HiOutlineUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <HiOutlineUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={{
                  initial: {
                    opacity: 0,
                  },
                  animate: {
                    opacity: 1,
                  },
                }}
                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;
