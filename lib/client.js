import sanityClient  from "@sanity/client";
import  imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId :"vq89027t" , // which project to connect
    dataset : "production",    //to know whether in development or production
    apiVersion : "2022-02-01",
    useCdn : true,
    token : process.env.NEXT_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)