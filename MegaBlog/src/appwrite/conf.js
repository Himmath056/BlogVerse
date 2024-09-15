import conf from "../config/config";
import { Client ,ID , Databases ,Storage ,Query } from 'appwrite';

// storage
export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId)
       this.databases = new Databases(this.client)
       this.bucket = new Storage(this.client)
    }

    // create post
    async createPost({title, slug, content, featuredImage, status , userId}){
        try {
            return await  this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
            } 

            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            
        }
    }

    // update post
    async updatePost(slug,{ title, content, featuredImage, status , userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);

        }
    }

    // delete Post
    async deletePost(slug){
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                )
            } catch (error) {
                console.log("Appwrite service :: getCurrentUser :: error",error);
                return false
            }
            return true
    }

    // single post
    async getPost(slug){
        try {
            return this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )

        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    // query for all posts
    async getPosts(queries = [Query.equal("status","active")]){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,
                    
                )
                
            } catch (error) {
                console.log("Appwrite service :: getCurrentUser :: error",error);
                return false
            }
    }

    // file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    // delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    // file preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}

const service =new Service

export default service