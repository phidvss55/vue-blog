<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            v-for="(post, index) in sampleBlogCards"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>Never miss a post? Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for Fireblog
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';

export default {
  name: 'Home',
  components: {
    BlogPost,
    BlogCard
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, corporis. Animi ea aut veritatis voluptate praesentium excepturi labore, mollitia enim numquam doloribus minus maxime modi totam ipsum doloremque iste, impedit ut vitae sunt? Dolorem quidem, blanditiis quae modi doloremque iure!',
        welcomeScreen: true,
        photo: 'coding'
      },
      sampleBlogPost: [
        {
          title: 'Title 1',
          blogHTML: 'this is a filter blog post',
          blogCoverPhoto: 'beautiful-stories'
        },
        {
          title: 'Title 2',
          blogHTML: 'this is a filter blog post 2',
          blogCoverPhoto: 'beautiful-stories'
        }
      ],
      sampleBlogCards: [
        {
          blogTitle: 'Blog Card 1',
          blogCoverPhoto: 'stock-1',
          blogDate: 'May 1 2020'
        },
        {
          blogTitle: 'Blog Card 2',
          blogCoverPhoto: 'stock-2',
          blogDate: 'May 5 2020'
        },
        {
          blogTitle: 'Blog Card 3',
          blogCoverPhoto: 'stock-3',
          blogDate: 'May 12 2021'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 120;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>
