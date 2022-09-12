import React from 'react'
import javascript from '../assets/javascript.png';
import reactImage from '../assets/react.png';
import photoshop from '../assets/photoshop.png';
import illustrator from '../assets/illustrator.png';
import blender from '../assets/blender.png';
import aftereffects from '../assets/aftereffects.png';
import premiere from '../assets/premiere.png';
import davinciresolve from '../assets/davinciresolve.png';


const Experience = () => {

    const techs = [
        {
            id: 1,
            src: photoshop,
            title: 'Photoshop',
            style: 'shadow-blue-500',
        },
        {
            id: 2,
            src: illustrator,
            title: 'Illustrator',
            style: 'shadow-orange-500',
        },
        {
            id: 3,
            src: javascript,
            title: 'JavaScript',
            style: 'shadow-yellow-500',
        },
        {
            id: 4,
            src: reactImage,
            title: 'React',
            style: 'shadow-blue-500',
        },
        {
            id: 5,
            src: blender,
            title: 'Blender',
            style: 'shadow-orange-500',
        },
        {
            id: 6,
            src: aftereffects,
            title: 'After Effects',
            style: 'shadow-white',
        },
        {
            id: 7,
            src: premiere,
            title: 'Premiere Pro',
            style: 'shadow-pink-400',
        },
        {
            id: 8,
            src: davinciresolve,
            title: 'Davinci Resolve',
            style: 'shadow-gray-400',
        },
    ]
    return ( 
        <div name='experience' className='py-0 w-full h-full bg-gradient-to-b from-gray-800 to-black text-white'>
            <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
                <div className='pb-8'>
                
                    <p className='text-4xl font-bold inline border-b-4 border-gray-500'>Experience</p>
                    <p className='py-1'>These are the technologssssies I know...</p>
                </div>

                <div className='w-full grid grid-cols-2 sm:grid-cols-5 gap-8 text-center py-1 px-12 sm:px-0'>
                    {
                        techs.map(({id, src, title, style}) => (
                            <div key={id} className={`shadow-lg hover:scale-105 duration-500 py-2 rounded-lg ${style}`}>
                                <img src={src} alt='' className='w-20 mx-auto'/>
                                <p className='mt-4'>{title}</p>
                            </div>
                        ))
                    }
                </div>
                
            </div>
        </div>
    );
};

export default Experience