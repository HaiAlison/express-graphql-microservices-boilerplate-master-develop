import gql from 'graphql-tag';

export const removeImages = gql`
mutation RemoveImages($imageKeys: [RemoveImageInput]!){
	removeImages(imageKeys: $imageKeys){
		name
	}
}
`;