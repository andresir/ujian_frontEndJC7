import React, {Component} from 'react';

//destructuring 'this.props.item....'
class PopokItemBertasbih extends Component {

    onDed = () => {
        // console.log(`haloooo : ${this.state.ada}`)
        const { img, nama, description } = this.props.popok;
        return(
            
            <div className="col-md-4 col-sm-6 portfolio-item">
                <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x" />
                        </div>
                    </div>
                    <img className="img-fluid" src={img} alt="ferguso" />
                </a>
                <div className="portfolio-caption">
                    <h4>{nama}</h4>
                    <p className="text-muted">{description}</p>
                </div>
            </div>
        )
    }
    
    render(){
        
        return(
           
            this.onDed()
           
        );
    }
}

export default PopokItemBertasbih;