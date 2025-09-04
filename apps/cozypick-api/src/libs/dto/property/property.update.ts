import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { PropertyCategory, PropertyLocation, PropertyStatus, PropertyType } from "../../enums/property.enum";
import { Member } from "../member/member";
import { IsInt, IsNotEmpty, isNotEmpty, IsOptional, Length, Min } from "class-validator";



@InputType()
export class PropertyUpdate {
    @IsNotEmpty()
    @Field(()=> String)
    _id: ObjectId;

    @IsOptional()
    @Field(()=> PropertyType, {nullable:true})
    propertyType?: PropertyType;
    
    @IsOptional()
    @Field(()=> PropertyStatus,{nullable: true})
    propertyStatus?: PropertyStatus;

    
    @IsOptional()
    @Field(()=> PropertyLocation,{nullable: true})
    propertyLocation?: PropertyLocation;

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
    @Field(()=> PropertyCategory, {nullable:true})
    propertyCategory?:PropertyCategory;

    @IsOptional()
    @Field(()=> [String],{nullable:true})
    propertyImages?:string;
    
    @IsOptional()
    @Length(5,500)
    @Field(()=> String,{nullable:true})
    propertyDesc?:string;

    closedAt?:Date;
    
    deletedAt?:Date;

    @IsOptional()
    @Field(()=> Date, {nullable:true})
    constructedAt?:Date;


}
