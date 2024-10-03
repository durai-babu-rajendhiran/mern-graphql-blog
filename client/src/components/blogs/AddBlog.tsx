import React, { useState,useRef } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import { addStyles, HtmlElmStyles } from "../../styles/add-blog-styles";
import { useMutation } from '@apollo/client';
import { ADD_BLOG } from '../graphql/mutations';

const AddBlog = () => {
  const [addBlog] = useMutation(ADD_BLOG);
  const HeadingRef = useRef<HTMLHeadingElement | null>(null);
  const ContentRef = useRef<HTMLParagraphElement | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission default behavior

    try {
      const date = new Date();
      const userData = localStorage.getItem("userData");
      const user = userData ? JSON.parse(userData).id : null;
      const title = HeadingRef.current?.innerText;
      const content = ContentRef.current?.innerText;
      if (!user) {
        throw new Error("User not logged in.");
      }

      if (!title?.trim() || !content?.trim()) {
        throw new Error("Title and content cannot be empty.");
      }

      const res = await addBlog({
        variables: {
          title,
          content,
          date,
          user
        }
      });

      const data = await res.data;
      setSnackbarMessage('Blog published successfully!');
      setOpenSnackbar(true);
      console.log(data);
    } catch (err: any) {
      console.error(err);
      setSnackbarMessage(err.message || 'Error publishing blog. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <Box sx={addStyles.container}>
      <Box sx={addStyles.blogHeader}>
        <Typography>Authored By: Durai</Typography>
        <Button color="success" variant="contained" onClick={handleSubmit}>
          Publish
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={addStyles.formContainer}>
          <div>
            <h2
              style={HtmlElmStyles.h2}
              contentEditable
              ref={HeadingRef}
            >
            Post Your story Title
            </h2>
            <p
              style={HtmlElmStyles.p}
              contentEditable
              ref={ContentRef}
            >
              Describe Your Story
            </p>
          </div>
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AddBlog;
