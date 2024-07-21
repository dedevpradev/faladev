import Image from 'next/image'

export function MentoringView() {
	return (
		<main className="flex items-center justify-center h-screen">
			<div className="w-full max-w-xs">
				<header className="flex justify-center items-center space-x-4 w-full text-center pb-4">
					<Image src="/static/imgs/faladev.jpg" alt="" height="50" width="200" />
				</header>
				<form className="mt-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
							Nome
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							name="name"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							E-mail
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							name="email"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
							Telefone
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="phone"
							type="text"
							name="phone"
							required
						/>
					</div>
					<div className="flex items-center justify-center">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Quero participar
						</button>
					</div>
				</form>
				<hr className="mb-10" />
				<footer className="flex justify-center items-center space-x-4 w-full text-center pb-4">
					<a href="https://www.instagram.com/faladev.tech/" target="_blank" className="flex items-center space-x-2">
						<Image src="static/imgs/instagram.svg" alt="Instagram FalaDev" width={25} height={25} />
						<span className="text-xs">@faladev.tech</span>
					</a>
					<a href="https://www.youtube.com/@FalaDev" target="_blank" className="flex items-center space-x-2">
						<Image src="/static/imgs/youtube.svg" alt="YouTube FalaDev" width={35} height={35} />
						<span className="text-xs">@FalaDev</span>
					</a>
					<a
						href="https://chat.whatsapp.com/BZpPgPOH9F091JLiIvRMpd"
						target="_blank"
						className="flex items-center space-x-2"
					>
						<Image src="/static/imgs/whatsapp.svg" alt="WhatsApp FalaDev" width={30} height={30} />
						<span className="text-xs">@FalaDev</span>
					</a>
				</footer>
				<p className="text-xs text-center">
					Essa é uma mentoria gratuita para quem está entrando na área de tecnologia, migrando de área ou buscando
					crescimento profissional.
				</p>
			</div>
		</main>
	)
}
