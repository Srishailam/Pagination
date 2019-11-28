import React from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts/Posts';
import axios from 'axios';
import Pagination from './components/Pagination/Pagination';
import PaginationInfo from './components/PaginationInfo/PaginationInfo';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts:[],
      loading:false,
      currentPage: 1,
      postsPerPage:10,
      totalPages:[]
    };
  }
  componentDidMount(){
    this.setState( prevState => {
      return {
        ...prevState,
        loading:true
      }
    });
    this.fetchAndSetData();
  }
  fetchAndSetData = async() => {

    let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
    this.setState( prevState => {
      return {
        ...prevState,
        loading:false,
        totalPages:posts.data,
      }
    }, () => {
      this.setPageBoundaries();
    });
  }
  setPageBoundaries = () => {
    const { currentPage, postsPerPage, totalPages } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const posts = totalPages.slice(indexOfFirstPost, indexOfLastPost);
    this.setState( prevState => {
      return {
        ...prevState, 
        posts:posts
      }
    });
  }
  paginate = (pageNumber) => {
    this.setState( prevState => {
      return {
        ...prevState,
        currentPage:pageNumber
      }
    }, () =>{
      this.setPageBoundaries();
    });
  }
  setNumberPostsPerPage = (e) => {
    let {name, value} = e.target;
    this.setState( prevState => {
      return {
        ...prevState,
        postsPerPage: value,
        currentPage: 1
      }
    }, () => {
      this.setPageBoundaries();
    });
  }

  render(){
    const { currentPage, postsPerPage, totalPages } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return (
      <div className="App">
        <h1>Pagination app</h1>
        <div className="PaginationInfoContainer">
          <PaginationInfo 
            from={indexOfFirstPost+1}
            to={indexOfLastPost}
            totalCount={this.state.totalPages.length}
          />
          <select value={this.state.postsPerPage} onChange={this.setNumberPostsPerPage}>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <Posts
          posts={this.state.posts}
          isLoading={this.state.loading}
        />
        <Pagination
          totalPages={this.state.totalPages.length}
          currentPage={this.state.currentPage}
          postsPerPage={this.state.postsPerPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default App;
