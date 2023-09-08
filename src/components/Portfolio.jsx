import React, { useState, createRef } from 'react'
// import arrayDestruct from '../assets/portfolio/arrayDestruct.jpg'
// import installNode from '../assets/portfolio/installNode.jpg'
// import navbar from '../assets/portfolio/navbar.jpg'
// import reactParallax from '../assets/portfolio/reactParallax.jpg'
// import reactSmooth from '../assets/portfolio/reactSmooth.jpg'
// import reactWeather from '../assets/portfolio/reactWeather.jpg'

// video player
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'

//custom css video
import '../assets/react-video-gallery.css'

//media file
import img1 from '../assets/portfolio/img2.PNG';
import video1 from '../assets/portfolio/Sequence03.mp4';
import img2 from '../assets/portfolio/img1.PNG';
import video2 from '../assets/portfolio/Sequence02.mp4';
import img3 from '../assets/portfolio/img3.PNG';
import video3 from '../assets/portfolio/Sequence04.mp4';


import img5 from '../assets/portfolio/img5.PNG';
import video5 from '../assets/portfolio/Sequence05.mp4';
import img6 from '../assets/portfolio/img6.PNG';
import video6 from '../assets/portfolio/Sequence06.mp4';
import img7 from '../assets/portfolio/img7.PNG';
import video7 from '../assets/portfolio/Sequence07.mp4';

const Portfolio = () => {
    const [model, setModel] = useState(false);
    let data = [
        {
            id: 1,
            poster: img1,
            videoUri: video1
        },
        {
            id: 2,
            poster: img2,
            videoUri: video2
        },
        {
            id: 3,
            poster: img3,
            videoUri: video3
        },
        {
            id: 4,
            poster: img5,
            videoUri: video5
        },
        {
            id: 5,
            poster: img6,
            videoUri: video6
        },
        {
            id: 6,
            poster: img7,
            videoUri: video7
        },
    ]
    return (
        <>
            <div name='portfolio' className='pt-1000 mt-1000 bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-full'>
                <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
                    <div className='pb-8'>
                     <br />
                     <br />
                        <p className='text-4xl font-bold inline border-b-4 border-gray-500'>Portfolio</p>
                        <p className='py-6'>Checkout some of my work</p>
                    </div>
                        <div className='gallery'>
                            {data.map((item, index) => {
                                let divRef = createRef(null);
                                const openModel = () => {
                                    divRef.current.classList.remove('video');
                                    divRef.current.classList.add('model');
                                    setModel(true);
                                }
                                const closeModel = () => {
                                    divRef.current.classList.add('video');
                                    divRef.current.classList.remove('model');
                                    setModel(false);
                                }
                                return(
                                    <div ref={divRef} className='video' key={index}>
                                        {model && <button className="model-close-btn" onClick={()=>closeModel()}>X</button>}
                                        <div className='video-container'>
                                            <Video 
                                                style={{width: '100%'}}
                                                autoPlay={model}
                                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                                poster={item.poster}
                                            >
                                                <source src={item.videoUri} type="video/webm"/>
                                            </Video>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>
                </div>
        </>
    )

//     const portfolios = [
//         {
//             id:1,
//             src: arrayDestruct
//         },
//         {
//             id:2,
//             src: reactParallax
//         },
//         {
//             id:3,
//             src: navbar
//         },
//         {
//             id:4,
//             src: reactSmooth
//         },
//         {
//             id:5,
//             src: installNode
//         },
//         {
//             id:6,
//             src: reactWeather
//         },
//     ]
//   return (
//     <div name='portfolio' className='pt-1000 mt-1000 bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-full'>
//         <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
//             <div className='pb-8'>
//                     <br />
//                     <br />
//                     <br />
//                 <p className='text-4xl font-bold inline border-b-4 border-gray-500'>Portfolio</p>
//                 <p className='py-6'>Checkout some of my work</p>
//             </div>

            

//             <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
//                 {
//                     portfolios.map(({id, src}) => (
//                         <div key={id} className='shadow-md shadow-gray-600 rounded-lg'>
//                         <img src={src} alt='' className='rounded-md duration-200 hover:scale-105'/>
//                             <div className='flex items-center justify-center'>
//                                 <button className='justify-center w-1/2 px-6 py-1 m-4 duration-200 hover:scale-105'>Demo</button>
//                             </div>
//                         </div>
//                     ))
//                 }
                
//             </div>
            
//         </div>
//     </div>
//   )
}

export default Portfolio
