import { COHERE_TOKEN } from "$env/static/private";

export const load = () => {
  return {
    token: COHERE_TOKEN
  };
};