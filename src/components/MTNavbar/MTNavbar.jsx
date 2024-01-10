import { useAuthStore } from "../../hooks/useAuthStore";
import React from "react";
import {
	Navbar,
	Collapse,
	Typography,
	IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavList() {
	const { status } = useSelector((state) => state.auth);

	const { startLogout } = useAuthStore();

	const navigate = useNavigate();

	const onLogout = () => {
		startLogout();
		navigate("/", {
			replace: true,
		});
	};
	return (
		<ul className='my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
			{status !== "authenticated" ? (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-bold'>
					<NavLink
						to='/tracking'
						className='flex items-center hover:text-blue-500 transition-colors'>
						Seguimiento
					</NavLink>
				</Typography>
			) : null}
			{status !== "authenticated" ? (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-bold'>
					<NavLink
						to='/'
						className='flex items-center hover:text-blue-500 transition-colors'>
						Iniciar Sesion
					</NavLink>
				</Typography>
			) : null}
			{status === "authenticated" ? (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-bold'>
					<NavLink
						to='/createOrder'
						className='flex items-center hover:text-blue-500 transition-colors'>
						Nuevo pedido
					</NavLink>
				</Typography>
			) : null}

			{status === "authenticated" ? (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-bold'>
					<NavLink
						to='/board'
						className='flex items-center hover:text-blue-500 transition-colors'>
						Tablero
					</NavLink>
				</Typography>
			) : null}

			{status === "authenticated" ? (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-bold'>
					<NavLink
						to='/tasks'
						className='flex items-center hover:text-blue-500 transition-colors'>
						Tareas
					</NavLink>
				</Typography>
			) : null}

			{status === "authenticated" ? (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-bold'>
					<NavLink
						to='/prices'
						className='flex items-center hover:text-blue-500 transition-colors'>
						Precios
					</NavLink>
				</Typography>
			) : null}

			{status === "authenticated" ? (
				<Typography
					as='li'
					variant='small'
					color='blue-gray'
					className='p-1 font-bold'>
					<button
						className='flex items-center hover:text-blue-500 transition-colors'
						onClick={onLogout}>
						Cerrar Sesion
					</button>
				</Typography>
			) : null}
		</ul>
	);
}

export function NavbarSimple() {
	const [openNav, setOpenNav] = React.useState(false);

	const handleWindowResize = () =>
		window.innerWidth >= 960 && setOpenNav(false);

	React.useEffect(() => {
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return (
		<Navbar
			className='mx-auto  px-6 py-3 bg-gradient-to-r from-rose-100 to-teal-100'
			blurred={false}
			fullWidth={true}>
			<div className='flex items-center justify-between text-gray-900'>
				<Typography variant='h6' className='mr-4 cursor-pointer py-1.5'>
					La Repostera
				</Typography>
				<div className='hidden lg:block'>
					<NavList />
				</div>
				<IconButton
					variant='text'
					className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
					ripple={false}
					onClick={() => setOpenNav(!openNav)}>
					{openNav ? (
						<XMarkIcon className='h-6 w-6' strokeWidth={2} />
					) : (
						<Bars3Icon className='h-6 w-6' strokeWidth={2} />
					)}
				</IconButton>
			</div>
			<Collapse open={openNav}>
				<NavList />
			</Collapse>
		</Navbar>
	);
}
