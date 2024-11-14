import { fireEvent, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { expect } from "vitest";

import { FormStateChecker, renderWithFormProvider } from "@/test-utils";

import { Upload } from "."


const ONE = 1;
describe('Upload Component',()=>{
    beforeEach(()=>{
        global.URL.createObjectURL = ()=>'http://localhost:3000/e17fa82b-b0c5-4b24-82fc-132a8659d6adimg/preview/test'
        renderWithFormProvider(
            <>
                <Upload name="upload" />
                <FormStateChecker name="upload" />
            </>
            )
        })
    it("should render the component without photo",()=>{       
        const formState = screen.getByTestId("form-state"); 
        expect(screen.getByAltText("person unknow")).toBeInTheDocument();
        expect(formState.textContent).toBe('');
    })
    it("should handle file upload", async()=>{
        const inputUpload = screen.getByLabelText<HTMLInputElement>(/upload file/i);
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        expect(inputUpload).toBeInTheDocument();
        userEvent.upload(inputUpload,file);
        await waitFor(() => {
            expect(inputUpload.files?.[0]).toStrictEqual(file);
            expect(inputUpload.files?.item(0)).toStrictEqual(file);
            expect(inputUpload.files).toHaveLength(ONE)        
          });
    })
    it("should handle image removal", async()=>{
        const inputUpload = screen.getByLabelText<HTMLInputElement>(/upload file/i);
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        userEvent.upload(inputUpload,file);      
        await waitFor(()=>{
            expect(inputUpload.files?.[0]).toStrictEqual(file);
            expect(inputUpload.files?.item(0)).toStrictEqual(file);
            expect(inputUpload.files).toHaveLength(ONE)           
        })
        const photoPreview = screen.getByAltText(/photo preview/i);
        const buttonRemoveImage = screen.getByTestId('custom-element');
        expect(photoPreview).toBeInTheDocument()
        expect(buttonRemoveImage).toBeInTheDocument()
        userEvent.click(buttonRemoveImage);
        await waitFor(()=>{
            expect(inputUpload.files?.[0]).toStrictEqual(undefined);
            expect(inputUpload.files?.item(0)).toStrictEqual(null);
            expect(inputUpload.files).toHaveLength(0)           
        })
        expect(screen.getByAltText("person unknow")).toBeInTheDocument();
    })
})