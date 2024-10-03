import { gql } from "@apollo/client";


export const GET_BLOGS = gql`
{
    blogs {
      id
      title
      date
      content
      user {
        name
      }
    }
}`

export const GET_USER_BLOGS = gql`
query user($id:ID){
user(id:$id){
blogs{
title
content
date
id
}
}
}

`