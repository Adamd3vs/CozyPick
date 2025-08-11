import {Query, Resolver} from "@nestjs/graphql"; 

@Resolver()
export class AppResolver {
    @Query(()=> String)
    // malumot retrieve qilish uchun query operationdan qabul qilamiz
    public sayHello():string{
        return "GraphQL API Server"; 
    }
}

// mutation - crud yani postga tugri keladi
//subscription bu - real time da subscribe buladi 