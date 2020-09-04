import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import HomeConModel from '../model/HomeConModel';
import Parse from 'parse';



class CarouselView extends Component {

    constructor(props) {
        super(props);

        this.state = {           
            nutritContent: []
        }
    }
  
    componentDidMount() {
       
        const HomeContent = Parse.Object.extend('HomeContent');
        const query = new Parse.Query(HomeContent);
        query.find().then((results) => {
            const nutContent = results.map(result => new HomeConModel(result));
            this.setState({
                nutritContent: nutContent
            });
            console.log('HomeContent found', results);
        }, (error) => {
            console.error('Error while fetching HomeContent', error);
        }); 
    }


  render() {
    const { nutritContent } = this.state;


    const caruoselItem = nutritContent.map((item, index) => 
                        <Carousel.Item key={index}>
                            <div className="item-title">                                                            
                                <br/>                                  
                                <h3>{item.title}</h3>
                                <p>{item.sub}</p> 
                            </div> 
                            <Carousel.Caption>                               
                                <p>{item.content}</p>
                            </Carousel.Caption>
                            <img
                                className="d-block w-100"
                                src={item.img}
                                alt="image"
                            />
                        </Carousel.Item>)


    return (
      <div>
        <Carousel>          

            {caruoselItem}          

            <Carousel.Item> 
                <div className="item-title">
                    <br/>                   
                    <h3>Health Benefits of Fennel</h3>
                    <p>According to the USDA National Nutrient Database for Standard Reference:</p>  
                </div>
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