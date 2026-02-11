import { GraphQLClient, gql } from 'graphql-request';

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;

const graphQLClient = new GraphQLClient(endpoint);

export const getPosts = async () => {
    const query = gql`
    query GetPosts {
      posts(orderBy: date_DESC) {
        id
        title
        slug
        date
        excerpt
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `;

    const result = await graphQLClient.request(query);
    return result.posts;
};

export const getPostBySlug = async (slug) => {
    const query = gql`
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        slug
        date
        excerpt
        content {
          html
        }
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
        seoOverride {
            title
            description
            image {
                url
            }
        }
      }
    }
  `;

    const result = await graphQLClient.request(query, { slug });
    return result.post;
};
