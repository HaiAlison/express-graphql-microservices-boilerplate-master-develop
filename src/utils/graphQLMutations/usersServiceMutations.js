import gql from 'graphql-tag';

export const verifyToken = gql`
mutation VerifyToken($token: String!){
	verifyToken(token: $token){
		id
		email
		createdAt
		updatedAt
	}
}
`;
