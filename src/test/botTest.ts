import { login } from '../authentication/login';
import { explore } from '../explore/explore-publications';
import { getAuthenticationToken, setAuthenticationToken } from '../state';
import { addReaction  } from '../reaction/add-reaction';
import { explicitStart } from '../config';
import { createMirror  } from '../publications/mirror';
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
  var canMirror = false
  var publication
  var iter = 0
  var publicationId :string
  var lensprotocole: "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d"
  do{
    console.log("test", iter)
  const publicationsList=await explore()
   publicationId = publicationsList.explorePublications.items[0].id
 // console.log("id:",publicationsList.explorePublications.items[0].id);
  if(!publicationId.includes("-DA-")){
    canMirror = true
    publication = getPublication(publicationsList.explorePublications.items[0].id)
  }
  iter++
  } while (canMirror === false)
   
  console.log(publication)
 
  //await addReaction(publicationsList.explorePublications.items[0].id)
  await createMirror(publicationId)
};

(async () => {
   test1(); 
})();