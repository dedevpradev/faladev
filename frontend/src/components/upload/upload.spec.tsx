import { fireEvent, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { expect } from "vitest";

import { FormStateChecker, renderWithFormProvider } from "@/test-utils";

import { Upload } from "."


const ZERO = 0;
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
            expect(inputUpload.files?.[ZERO]).toStrictEqual(file);
            expect(inputUpload.files?.item(ZERO)).toStrictEqual(file);
            expect(inputUpload.files).toHaveLength(1)        
          });
    })
    it("should handle image removal", async()=>{
        const inputUpload = screen.getByLabelText<HTMLInputElement>(/upload file/i);
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        userEvent.upload(inputUpload,file);  
       
        // await waitFor(()=>{
        //     expect(inputUpload.files?.[ZERO]).toStrictEqual(file);
        //     expect(inputUpload.files?.item(ZERO)).toStrictEqual(file);
        //     expect(inputUpload.files).toHaveLength(1)           
        // })
        // Funciona até aqui
        // screen.debug()
        await waitFor(()=> {
           // screen.getByTestId('custom-element')}); 
        // expect(removeImageButton).toBeInTheDocument();
        // userEvent.click(removeImageButton);
        // await waitFor(() => {
        //     expect(inputUpload.files).toHaveLength(0);
        screen.debug();
        console.log("inputUpload", inputUpload.files);       
    });
    it('should display remove button when an image is uploaded', async () => {
        // renderWithForm(<Upload name="test-upload" />);

        const input = screen.getByPlaceholderText(/choose a file/i);

        // Simulate file upload
        const file = new File(['image content'], 'image.png', { type: 'image/png' });
        fireEvent.change(input, {
            target: { files: [file] },
        });

        // Verifica se o botão de remover a imagem é exibido
        const removeButton = await screen.findByTestId('custom-element');
        expect(removeButton).toBeInTheDocument();
    });
        
    })
})