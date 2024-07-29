import React, { useState } from 'react';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Image from 'next/image';
import * as yup from 'yup';
import { MentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service';
import { 
  INSTAGRAM_URL, 
  YOUTUBE_URL, 
  WHATSAPP_URL, 
  LOGO_SRC, 
  INSTAGRAM_ICON_SRC, 
  YOUTUBE_ICON_SRC, 
  WHATSAPP_ICON_SRC 
} from '@/utils/constants';

// Define o esquema de validação usando Yup
const esquemaValidacao = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório'),
});

// Define os tipos para os dados do formulário e erros
interface DadosFormulario {
  name: string;
  email: string;
  phone: string;
}

interface ErrosFormulario {
  [key: string]: string;
}

export function MentoringView() {
  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({ name: '', email: '', phone: '' });
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [enviando, setEnviando] = useState<boolean>(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string>('');

  const serviçoMentoria = new MentoringAgendaService();

  // Atualiza os dados do formulário e limpa os erros para o campo específico
  const setInput = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
    setErros({ ...erros, [name]: '' });
  };

  // Trata o envio do formulário
  const setSubimit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setEnviando(true);
    setMensagemSucesso('');

    try {
      await esquemaValidacao.validate(dadosFormulario, { abortEarly: false });
      setErros({});

      await serviçoMentoria.SignUpMentoring();
      setMensagemSucesso('Formulário enviado com sucesso!');
      setDadosFormulario({ name: '', email: '', phone: '' });

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const novosErros: ErrosFormulario = err.inner.reduce((acc: ErrosFormulario, erro) => {
          if (erro.path) {
            acc[erro.path] = erro.message;
          }
          return acc;
        }, {});
        setErros(novosErros);
      } else {
        alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 hover:shadow-blue-300">
        <header className="flex justify-center items-center space-x-4 w-full text-center pb-6">
          <Image src={LOGO_SRC} alt="Logo FalaDev" height={50} width={200} />
        </header>

        <form className="space-y-4" onSubmit={setSubimit}>
          <Input
            error={erros.name}
            label="Nome"
            name="name"
            onChange={setInput}
            placeholder="Digite seu nome"
            required
            type="text"
            value={dadosFormulario.name}
          />
          <Input
            error={erros.email}
            label="E-mail"
            name="email"
            onChange={setInput}
            placeholder="Digite seu e-mail"
            required
            type="email"
            value={dadosFormulario.email}
          />
          <Input
            error={erros.phone}
            label="Telefone"
            name="phone"
            onChange={setInput}
            placeholder="Digite seu telefone"
            required
            type="text"
            value={dadosFormulario.phone}
          />

          <div className="flex items-center justify-center">
            <Button type="submit" variant="primary" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Quero participar'}
            </Button>
          </div>
        </form>

        {mensagemSucesso && (
          <div className="text-center text-green-500 mt-4">{mensagemSucesso}</div>
        )}

        <hr className="my-8 border-gray-300" />

        <footer className="flex flex-wrap justify-center items-center space-x-4 w-full text-center py-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition-transform transform hover:scale-105"
          >
            <Image src={INSTAGRAM_ICON_SRC} alt="Instagram FalaDev" width={25} height={25} />
            <span className="text-base text-gray-700 hover:text-blue-600">@faladev.tech</span>
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition-transform transform hover:scale-105"
          >
            <Image src={YOUTUBE_ICON_SRC} alt="YouTube FalaDev" width={35} height={35} />
            <span className="text-base text-gray-700 hover:text-red-600">@FalaDev</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition-transform transform hover:scale-105"
          >
            <Image src={WHATSAPP_ICON_SRC} alt="WhatsApp FalaDev" width={30} height={30} />
            <span className="text-base text-gray-700 hover:text-green-600">@FalaDev</span>
          </a>
        </footer>

        <p className="text-lg text-gray-600 text-center mt-4">
          Essa é uma mentoria gratuita para quem está entrando na área de tecnologia, migrando de área ou buscando
          crescimento profissional.
        </p>
      </div>
    </main>
  );
}
