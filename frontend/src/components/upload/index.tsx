'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ButtonWhiteBlack } from '../Buttons/ButtonWhiteBlack'

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
		<div className="flex flex-col w-fit h-fit relative ">
			<div className="z-10 w-11/12 flex justify-end absolute ">
				{imgPreviewUrl && <ButtonWhiteBlack onClick={handleRemoveImage}>&times;</ButtonWhiteBlack>}
			</div>
			<div
				className=" relative flex flex-col items-center justify-center border border-dashed h-56 w-56 rounded-full overflow-hidden border-cyan-600 z-0"
				{...getRootProps()}
			>
				<input className="sr-only" {...getInputProps()} />
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
