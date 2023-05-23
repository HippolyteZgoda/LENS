import { login } from '../authentication/login';
import { explore } from '../explore/explore-publications';
import { getAuthenticationToken, setAuthenticationToken } from '../state';
import { addReaction  } from '../reaction/add-reaction';
import { explicitStart } from '../config';
import { createMirror  } from '../publications/mirror';
import { getPublications } from '../publications/get-publications';
import { getPublication } from '../publications/get-publication';
import { getGatedPublication } from '../publications/get-publication-gated';
import { createPost } from '../publications/post'

const axios = require("axios");


const gpt3ApiKey = "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";
const apiUrl = "https://api.openai.com/v1/chat/completions";


async function runChatGPT(prompt:string) {
  try {
    const headers = {
      Authorization: `Bearer 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`,
      "Content-Type": "application/json",
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };

    const response = await axios.post(apiUrl, data, { headers });

    const replies = response.data.choices.map(
      (choice: any) => choice.message.content
    );
    return replies;
  } catch (error:any) {
    console.error("Erreur :", error.message);
    return [];
  }
}


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
 
  
  const userPrompt = "make me a joke";
runChatGPT(userPrompt)
  .then(async(replies) => {
    console.log("Réponses générées :", replies);
    await createPost(replies);
  })
  .catch((error) => {
    console.error("Erreur :", error.message);
  })
  //await addReaction(publicationId)
  //await createMirror(publicationId)
};

(async () => {
   test1(); 
})();