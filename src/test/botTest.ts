import { login } from '../authentication/login';
import { explore } from '../explore/explore-publications';
import { getAuthenticationToken, setAuthenticationToken } from '../state';
import { addReaction  } from '../reaction/add-reaction';
import { explicitStart, setPK, setProfileID } from '../config';
import { createMirror  } from '../publications/mirror';
import { getPublications } from '../publications/get-publications';
import { getPublication } from '../publications/get-publication';
import { getGatedPublication } from '../publications/get-publication-gated';
import { createPost } from '../publications/post'
import { createComment } from '../publications/comment';
import { getSigner } from '../ethers.service';
import { type } from 'os';

const axios = require("axios");
const path = require('path');
const dotenv = require('dotenv');
let x=1;
export const changeProfile=async()=>{
  console.log("HELOOOOOOOOOO")

const r = Math.floor(Math.random() * 2);
console.log(r);
type Compte={
  pk: string;
  profileID: string;
}
 const compte_list:Compte[] = []; // Make accounts array static
 

const pk_1="8b346a07010309e9ca1a0d7e8cf2479475039e30944ab29e6a0c9fc2c231b3c8"
const profile_ID_1="0xb675"
const pk_2="f56f6f0acec7afb176c333ad0ccedc792de840786f5aedbeb01571add29c124d"
const profile_ID_2="0x0149d9"

const compte1 = {pk:pk_1, profileID:profile_ID_1} as Compte ;
const compte2 = {pk:pk_2, profileID:profile_ID_2} as Compte ;

compte_list.push(compte1);
compte_list.push(compte2);
// Path to .env file
const envPath = path.join(__dirname, '../../.env');



setPK(compte_list[x].pk);
setProfileID(compte_list[x].profileID);
x++;
if(x===2)
{
  x=0;
}
}

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

  var canMirror = false
  var publication
  var iter = 0
  var publicationId :string
  do{
    console.log("test", iter)
  const publicationsList=await explore()
   publicationId = publicationsList.explorePublications.items[0].id
  if(!publicationId.includes("-DA-")){
    canMirror = true
    publication = getPublication(publicationsList.explorePublications.items[0].id)
    var contentPost= publicationsList.explorePublications.items[0].metadata.content
  }
  iter++
  } while (canMirror === false)
  
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  console.log("Case nummber:",randomNumber);
  switch(randomNumber) 
  {
    case 1: 
    {
      await createMirror(publicationId)
    }  
    case 2:
    {
        const userPrompt_post = "make a generic post in like a sentence like a tweet";
          //POST
        runChatGPT(userPrompt_post)
          .then(async(replies) => {
      console.log("je vais faire une Réponses générées avec le compte:", replies,getSigner());
      await createPost(String(replies));
        })
        .catch((error) => {
    console.error("Erreur :", error.message);
        });
      
    }
   case 3:
      {
          const userPrompt_comment = "make a generic response in like a sentence that maximze the interactions of this post"+contentPost;

        //COMMENT
        runChatGPT(userPrompt_comment)
        .then(async(replies) => {
        console.log("Réponses générées :", replies);
          await createComment(String(replies),publicationId)
        })
        .catch((error) => {
        console.error("Erreur :", error.message);
        });
      };

  }
  //await addReaction(publicationId)

    

// Generate a random interval between 15 and 25 minutes (in milliseconds)
 const randomInterval = Math.floor(Math.random() * (25 * 60 * 100 - 15 * 60 * 100 + 1)) + 15 * 60 * 100;

  // Call the function again after the random interval
  console.log("COMPTE numero dans test",getSigner())
  await changeProfile();
  //    setTimeout(test1,)

  console.log("COMPTE numero dans te st apres appel",getSigner())

  console.log("Fin d'un appel go next")
}

(async () => {
  for(let i=0;i<3;i++)
  {
   await test1()
}
})();