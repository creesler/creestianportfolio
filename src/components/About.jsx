import React from 'react'

const About = () => {
    return ( 
        
        <div name='about' className='pt-100 w-full h-full bg-gradient-to-b from-gray-800 to-black text-white'>
            <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
                <div className='pb-8'>
                    <br />
                    <br />
                    <br />
                    <p className='text-4xl font-bold inline border-b-4 border-gray-500'>About</p>
                    <br />
                    <br />
                    {/* <p className='py-1'>These are the technologies I know...</p> */}
                </div>

                <p className='text-xl mt-1'>
                    I have 5 years of experience building and designing websites.
                    Designing, Editing Images for E-Commerce Businesses. Helping
                    Clients with any skills I can offer. Currently, I am in the 
                    process of learning Fullstack Development of Apps that can be
                    accessible from Mobile Devices to a Desktop Machine. I am a 
                    person that likes learn new things and be updated. That is 
                    why Google and Youtube is my friend always. 
                </p>

                <br/>

                <p className='text-xl'>
                    Started working on a BPO company where I manage to enhance my
                    Communication and Technology skills. Then got promoted as an IT
                    Desktop Support Technician in the Enterprise World, fixing thousands 
                    of machines and make myself updated with the technology. Then started
                    accepting side jobs from online jobsites like OnlineJobs.ph and Fiverr
                    to make some extra. 
                </p>
                
                
            </div>
            
        </div>
    );
};

export default About