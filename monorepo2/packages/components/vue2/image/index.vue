<template>
    <div class="image-container">
        <img :src="imageSrc"/>
    </div>
  </template>
  
  <script>
  export default {
    name: "UImage",
    props: {
        imageSrc: {
            type: String,
            required: true
        }
    },
    methods: {
      
    },
  };
  </script>
  
  <style scoped>
      .image-container {
        border: 10px solid #ddd;
      }
  </style>