import React, { Component } from 'react';
import axios from 'axios';
import '../support/bunting.css';

class HistoryNya extends Component {

    state = { listCart: [], idTabel: 0, detailHistory: [] }

    componentDidMount() {
        this.getCartList();
    }

    getCartList = () => {
        axios.get('http://localhost:1997/history')
        .then((res) => {
            this.setState({ listCart: res.data, idTabel: 0 })
            // console.log(this.state.listPopok)
        }).catch((err) => {
            console.log(err)
        })
    }

    //Dellete Item Cart
    onBtnDeleteCart = (id) => {
        if(window.confirm('Yakin nih bro?')){
            axios.delete('http://localhost:1997/history/' + id)
                .then((res) => {
                    this.getCartList();
                }).catch((err) => {
                    console.log(err)
                })
        }
    }


    onBtnEdit = (idNya) => {  
        this.setState({ idTabel: idNya })   
    }

    //SAVE
    onBtnSave = (id) => {

        var mapCart = this.state.listCart.map((item) => {

            var qty = this.refs.qty.value;
        
            // var { nama, harga, img, merk } = this.props.popok;
            axios.put('http://localhost:1997/orders/' + id, {
        
                username : item.username,
                produkId: item.produkId, 
                nama: item.nama, 
                harga: item.harga,
                img: item.img, 
                merk: item.merk,
                qty: qty,
                totalHarga: qty * item.harga,
                // date: new Date()

            }).then((res) => {
                //this.setState({idTabel:0})
                this.getCartList();
                // console.log('masuk')
            }).catch((err) => {
                console.log(err)
            })

        })
    }



     //Cekout
     onCekout = () => {
         
        if(window.confirm('Yakin nih bro?')){
        //     axios.delete('http://localhost:1997/orders/')
        //         .then((res) => {
        //             // this.getCartList();
        //         }).catch((err) => {
        //             console.log(err)
        //         })
        }


        var mapCart2 = this.state.listCart.map((e) => {

            // var qty = this.refs.qty.value;
        
            // var { nama, harga, img, merk } = this.props.popok;
            axios.post('http://localhost:1997/history/', {
        
                username : e.username,
                produkId: e.produkId, 
                nama: e.nama, 
                harga: e.harga,
                img: e.img, 
                merk: e.merk,
                qty: e.qty,
                totalHarga: e.qty * e.harga,
                // date: new Date()

            }).then((res) => {
                //this.setState({idTabel:0})
                // this.getCartList();
                // console.log('masuk')
            }).catch((err) => {
                console.log(err)
            })

        })

    }



     //History Detail
     onDetail = () => {
        axios.get('http://localhost:1997/history')
        .then((res) => {
            this.setState({ detailHistory: res.data })
            // console.log(this.state.listPopok)
        }).catch((err) => {
            console.log(err)
        })
    }

    
    onBtnHistory = (id) => {
     
        var arrSearch = this.state.detailHistory.filter((item) => {
            return item.id.includes(id) 
    
        })

        this.setState({ detailHistory: arrSearch })
        console.log(this.state.detailHistory)
    }


    renderDetailHistory = () => {

        var listJSXPopok = this.state.detailHistory.map(({ id, produkId, nama, harga, qty, totalHarga, img, merk }) => {
            // console.log(`${this.state.idTabel} --- ${id}`)
            if(this.state.idTabel === id){
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><img src={img} width="50px" alt={id}/></td>
                        <td>{harga}</td>
                        <td><input ref="qty" type="number" /></td>
                        <td>{totalHarga}</td>
                        <td><input className="btn btn-primary" type="button" value="SAVE"/></td>
                        
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><img src={img} width="50px" alt={id}/></td>
                        <td>{harga}</td>
                        <td>{qty}</td>
                        <td>{totalHarga}</td>
                        <td><input className="btn btn-primary" type="button" value="DETAIL" onClick={() => this.onBtnHistory(id)}/></td>
                        
                    </tr>
                )
            }
        })
        return listJSXPopok;
    }


    renderBodyCart = () => {

        var listJSXPopok = this.state.listCart.map(({ id, produkId, nama, harga, qty, totalHarga, img, merk, date }) => {
            // console.log(`${this.state.idTabel} --- ${id}`)
            if(this.state.idTabel === id){
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><img src={img} width="50px" alt={id}/></td>
                        <td>{harga}</td>
                        <td><input ref="qty" type="number" /></td>
                        <td>{totalHarga}</td>
                        <td><input className="btn btn-primary" type="button" value="SAVE"/></td>
                        
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><img src={img} width="50px" alt={id}/></td>
                        <td>{harga}</td>
                        <td>{qty}</td>
                        <td>{totalHarga}</td>
                        <td><input className="btn btn-primary" type="button" value="DETAIL" onClick={() => this.onBtnHistory(id)}/></td>
                        
                    </tr>
                )
            }
        })
        return listJSXPopok;
    }


    totalPrice = () => {
        var cost = 0;
        var totalJumlah = this.state.listCart.map(({ totalHarga }) => {
            
            return (
                cost += totalHarga
            )
        })

        return cost;
    }



   


    render(){
        return (
            <div className="container-fluid">
            <center>
                <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">HISTORY</h2>
                            
                            </div>
                            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Quantity</th>
                            <th>Total Harga</th>
                            <th></th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyCart()}
                    </tbody>

                </table>



                <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">HISTORY DETAIL</h2>
                            
                            </div>
                            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Quantity</th>
                            <th>Total Harga</th>
                            <th></th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDetailHistory()}
                    </tbody>

                </table>

               </center>
               <br></br><br></br> 
            </div>
        );
    }
}

export default HistoryNya;
