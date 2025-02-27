'use client'

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const OtherProfile = ({params}) => {
  const [posts,setPosts] = useState([]);
  const [name,setName] = useState('');
  const router = useRouter();
  const id = params.id;

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setName(data[0].creator.username);
      setPosts(data);
    }
    fetchPosts();
  },[])

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed){
          try{
            await fetch(`/api/prompt/${post._id.toString()}`,{method:"DELETE"});
            const filteredPosts = posts.filter((p)=>p._id !== post._id);
            setPosts(filteredPosts);
          }catch(error){
            console.log(error);
          }
        }
    }

  return (
    <>
    <Profile 
    name={name}
    desc={`Proflie Page of ${name}`} 
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
    </>
  )
}

export default OtherProfile