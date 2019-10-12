/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovie = `query GetMovie($id: ID!) {
  getMovie(id: $id) {
    id
    title
    description
    release
    status
  }
}
`;
export const listMovies = `query ListMovies(
  $filter: ModelMovieFilterInput
  $limit: Int
  $nextToken: String
) {
  listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      release
      status
    }
    nextToken
  }
}
`;
