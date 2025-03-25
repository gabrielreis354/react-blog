import "./styles.css";
import React, { Component } from "react";
import { loadPosts } from "../../utils/load-posts.js";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button/index.jsx";
import { SearchInput } from "../../components/SearchInput/index.jsx";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 9,
    searchValue: "",
    filteredPosts: [],
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });

    const filteredPosts = this.state.allPosts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({ filteredPosts: filteredPosts });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue, filteredPosts } =
      this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteringPosts = searchValue ? filteredPosts : posts;

    return (
      <section className="container">
        <div className="wrapperTitle">
          <h1 className="main-title">Blog Posts</h1>
          <SearchInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        {filteringPosts.length > 0 ? (
          <Posts posts={filteringPosts} />
        ) : (
          <h2>Nenhum post encontrado</h2>
        )}

        <div className="buttonContainer">
          {!searchValue && filteringPosts.length > 0 && (
            <Button
              loadMorePosts={this.loadMorePosts}
              text={"Load More Posts"}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
