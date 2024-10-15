'use client'

import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data,handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText] = useState('');
  const [posts,setPosts] = useState([]);

  const handleSearchText = async (e) => {
      setSearchText(e.target.value.trim());
      try {
          const response = await fetch(`/api/prompt/search?searchText=${searchText}`);
          const data = await response.json();
          setPosts(data);
      } catch (error) {
        console.log(error);
      }
  }

  const handleTagClick = async (tag) => {
    setSearchText(tag);
      try {
          const response = await fetch(`/api/prompt/search?searchText=${encodeURIComponent(tag)}`);
          const data = await response.json();
          // console.log(data);
          setPosts(data);
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchText}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed