import Image from 'next/image'

export function MentoringView() {
	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 hover:shadow-blue-300">
				<header className="flex justify-center items-center space-x-4 w-full text-center pb-6">
					<Image src="/static/imgs/faladev.jpg" alt="FalaDev Logo" height="50" width="200" />
				</header>
				<form className="space-y-4">
					<div className="mb-2">
						<label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="name">
							Nome
						</label>
						<input
							className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
							id="name"
							type="text"
							name="name"
							placeholder="Digite seu nome"
							required
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="email">
							E-mail
						</label>
						<input
							className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
							id="email"
							type="email"
							name="email"
							placeholder="Digite seu e-mail"
							required
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="phone">
							Telefone
						</label>
						<input
							className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
							id="phone"
							type="text"
							name="phone"
							placeholder="Digite seu telefone"
							required
						/>
					</div>
					<div className="flex items-center justify-center">
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
							type="submit"
						>
							Quero participar
						</button>
					</div>
				</form>
				<hr className="my-8 border-gray-300" />
				<footer className="flex flex-wrap justify-center items-center space-x-4 w-full text-center py-4">
					<a href="https://www.instagram.com/faladev.tech/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 transition-transform transform hover:scale-105">
						<Image src="/static/imgs/instagram.svg" alt="Instagram FalaDev" width={25} height={25} />
						<span className="text-base text-gray-700 hover:text-blue-600">@faladev.tech</span>
					</a>
					<a href="https://www.youtube.com/@FalaDev" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 transition-transform transform hover:scale-105">
						<Image src="/static/imgs/youtube.svg" alt="YouTube FalaDev" width={35} height={35} />
						<span className="text-base text-gray-700 hover:text-red-600">@FalaDev</span>
					</a>
					<a href="https://chat.whatsapp.com/BZpPgPOH9F091JLiIvRMpd" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 transition-transform transform hover:scale-105">
						<Image src="/static/imgs/whatsapp.svg" alt="WhatsApp FalaDev" width={30} height={30} />
						<span className="text-base text-gray-700 hover:text-green-600">@FalaDev</span>
					</a>
				</footer>
				<p className="text-lg text-gray-600 text-center">
					Essa é uma mentoria gratuita para quem está entrando na área de tecnologia, migrando de área ou buscando
					crescimento profissional.
				</p>
			</div>
		</main>
	)
}
