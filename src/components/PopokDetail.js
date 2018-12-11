import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { select_popok, tambahCart } from '../actions'

class PopokDetail extends Component {

    ////cara params ---> http://localhost:3000/popokdetail/2
    // componentDidMount(){
    //     //untuk mendapatkan link / akses ke id / buat GET id
    //     var popokId = this.props.match.params.id;
    //     axios.get(`http://localhost:1997/popok/${popokId}`)
    //     .then((res) => {
    //         this.props.select_popok(res.data)
    //         // console.log(res)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }


    //cara query-string ---> http://localhost:3000/popokdetail?popokid=2&namapopok=bronson
    componentDidMount(){
        //untuk mendapatkan link / akses ke id / buat GET id
        // var popokId = this.props.match.params.id;

        var params = queryString.parse(this.props.location.search);
        var popokId = params.popokid;
        axios.get(`http://localhost:1997/popok/${popokId}`)
        .then((res) => {
            this.props.select_popok(res.data)
            // console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    onToCart = () => {

        var params = queryString.parse(this.props.location.search);
        var popokId = params.popokid;
        // var nama = this.refs.namaAdd.value;
        // var merk = this.refs.merkAdd.value;
        var qty = this.refs.qty.value;
        // var img = this.refs.imgAdd.value;
        // var description = this.refs.descAdd.value;
        
        var { nama, harga, img, merk } = this.props.popok;
        axios.post('http://localhost:1997/orders' , {

            username : this.props.username,
            produkId: popokId, 
            nama, 
            harga,
            img, 
            merk,
            qty: qty,
            totalHarga: harga*qty,
            date: new Date()
    
        }).then((res) => {
            (window.alert('Produk berhasil dimasukan ke Keranjang'))
            // console.log(res)
            // console.log(this.props.popok.nama)
            this.props.tambahCart() 
            
            // if(res.data.nama === this.props.popok.nama){
            //     // this.props.tambahCart() 

            //     axios.delete('http://localhost:1997/orders/' + popokId)
            //     .then((res) => {
            //         this.props.tambahCart() 
            //     }).catch((err) => {
            //         console.log(err)
            //     })


            // }
            
            
            
        }).catch((err) => {
          console.log(err)
        })
    }

    

    render() {
        var { nama, harga, img, description, merk } = this.props.popok;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={img} src={img} className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h2>Rp. {harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <br></br>
                        <div className="col-4">
                            <input ref="qty" type="number" placeholder="Masukkan Jumlah Item" />
                            <input className="btn btn-success" onClick={this.onToCart} type="button" value="Add To Cart" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { popok: state.selectedPopok, username: state.auth.username }
}

export default connect(mapStateToProps, { select_popok, tambahCart })(PopokDetail);