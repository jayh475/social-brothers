import './sb_stylesheet.css'
import image from './header.jpg'
import axios from 'axios';
import React from "react";

class SocialBrothers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
            title: "",
            content: "",
            category_id: 1,
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSelect = (event) => {
        let value = this.state.categories.filter(function(item) {
            return   item.name === event.target.value
        })
        this.setState({[event.target.name]: value[0].id })
        console.log(value[0].id)
    }

    handleSubmit = () => {
        let formData = new FormData();

        formData.set('title', this.state.title);
        formData.set('content', this.state.content)
        formData.set('category_id', this.state.category_id)
        console.log(this.state.title,this.state.category_id,this.state.content);
        formData.forEach(element => console.log(element))

        const headers = {
            headers: {"token": "pj11daaQRz7zUIH56B9Z"}
        }

        axios.post('http://178.62.198.162/api/posts', formData, headers)
            .then((response) => {
                this.posts = response.data;
                console.log(response.data);
            })
            .catch(() =>
                alert("post doesnt work"))
    }


    componentDidMount() {//categories
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
        return (
            <div>

                {/*header*/}
                <img className='header-image' alt={"foto"} src={image}/>


                <div className='page-container'>

                    {/*bericht maken*/}
                    {/*title*/}
                    <form onSubmit={this.handleSubmit} className='form-container'>
                        <label htmlFor="title" className='form-label'>Berichtnaam</label>
                        <input onChange={this.handleChange} name="title" type='text' className='form-input'/>
                        {/* category_id*/}
                        <label htmlFor="category_id" className='form-label'>Categorie</label>

                        <select onChange={this.handleSelect} name="category_id"
                                className="form-select">{
                            this.state.categories.map((categorie) =>
                                <option key={categorie.id}>{categorie.name}</option>
                            )} </select>

                        {/* content*/}
                        <label htmlFor="content" className='form-label'>Bericht</label>
                        <textarea onChange={this.handleChange} name="content" className='form-textarea'/>

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
