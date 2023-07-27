import ALL from "../ALL.config";

const API_URL = ALL.RandomImagesEndPoint;
let GenerateImage = async () => {
  let images = await fetch(API_URL).then((response) => response.json());
  // .then((result) => result.results);
  return images[0];
};
export default GenerateImage;
