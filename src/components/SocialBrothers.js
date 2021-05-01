import './sb_stylesheet.css'
import image from './header.jpg'
import axios from 'axios';
import React, {Fragment} from "react";

class SocialBrothers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
            posts_state:0,
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
        let value = this.state.categories.filter(function (item) {
            return item.name === event.target.value
        })
        this.setState({[event.target.name]: value[0].id})
    }

    handleSubmit = () => {
        let formData = new FormData();
        formData.set('title', this.state.title);
        formData.set('content', this.state.content)
        formData.set('category_id', this.state.category_id)
        console.log(this.state.title, this.state.category_id, this.state.content);
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
                alert("Er is iets fout gegaan."))
    }

    test = () => {
        this.setState({"posts_state": 1})
    }


    getPosts = () => {
        let posts;
        if(this.state.posts_state === 1){
            posts = this.state.posts
        }else{
           posts =  this.state.posts.slice(0, 4)
        }
        return posts.map((item, index) => (
            <Fragment key={item.id}>
                <li className="list-item-post">
                    <img className="post-image" src={item.img_url} alt="foto"/>
                    <h2>{item.title}</h2>
                    <p className="post-content">{item.content}</p>
                </li>
            </Fragment>

        ));
    };

    componentDidMount() {
        //categories
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
                    {/*form*/}
                    <form onSubmit={this.handleSubmit} className='form-container'>
                        <label htmlFor="title" className='form-label'>Berichtnaam</label>
                        <input onChange={this.handleChange} name="title" type='text' className='form-input'/>
                        <label htmlFor="category_id" className='form-label'>Categorie</label>
                        <select onChange={this.handleSelect} name="category_id"
                                className="form-select">{
                            this.state.categories.map((categorie) =>
                                <option key={categorie.id}>{categorie.name}</option>
                            )} </select>
                        <label htmlFor="content" className='form-label'>Bericht</label>
                        <textarea maxLength="255" onChange={this.handleChange} name="content"
                                  className='form-textarea'/>

                        <button className='form-button'>Bericht aanmaken</button>
                    </form>

                    {/*articles*/}
                    <aside className='aside-container'>
                        <ul className="list-posts">{this.getPosts()}</ul>
                        <button onClick={this.test} name="aside-button" className='aside-button'>meer laden</button>
                    </aside>
                </div>
            </div>
        );
    }
}

export default SocialBrothers;
