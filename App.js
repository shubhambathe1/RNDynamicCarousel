import React, { Component } from 'react';

import styled from "styled-components/native"; // 3.1.6
import Carousel from 'react-native-snap-carousel'; // 3.6.0

export default class ThumbnailCarousel extends Component {

  constructor(props){
    super();
    this.state = {
      heroes_list: [],
      videos: [
        {
          id: "WpIAc9by5iU",
          thumbnail: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
          title: "Led Zeppelin - Stairway To Heaven"
        }, {
          id: "sNPnbI1arSE",
          thumbnail: "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
          title: "Eminem - My Name Is"
        }, {
          id: "VOgFZfRVaww",
          thumbnail: "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
          title: ""
        }
      ],
      errors: []
    }
    this.props = props;
    //this._carousel = {};
  }


  componentDidMount() {


    fetch('https://simplifiedcoding.net/demos/view-flipper/heroes.php', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // body: JSON.stringify({
  //   firstParam: 'yourValue',
  //   secondParam: 'yourOtherValue',
  // }),
}).then((response) => response.json())
    .then((responseJson) => {
      
      //return responseJson.heroes;
    
      console.warn(responseJson.heroes)
      this.setState({ heroes_list: responseJson.heroes })

    })
    .catch((error) => {
      console.error(error);
    });



  }


  handleSnapToItem(index){
    console.warn("snapped to ", index)
  }

  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    return (
        <ThumbnailBackgroundView>
          <CurrentVideoTO
             onPress={ () => { 
                console.log("clicked to index", index)
                this._carousel.snapToItem(index);
              }}
          >
            <CurrentVideoImage source={{ uri: item.imageurl }} />
          </CurrentVideoTO>
            {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
            <VideoTitleText>{item.name}</VideoTitleText>
        </ThumbnailBackgroundView>
    );
  }

  render = () => {

    console.log("videos: updating")

    return (
      <CarouselBackgroundView>
        <Carousel
          //ref={ (c) => { this._carousel = c; } }
          data={this.state.heroes_list}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={this.handleSnapToItem.bind(this)}
          sliderWidth={360}
          itemWidth={256}
          layout={'default'}
          firstItem={0}
        />
      </CarouselBackgroundView>
    );
  }
}


const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
`;

const CurrentVideoTO = styled.TouchableOpacity`
`
const CarouselBackgroundView = styled.View`
  background-color: black;
  height: 200;
  width: 100%;
`