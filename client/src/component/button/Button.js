import React from 'react';
import { Marker} from 'google-maps-react';

class Button extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
           map:this.props.map
        }
        this.handleTrainBtnClick = this.handleTrainBtnClick.bind(this)
    }
    handleTrainBtnClick () {
        console.log("Train Button => ", this.props.map);
        return(
            <Marker
            title={'Train Station'}
            position={{lat: "40.741039999802105", lng: "-73.99787100060406"}}
            icon={'train Icon'}
            content={"Info"}
            map={this.props.map}
            ></Marker>
        )

    }
    render(){
        return(
            
                <button id="train-Button"  onClick={this.handleTrainBtnClick}>Train Button</button>
            
        )
    }
}

export default Button;