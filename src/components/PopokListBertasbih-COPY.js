import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
// import PopokListBertasbih from './PopokItemBertasbih';
import PopokItemBertasbih from './PopokItemBertasbih';

class PopokListBertasbih extends Component {
    state = { listPopok: [] }

    componentDidMount() {
        axios.get('http://localhost:1997/popok')
            .then((res) => {
                this.setState({ listPopok: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    // renderListPopok = () => {
    //     var listJSXPopok = this.state.listPopok.map((item) => {
    //         return (
    //             <PopokItemBertasbih popok={item} />
    //         )
    //     })
    //     return listJSXPopok;
    // }


    renderGridZigZag = (num) => {  
        // console.log(`ini leng nya ---: ${this.state.listPopok[0]}`) 
        
        // console.log(this.state.ada)
        let arr;
        let count = 0;
        let temp = [];
        for (let i = 0; i < num; i++) {

            if (count < num) {

                if (i % 2 !== 0) {

                    arr = []
                    for (let j = 0; j < 2; j++) {
                        if (count < num) {
                            arr.push(this.state.listPopok[count])
                            count++
                        }
                    }
                    temp.push(arr)
                } else {

                    arr = []
                    for (let k = 0; k < 3; k++) {
                        if (count < num) {
                            arr.push(this.state.listPopok[count])
                            count++
                        }
                    }
                    temp.push(arr)
                }

                // if(i%2===0){
                // temp.push(arr)
                // console.log(temp)
                // }else{
                // temp.push(arr)
                // // console.log(arr)
                // }

            }
        
        
        }

        // var listTemp = temp.map((itemNya) => {
        // return(
        //     itemNya[1]
        // )
        
        // }
        // );
        // return listTemp

console.log('ini tmp : ' +temp)
        
        for(let l = 0; l < temp.length; l++){
            
                var listTemp = temp[l].map((itemNya) => {
                    return(
                        
                        <PopokItemBertasbih popok={itemNya} />
                    );
                
                }
                );
                return listTemp
            
          
        }



    }




    render() {

        if(this.props.username !== "" ){
            return (
                <div>
                    <section className="bg-light" id="portfolio">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">List Popok</h2>
                                <h3 className="section-subheading text-muted">Best popok in town.</h3>
                            </div>
                            </div>
                            <div className="row">
                                   {/* {this.renderListPopok()} */}
                                   {this.renderGridZigZag(this.state.listPopok.length)}
                                
                            </div>
                        </div>
                    </section>
                </div>
            );
        }

        return <Redirect to='/login'/>
        
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps) (PopokListBertasbih);