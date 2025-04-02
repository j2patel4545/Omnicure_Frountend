import React from 'react';

function Home() {
    return (
        <div id="home" className="flex bg-[#F9F9F9] flex-col h-screen w-screen">
            {/* Top Section */}
            <div id="up" className="flex flex-col  items-center justify-start pt-24 font-recolate h-[70%] w-full bg-[#28574E]">
                <h2 className="text-3xl md:text-4xl lg:text-4xl text-center text-white leading-relaxed">
                    World's Best Advanced
                </h2>
                <h2 className="text-3xl md:text-4xl lg:text-4xl text-center text-white">
                    Cors-Boared Care
                </h2>
                <div id="search" className=' grid sm:flex mt-5 w- full p-2 justify-center  items-center gap-4'>
                    <input type="search" placeholder='search your Application Id' className='p-2 text-white w-96 rounded-3xl backdrop-blur-sm bg-white/30 outline-none  px-6' />
                    <div className=' flex w-full sm:w-0 justify-center sm:justify-start'>
                    <button className=' p-2 px-6 rounded-full w-64 sm:w-32 bg-[#F9F9F9] text-[#28574E]'>Explore</button>

                    </div>
                </div>
            </div>
            

            <div
                id="down"
                className="flex flex-col items-center justify-center h-[30%] w-full bg-[#F9F9F9]" >
                    <div className=' justify-center rounded-3xl items-center shadow-md backdrop-blur-sm flex h-[50vh] sm:h-[60vh] align-top absolute w-[90vw] sm:w-[60vw] mb-[31vh] bg-zinc-50/20'>
                    <div className=' justify-center rounded-3xl items-center flex h-[85%] align-top absolute w-[92%]  bg-zinc-50'>
                        <img src="./Image.png" className=' object-cover rounded-3xl h-full w-full' alt="" />
                    </div>

                    </div>
                
            </div>
        </div>
    );
}

export default Home;
