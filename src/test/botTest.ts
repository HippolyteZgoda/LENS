import { login } from '../authentication/login';
import { explore } from '../explore/explore-publications';
import { getAuthenticationToken, setAuthenticationToken } from '../state';
import { addReaction  } from '../reaction/add-reaction';
import { explicitStart } from '../config';
import { createMirror  } from '../publications/mirror-gasless';
import { getPublications } from '../publications/get-publications';
import { getPublication } from '../publications/get-publication';
import { getGatedPublication } from '../publications/get-publication-gated';

export const test1 = async () => {
 
    if (explicitStart(__filename)) {
    await login();
  }
  console.log("authToken", getAuthenticationToken())
    if (explicitStart(__filename)) {
    await login();
  }
  const publicationsList=await explore()
  
 // console.log("id:",publicationsList.explorePublications.items[0].id);

  const publication = await getPublication()
  const t = publication
  console.log("TEST: ",t)
  //await addReaction(publicationsList.explorePublications.items[0].id)
  //await createMirror(publicationsList.explorePublications.items[0].id)
};

(async () => {
   test1(); 
})();