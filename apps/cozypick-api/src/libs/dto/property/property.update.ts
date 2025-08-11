import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { PlaceLocation, PlaceStatus, PlaceType } from "../../enums/property.enum";
import { Member } from "../member/member";
import { IsInt, IsNotEmpty, isNotEmpty, IsOptional, Length, Min } from "class-validator";



@InputType()
export class PropertyUpdate {
    @IsNotEmpty()
    @Field(()=> String)
    _id: ObjectId;

    @IsOptional()
    @Field(()=> PlaceType, {nullable:true})
    placeType?: PlaceType;
    
    @IsOptional()
    @Field(()=> PlaceStatus,{nullable: true})
    placeStatus?: PlaceStatus;

    
    @IsOptional()
    @Field(()=> PlaceLocation,{nullable: true})
    placeLocation?: PlaceLocation;

    @IsOptional()
    @Length(3,100)
    @Field(()=> String,{nullable: true})
    propertyAddress?: String;

    @IsOptional()
    @Length(3,100)
    @Field(()=> String,{nullable: true})
    propertyTitle?: string;

    @IsOptional()
    @Field(()=> Number,{nullable: true})
    propertyPrice?: number;
    
    @IsOptional()
    @Field(()=> Number,{nullable: true})
    propertySquare?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Field(()=> Int, {nullable:true})
    propertyBeds?:number;

    
    @IsOptional()
    @IsInt()
    @Min(1)
    @Field(()=> Int, {nullable:true})
    propertyRooms?:number;
    
    @IsOptional()
    @Field(()=> [String],{nullable:true})
    propertyImages?:string;
    
    @IsOptional()
    @Length(5,500)
    @Field(()=> String,{nullable:true})
    propertyDesc?:string;
        
    @IsOptional()
    @Field(()=> Boolean,{nullable:true})
    propertyBarter?:boolean;
         
    @IsOptional()
    @Field(()=> Boolean,{nullable:true})
    propertyRent?:boolean;

    closedAt?:Date;
    
    deletedAt?:Date;

    @IsOptional()
    @Field(()=> Date, {nullable:true})
    constructedAt?:Date;


}
