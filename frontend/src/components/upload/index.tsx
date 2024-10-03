'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ButtonWhiteBlack } from '../Buttons/ButtonWhiteBlack'

const ZERO = 0

interface UploadProps {
	handleUpload: (file: File) => void
}

export const Upload = ({ handleUpload }: UploadProps) => {
	const [imgPreviewUrl, setImgPreviewUrl] = useState<string | null>(null)
	const inputImageRef = useRef<HTMLInputElement | null>(null);

	const handleRemoveImage = () => {
		setImgPreviewUrl(null)
	}

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[ZERO];
        if (file) {
            setImgPreviewUrl(URL.createObjectURL(file));
            handleUpload(file);
        }
    };

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
	
	return (
		<div className="flex flex-col w-fit h-fit relative">
			<div className="z-10 w-11/12 flex justify-end absolute">
				{imgPreviewUrl && <ButtonWhiteBlack onClick={handleRemoveImage}>&times;</ButtonWhiteBlack>}
			</div>
			<div
			 	{...getRootProps()}
				className="relative flex flex-col items-center justify-center border border-dashed h-56 w-56 rounded-full overflow-hidden border-cyan-600 z-0"
				onClick={()=>{inputImageRef.current && inputImageRef.current.click()}}
			>	
				<input 
					{...getInputProps()}
					id="upload" 
					name="upload" 
					type="file" 
					className="hidden"
					title="Upload your file" 
					placeholder="Choose a file" 
					ref={inputImageRef} 
					onChange={(e) => {		
						const file = e.target.files?.[ZERO];
						if (file) {
							setImgPreviewUrl(URL.createObjectURL(file));
							// handleUpload(file);
						}
					}}
				/>
				{imgPreviewUrl ? (
					<Image src={imgPreviewUrl} alt="photo preview" layout="fill" objectFit="cover" sizes="auto auto" />
				) : (
					<Image
						src={'/assets/person-unknow.png'}
						alt="photo preview"
						layout="fill"
						objectFit="cover"
						sizes="auto auto"
					/>
				)}
			</div>
		</div>
	)
}
