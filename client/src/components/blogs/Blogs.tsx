import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_BLOGS } from '../graphql/queries';
import BlogList from './BlogList';

const Blogs = () => {
  const { loading, data, error } = useQuery(GET_BLOGS);
  if (loading) return <>loading</>
  if (error) return <>Error..</>
  return (
    <div>
      <BlogList blogs={data.blogs} />
    </div>
  )
}

export default Blogs