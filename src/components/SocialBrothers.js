import './sb_stylesheet.css'
import image from './header.jpg'
import axios from 'axios';
import React from "react";

class SocialBrothers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            berichtnaam: "",
            categorie: '',
            // clearable: true,
            categories: [],
            posts: [],
            bericht: ""
        }
    }


    changeBerichtnaamHandler = (event) => {
        this.setState({berichtnaam: event.target.value}, ()=>
        console.log(this.state));


    }
    changeCategorieHandler = (event) => {
        this.setState({categorie: event.target.value})
        //
        console.log(event.target.value);
    }
    changeBerichtHandler = (event) => {
        this.setState({bericht: event.target.value})
        console.log(this.state.bericht)
    }

    componentDidMount() {
        //categories
        const categories = []
        this.setState({categories})


        const headers = {
            headers: {"token": "pj11daaQRz7zUIH56B9Z"}
        }
        axios('http://178.62.198.162/api/categories', headers)
            .then(response => this.setState({categories: response.data}))
            .catch((error) => {
                console.log("er was een error")
                console.error(error)
            })

        // articles
        axios.get('http://178.62.198.162/api/posts', headers)
            .then(response => this.setState({posts: response.data}))
    }


    render() {


        let categories = this.state.categories;
        let optionItems = categories.map((categorie) =>
            <option key={categorie.id}>{categorie.name}</option>
        );


        return (
            <div>

                {/*header*/}
                <img className='header-image' alt={"foto"} src={image}/>


                <div className='page-container'>

                    {/*bericht maken*/}
                    <form className='form-container'>
                        <label className='form-label'>Berichtnaam</label>
                        <input type='text' className='form-input' onChange={this.changeBerichtnaamHandler}
                               value={this.state.berichtnaam}/>
                        <label className='form-label'>Categorie</label>

                        {/*<br/>*/}
                        {/*<Select placeholder="Geen categorie" options={optionItems} onchange={this.changeCategorieHandler}/>*/}
                        {/*<br/>*/}

                        <select onChange={this.changeCategorieHandler} className="form-select">{optionItems} </select>


                        <label className='form-label'>Bericht</label>
                        <textarea className='form-textarea' onChange={this.changeBerichtHandler}
                                  value={this.state.bericht}>

                    </textarea>

                        <button className='form-button'>Bericht aanmaken</button>

                    </form>


                    {/*articles*/}
                    <aside className='aside-container'>
                        {/*{this.state.posts.length > 0 && (*/}
                        {/*    <ul className="results">*/}
                        {/*        {this.state.posts.map(function(post){*/}
                        {/*        re <li>{post.title}</li>*/}
                        {/*        ))}*/}
                        {/*    </ul>*/}
                        {/*)}*/}

                        <button className='aside-button'>Meer laden</button>


                    </aside>


                </div>
            </div>
        );
    }


}


export default SocialBrothers;
