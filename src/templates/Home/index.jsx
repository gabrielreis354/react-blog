import "./styles.css";
import React, { useEffect } from "react";
import { loadPosts as carregarPosts } from "../../utils/load-posts.js";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button/index.jsx";
import { SearchInput } from "../../components/SearchInput/index.jsx";

export const Home = () => {
  const [posts, setPosts] = React.useState([]);
  const [allPosts, setAllPosts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [postsPerPage] = React.useState(10);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteringPosts = searchValue ? filteredPosts : posts;

  const loadPosts = React.useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await carregarPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    const filteredPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    loadPosts(0, postsPerPage);
  }, [loadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="wrapperTitle">
        <h1 className="main-title">Blog Posts</h1>
        <SearchInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteringPosts.length > 0 ? (
        <Posts posts={filteringPosts} />
      ) : (
        <h2>Nenhum post encontrado</h2>
      )}

      <div className="buttonContainer">
        {!searchValue && filteringPosts.length > 0 && (
          <Button
            loadMorePosts={loadMorePosts}
            text={"Load More Posts"}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};
