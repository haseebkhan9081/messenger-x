import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth,{AuthOptions} from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import  GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/libs/prismadb";

export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,

        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label:'email',type:'text'},
                password: {label:'password', type :'password'},

            },
            async authorize(credentials:any){
                console.log("authorize() function triggered");
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid Credentials');
                }
                if(credentials?.email && credentials?.password){
                    console.log('Valid Credentials');
                }
                const user = await prisma.user.findUnique({
                    where:{
                    email:credentials.email
                        
                    }
                });
                console.log(credentials.email);
                console.log(user);
                if(user){
                    console.log("user has been found!!!");
                }else{
                    console.log("usr not found");
                }
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials');

                }

                const isCorrectPassword=await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                                                                        
                );
                if(!isCorrectPassword){
                    throw new Error('Invalid credentials');

                }
                return user;
            }                                               
        })
    ],
    debug:process.env.NODE_ENV==='development',
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,
};


const handler=NextAuth(authOptions);

export {handler as GET ,handler as POST};

