import React from "react";

export const Title = ({ title }) => {
	return (
		<section className=' py-10 mx-auto max-w-7xl flex justify-center items-center'>
			<div className='w-full mx-auto text-center md:w-11/12 xl:w-9/12 md:text-center flex justify-center items-center '>
				<h1 className='text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight flex justify-center items-center'>
					<span className='mx-auto block w-full text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 lg:inline drop-shadow-sm'>
						{title}
					</span>
				</h1>
			</div>
		</section>
	);
};
