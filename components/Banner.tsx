import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
// banners
import banner_01 from '../public/assets/banner-01.jpg'
import banner_02 from '../public/assets/banner-02.jpg'
import banner_03 from '../public/assets/banner-03.jpg'

export function Banner(){

  return(
    <div className='relative'>

      <div className='absolute w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0 h-32 z-10'/>


      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src={banner_01.src} alt=""/>
        </div>
        <div>

          <img loading="lazy" src={banner_02.src} alt=""/>
        </div>
        <div>
          <img loading="lazy" src={banner_03.src} alt=""/>

        </div>


      </Carousel>
    </div>
  )
}