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

export const getPublication = async () => {
  const result = await getPublicationRequest({ publicationId: '0x019590-0xd0' }, { profileId: '0x0181A6' });
  console.log('publication: result', result);

  return result;
};

(async () => {
  await getPublication();
})();
