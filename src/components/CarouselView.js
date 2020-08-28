import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';



class CarouselView extends Component {

  



  render() {


    return (
      <div>
        <Carousel>
            <Carousel.Item> 
                    <br/>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>  
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  
                </Carousel.Caption>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/500/300?img=1"
                    alt="First slide"
                />
            </Carousel.Item>

            <Carousel.Item> 
                    <br/>
                    <h3>Second slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>  
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  
                </Carousel.Caption>
                <img
                    className="d-block w-100"
                    src="https://picsum.photos/500/300?img=2"
                    alt="First slide"
                />
            </Carousel.Item>

            <Carousel.Item> 
                    <br/>
                    <h3>Fennel Health Benefits</h3>
                    <p>According to the USDA National Nutrient Database for Standard Reference.</p>  
                <Carousel.Caption>
                    <p>The health benefits of fennel are many and include relief from anemia, indigestion, flatulence, constipation, colic, diarrhea, respiratory disorders, and menstrual disorders. It also aids in eye care. Fennel, which has the scientific name Foeniculum vulgare miller, or its essence, is widely used around the world in mouth fresheners, toothpaste, desserts, antacids, and in various culinary applications.</p>                  
                </Carousel.Caption>
                <img
                    className="d-block w-100"
                    src="https://www.organicfacts.net/wp-content/uploads/fennel-2.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            
        </Carousel>
      </div>
    );
  }
}

export default CarouselView;