import { apolloClient } from '../apollo-client';
import { PostCanMirrorArgs, PublicationDocument, PublicationQueryRequest } from '../graphql/generated';

const getPublicationRequest = async (request: PublicationQueryRequest, profileId: PostCanMirrorArgs) => {
  const result = await apolloClient.query({
    query: PublicationDocument,
    variables: {
      request,
      profileId: profileId.profileId,
    },
  });

  return result.data.publication;
};

export const getPublication = async (id: string) => {
  const result = await getPublicationRequest({ publicationId: id }, { profileId: "0x01B673" });
  console.log('publication: result', result);

  return result;
};
