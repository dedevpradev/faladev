'use client'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const ZERO = 0

export const Upload = () => {
	const [uploadFile, setUploadFile] = useState<File | null>(null)
	const [imgPreviewUrl, setImgPreviewUrl] = useState<string | null>(null)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => {
			const file = acceptedFiles[ZERO]
			setUploadFile(file)

			const reader = new FileReader()
			reader.onloadend = () => {
				setImgPreviewUrl(reader.result as string)
			}

			reader.readAsDataURL(file)
		},
	})

	const handleRemoveImage = () => {
		setImgPreviewUrl(null)
		setUploadFile(null)
	}

	return (
		<div className="flex flex-col w-fit relative ">
			<div id="1" className="z-10 top-14 flex justify-end relative">
				{imgPreviewUrl && (
					<button
						className="text-2xl text-center  flex flex-col justify-center items-center border border-black p-5 w-3 h-3 rounded-full"
						onClick={handleRemoveImage}
					>
						&times;
					</button>
				)}
			</div>
			<div
				id="2"
				className=" relative flex flex-col items-center justify-center border border-dashed h-56 w-56 rounded-full overflow-hidden border-cyan-600 z-0"
				{...getRootProps()}
			>
				<input className="sr-only" {...getInputProps()} />
				{imgPreviewUrl ? (
					<div className="z-0">
						<Image src={imgPreviewUrl} alt="photo preview" width={224} height={224} />
					</div>
				) : (
					<div>dwada</div>
				)}
			</div>
		</div>
	)
}
