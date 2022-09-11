import React from 'react'

const About = () => {
    return ( 
        <div name='about' className='w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white'>
            <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
                <div className='pb-8'>
                    <p className='text-4xl font-bold inline border-b-4 border-gray-500'>About</p>
                    <p className='py-1'>These are the technologies I know...</p>
                </div>

                <p className='text-xl mt-1'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea doloribus architecto dolorem exercitationem. Accusantium incidunt numquam, quod tempora quia quo, dolorem dolore sequi harum obcaecati id repudiandae reprehenderit. Illum labore dolores molestias, beatae amet in minus facilis accusantium ut rerum optio modi, molestiae ratione vel impedit est, maxime perspiciatis natus.
                </p>

                <br/>

                <p className='text-xl'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel fuga voluptate explicabo voluptatem, facere vitae dolore sapiente ad ex quos consectetur exercitationem quis assumenda cumque dolorum sint iure ipsum beatae velit fugiat cupiditate. Similique, pariatur enim? Provident iure maiores animi voluptas, minus mollitia laboriosam! Veritatis, rerum laudantium. Quidem, quam nulla.
                </p>
            </div>
        </div>
    );
};

export default About