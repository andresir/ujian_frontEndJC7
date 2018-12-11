import React, { Component } from 'react';
import axios from 'axios';
import '../support/bunting.css';

class ManagePopokBertasbih extends Component {

    state = { listPopok: [], idTabel: 0 }

    componentDidMount() {
        this.getPopokList();
    }

    getPopokList = () => {
        axios.get('http://localhost:1997/popok')
        .then((res) => {
            this.setState({ listPopok: res.data, idTabel: 0 })
            // console.log(this.state.listPopok)
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var merk = this.refs.merkAdd.value;
        var harga = this.refs.hargaAdd.value;
        var img = this.refs.imgAdd.value;
        var description = this.refs.descAdd.value;

        axios.post('http://localhost:1997/popok', {
            nama, merk, harga, img, description
        }).then((res) => {
            this.getPopokList();
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')){
            axios.delete('http://localhost:1997/popok/' + id)
                .then((res) => {
                    this.getPopokList();
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    onBtnEditText = (idNya) => {  
        this.setState({ idTabel: idNya })   
    }

    //SAVE
    onBtnSaveClick = (id) => {
        var nama = this.refs.namaSAVE.value;
        var merk = this.refs.merkSAVE.value;
        var harga = parseInt(this.refs.hargaSAVE.value);
        var img = this.refs.imgSAVE.value;
        var description = this.refs.descSAVE.value;

        axios.put('http://localhost:1997/popok/' + id, {
            nama, merk, harga, img, description
        }).then((res) => {
            //this.setState({idTabel:0})
            this.getPopokList();
            // console.log('masuk')
        }).catch((err) => {
            console.log(err)
        })
    }

    //Cancel
    onCancel = () => {  
        this.setState({ idTabel: 0 })   
    }

    renderBodyPopok = () => {
        var listJSXPopok = this.state.listPopok.map(({ id, nama, merk, description, harga, img }) => {
            // console.log(`${this.state.idTabel} --- ${id}`)
            if(this.state.idTabel === id){
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input ref="namaSAVE" type="text" defaultValue={nama} /></td>

                        <select ref="merkSAVE" defaultValue={merk}>
                            <option>Bronson</option>
                            <option>Uchiha</option>
                            <option>Bunting</option>
                        </select>

                        {/* <td><input ref="merkSAVE" type="text" defaultValue={merk} /></td> */}
                        
                        <td><input ref="hargaSAVE" type="number" defaultValue={harga} /></td>
                        <td><input ref="imgSAVE" type="text" defaultValue={img} /></td>
                        <td><textarea ref="descSAVE" defaultValue={description}></textarea></td>
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={this.onCancel}/></td>
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{merk}</td>
                        <td>{harga}</td>
                        <td><img src={img} width="50px" alt={id}/></td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditText(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr>
                )
            }
        })
        return listJSXPopok;
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">MANAGE POPOK</h2>
                            
                            </div>
                            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama</th>
                            <th>Merk</th>
                            <th>Harga</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyPopok()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input ref="namaAdd" type="text" placeholder="Nama Produk" /></td>
                            <td>
                                <select ref="merkAdd">
                                    <option>Bronson</option>
                                    <option>Uchiha</option>
                                    <option>Bunting</option>
                                </select>
                            </td>
                            <td><input ref="hargaAdd" type="number" placeholder="Harga Produk" /></td>
                            <td><input ref="imgAdd" type="text" placeholder="Image URL" /></td>
                            <td>
                                <textarea ref="descAdd" placeholder="Enter The Description Here..."></textarea>
                            </td>
                            <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick}/></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default ManagePopokBertasbih;
