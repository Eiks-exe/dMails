import axios from "axios";

interface IGif {
    id: string;
    title: string;
    media_formats: {
      [key: string]: any; // You can replace `any` with specific types if known
    };
    created: number;
    content_description: string;
    itemurl: string;
    url: string;
    tags: string[];
    flags: string[];
    hasaudio: boolean;
  }

  interface IResult{
    results : IGif[]
    next:string
  }

const apikey = "AIzaSyAbqw8aEgsTubItvFurE5CpiY2LFQunsrQ"
const apiDomain = "https://tenor.googleapis.com/v2/"
// Function to fetch data from the API
export const dataFetch = <T,>(url: string): Promise<T> => {
    // Send GET request to the specified URL
    const resp = axios.get(url)
        .then((res) => {
            // Return the data from the response
            return res.data;
        })
        .catch((error) => {
            // Return the error if the request fails
            return error;
        });
    return resp as Promise<T>;
};

export const getRandomGif = async (query: string) => {
    const {results } = (await dataFetch<IResult>(`${apiDomain}search?q=${query}&key=${apikey}&client_key=dMails&limit=1&random=1`))
    return results[0]
}

     