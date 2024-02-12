import Slider from "react-slick";
import {
    bannerOne,
    bannerTwo,
    bannerThree,
    bannerFour,
    bannerFive
} from "../../assets";
import { useState } from "react";

const Banner = () => {
    const [dotActive, setDotActive] = useState(0)
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (prev, next) => {
            setDotActive(next)
        },
        appendDots: dots => (
            <div
                style={{
                   position: "absolute",
                   top: "70%",
                   left: "0",
                   right: "0",
                   margin: "0 auto",
                   transform: "translate(-50% -50%)",
                   width: "210px"
                }}
            >
                <ul style={{ 
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                 }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={
                    i === dotActive
                    ? {
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    background: "#131921",
                    padding: "8px 0",
                    cursor: "pointer",
                    border: "1px  solid #f3a847"
                } : {
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    background: "#232f3e",
                    padding: "8px 0",
                    cursor: "pointer",
                    border: "1px  solid white"
                }}
            >
                {i + 1}
            </div>
        ),

        responsive: [
           
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    return (
        <div className="w-full">
            <div className="w-full h-full relative">
                <Slider {...settings}>
                    <div>
                        <img src={bannerOne} alt="bannerOne" />
                    </div>
                    <div>
                        <img src={bannerTwo} alt="bannerOne" />
                    </div>
                    <div>
                        <img src={bannerThree} alt="bannerOne" />
                    </div>
                    <div>
                        <img src={bannerFour} alt="bannerOne" />
                    </div>
                    <div>
                        <img src={bannerFive} alt="bannerOne" />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Banner
