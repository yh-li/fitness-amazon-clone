import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src="/img/home__image.png"></img>
        <div className="home__row">
          <Product
            id={1}
            title="Treadmill"
            price={1799.99}
            image="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVnr2eRDjB86H2Vw3IYDlzTPEYS94noe7ApoHoPtCeq7IgXN6l_jELIFeSwPELxUrI_53V21hvR8E&usqp=CAc"
            rating={5}
          />
          <Product
            id={2}
            rating={4}
            title="Barbell"
            image="https://i5.walmartimages.com/asr/f434e52d-191e-4dfb-84ee-c918d1134eec_1.e1632ae19434f1747d6b72afcc1b841e.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff"
            price={175.0}
          />
        </div>
        <div className="home__row">
          <Product
            id={3}
            rating={5}
            title="Meal Plan"
            image="https://i2.wp.com/suburbansimplicity.com/wp-content/uploads/2017/03/Meal-Planning.jpg"
            price={100.0}
          />
          <Product
            id={4}
            rating={4}
            title="Weight Tranining Plan"
            image="https://images-na.ssl-images-amazon.com/images/I/81BL-XIUWSL.jpg"
            price={100.0}
          />
          <Product
            id={5}
            rating={5}
            title="Private Session"
            image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sporty-black-man-making-fist-plank-exercise-in-royalty-free-image-1592516283.jpg"
            price={0.5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
