import { FC, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Input } from "@mui/material";

const FileUpload: FC = () => {
  const [filesPresent, setFilesPresent] = useState<boolean>(false)
  const files = useRef<File[] | null>(null)
  const onDrop: (acceptedFiles: File[]) => void = useCallback((acceptedFiles) => {
    setFilesPresent(true)
    files.current = acceptedFiles
  },[])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box>
      <Box {...getRootProps}>
        <Input {...getInputProps} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </Box>
      <Button disabled={!filesPresent}>Upload</Button>
    </Box>
  )
}

export default FileUpload
