import {sanityClient}  from "@sanity/client";
import  imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId :"vq89027t" , // which project to connect
    dataSet : "production",    //to know whether in development or production
    apiVersion : "2023-03-10",
    useCdn : true,
    token : process.env.NEXT_SANITY_TOKEN
})

const bulider = imageUrlBuilder(client)
export const urlFor = (source) => bulider.image(source)