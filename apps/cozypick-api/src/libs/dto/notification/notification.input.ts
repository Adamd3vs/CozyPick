import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { NotificationType, NotificationGroup, NotificationStatus } from '../../enums/notification.enum';

@InputType()
export class CreateNotificationInput {
  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationGroup)
  notificationGroup: NotificationGroup;

  @Field(()=> String)
  notificationTitle: string;

  @Field({ nullable: true })
  notificationDesc?: string;

  @Field(() => String)
  authorId: ObjectId;

  @Field(() => String)
  receiverId: ObjectId;

  @Field(() => String, { nullable: true })
  propertyId?: ObjectId;

  @Field(() => String, { nullable: true })
  articleId?: ObjectId;
}

@InputType()
export class NotificationInquiry {
  @Field(() => String, { nullable: true })
  receiverId?: ObjectId;

  @Field(() => String, { nullable: true })
  authorId?: ObjectId;

  @Field(() => NotificationStatus, { nullable: true })
  notificationStatus?: NotificationStatus;

  @Field(() => NotificationGroup, { nullable: true })
  notificationGroup?: NotificationGroup;

  @Field(() => NotificationType, { nullable: true })
  notificationType?: NotificationType;
}
