import React from 'react'

function SecoundPage() {
    return (
        <div className='flex bg-[#F9F9F9]  flex-col w-screen'>
            <div className='flex justify-between px-12 sm:py-24 sm:px-40 items-center'>
                <h2 className='text-3xl w-screen text-[#28574E]'>Experience Excapion <br /> Healthcare in the India <br /> with Omnicas India</h2>
                <p className=' hidden sm:flex max-w-3xl'>Discover the pinnacle of healthcare services in the United States, where advancements, quality, cutting edge research, expert doctors and a commitment to patient success, combine to provide an unparalleled medical tourism experience. Omnicure USA is your dedicated partner, guiding you towards improved health and wellness. Connect with us today and embark on a journey of exceptional USA healthcare services.</p>
            </div>
            <div className='sm:flex    justify-around pb-16 px-10 items-center'>
                <div className=' flex flex-col rounded-3xl justify-between w-72 mt-10  sm:w-1/5 h-64 items-center bg-[#94949464]/10'>
                    <img src="./Group (1).png" className=' object-contain w-16 mt-8' alt="" />
                    <h4 className=' text-base '>Secound Option</h4>
                    <p className=' flex text-zinc-600 align-middle ali justify-center items-center w-full px-6 -mt-4 text-sm '>Discover the pinnacle of healthcare services in the </p>
                    <button className=' bg-[#28574E] -mb-4  text-white rounded-full justify-center items-center p-2 px-5'>Get Started</button>
                </div>
                <div className=' flex flex-col rounded-3xl justify-between  w-72 mt-10  sm:w-1/5 h-64 items-center bg-[#94949464]/10'>
                    <img src="./Vector (1).png" className=' object-contain w-16 mt-8' alt="" />
                    <h4 className=' text-base '>Secound Option</h4>
                    <p className=' flex text-zinc-600 align-middle ali justify-center items-center w-full px-6 -mt-4 text-sm '>Discover the pinnacle of healthcare services in the </p>
                    <button className=' bg-[#28574E] -mb-4  text-white rounded-full justify-center items-center p-2 px-5'>Get Started</button>
                </div>
                <div className=' flex flex-col rounded-3xl justify-between  w-72 mt-10  sm:w-1/5 h-64 items-center bg-[#94949464]/10'>
                    <img src="./Vector.png" className=' object-contain w-16 mt-8' alt="" />
                    <h4 className=' text-base '>Secound Option</h4>
                    <p className=' flex text-zinc-600 align-middle ali justify-center items-center w-full px-6 -mt-4 text-sm '>Discover the pinnacle of healthcare services in the </p>
                    <button className=' bg-[#28574E] -mb-4  text-white rounded-full justify-center items-center p-2 px-5'>Get Started</button>
                </div>
            </div>
            <div className=' flex flex-col w-screen   items-baseline justify-end mt-16 h-96'>
                <div className=' flex w-full h-4/5 justify-center '>
                    <div className=' flex h-full w-4/5 rounded-3xl bg-[#1E232F]  justify-between px-36  items-center'>
                        <div id="tx" className=' text-white flex flex-col justify-center gap-5'>
                            <h2 className=' text-4xl '>Teleconsert Our Pationat <br /> Advisor</h2>
                            <button className=' p-2 w-40 rounded-full text-black bg-white'>Book Call</button>
                        </div>
                        <div className=' align-top items-center -mt-24 flex h-full' >
                            <div className=' h-32 w-32 flex justify-center items-center bg-white/40 backdrop-blur-md mt-16 rounded-full absolute'>
                                <img src="./call.png" className='object-contain  ' alt="" />
                            </div>
                            <img src="./docter.png" className=' object-cover h-[130%] ' alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-screen flex justify-center items-center px-40  py-24'>
                <div className='flex h-full w-1/2 justify-center items-center '>
                    <img src="./grid1.png" className=' object-contain h-full' alt="" /></div> <div></div>
                
            </div>
        </div>
    )
}

export default SecoundPage
