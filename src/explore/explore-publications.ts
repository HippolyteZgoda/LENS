import { apolloClient } from '../apollo-client';
import {
  ExplorePublicationRequest,
  ExplorePublicationsDocument,
  PublicationSortCriteria,
  PublicationTypes,
} from '../graphql/generated';

const explorePublications = (request: ExplorePublicationRequest) => {
  return apolloClient.query({
    query: ExplorePublicationsDocument,
    variables: {
      request,
    },
  });
};

export const explore = async () => {
  const result = await explorePublications({
    // switch for `PublicationSortCriteria.TOP_COLLECTED` if you wanted collected!
    // switch for `PublicationSortCriteria.TOP_MIRRORED` if you wanted top mirrored
    // switch for `PublicationSortCriteria.TOP_COMMENTED` if you wanted top commented
    sortCriteria: PublicationSortCriteria.Latest,
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Comment, PublicationTypes.Mirror],
    limit:2
  });

  console.log('explore: result', result.data);

  return result.data;
};

