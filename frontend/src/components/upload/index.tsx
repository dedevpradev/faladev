'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'

import { ButtonWhiteBlack } from '../Buttons/ButtonWhiteBlack'

const ZERO = 0

interface UploadProps {
	onChange: (...event: any[]) => void,
	name:string
}

export const Upload =({name='upload', ...rest}: {name?: string}) =>{
	const { control, } = useFormContext()

	return(
		<Controller 
			render={({  field: { onChange  }  })=>(
				<UploadInput onChange={(e:any)=>
					onChange(e.target.files[ZERO])} name={name} {...rest}/>
			)}
			name={name}
			control={control}
			defaultValue=""
		/>
	)
}

const UploadInput = ({ onChange,name, ...rest
}: UploadProps) => {
	 const [imgPreviewUrl, setImgPreviewUrl] = useState<string | null>(null)
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const { setValue, } = useFormContext()

	const handleRemoveImage = () => {
		 setImgPreviewUrl(null)
		if (inputImageRef.current) {
			inputImageRef.current.value = '';
			setValue(name,'')
		}
	}
    const onDrop = (acceptedFiles: File[]) => { 
        const file = acceptedFiles[ZERO];
        if (file) {
			setImgPreviewUrl( URL.createObjectURL(file));
			setValue(name,file)
        }
    };
	const { getRootProps, getInputProps } = useDropzone({ onDrop,  ...rest
	});
	return (
		<div className="flex flex-col w-fit h-fit relative">
			<div className="z-10 w-11/12 flex justify-end absolute">
				{imgPreviewUrl && <ButtonWhiteBlack data-testid="custom-element" onClick={handleRemoveImage}>&times;</ButtonWhiteBlack>}
			</div>
			<div
			 	{...getRootProps()}				
				className="relative flex flex-col items-center justify-center border border-dashed h-56 w-56 rounded-full overflow-hidden border-cyan-600 z-0"
				onClick={()=>{inputImageRef.current && inputImageRef.current.click()}}
			>	
			<label htmlFor="file-uploader" className="hidden">Upload file:</label>
				<input 
					{...getInputProps({ onChange })}
					id="file-uploader" 					
					type="file" 
					className="hidden"
					title="Upload your file" 
					placeholder="Choose a file" 
					ref={inputImageRef} 
				/>
				{imgPreviewUrl ? (
					<Image src={imgPreviewUrl} alt="photo preview" layout="fill" objectFit="cover" sizes="auto auto" />
				) : (
					<Image
						src={'/assets/person-unknow.png'}
						alt="person unknow"
						layout="fill"
						objectFit="cover"
						sizes="auto auto"
					/>
				)}
			</div>
		</div>
	)
}
