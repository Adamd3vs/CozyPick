import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { NotificationService } from './notification.service';
import { Notification } from '../../libs/dto/notification/notification';
import { UpdateNotificationInput } from '../../libs/dto/notification/notification.update';
import { PropertiesInquiry } from '../../libs/dto/property/property.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { WithoutGuard } from '../auth/guards/without.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { shapeIntoMongoObjectId } from '../../libs/types/config';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';

@ObjectType()
class MetaCounter {
  @Field(() => Int)
  total!: number;
}

@ObjectType()
class NotificationPage {
  @Field(() => [Notification])
  list!: Notification[];

  @Field(() => [MetaCounter])
  metaCounter!: MetaCounter[];
}

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Query(() => NotificationPage)
  async myNotifications(
    @AuthMember('_id') meId: ObjectId,
    @Args('input') input: PropertiesInquiry,
  ): Promise<NotificationPage> {
    return (await this.notificationService.myNotifications(meId, input)) as any;
  }

  // Unread count badge
  @UseGuards(AuthGuard)
  @Query(() => Int)
  async unreadNotificationsCount(
    @AuthMember('_id') meId: ObjectId,
  ): Promise<number> {
    return this.notificationService.unreadCount(meId);
  }

  /** MUTATIONS **/

  // Mark single notification as READ
  @UseGuards(AuthGuard)
  @Mutation(() => Notification)
  async markNotificationRead(
    @AuthMember('_id') meId: ObjectId,
    @Args('id') id: string,
  ): Promise<Notification> {
    return this.notificationService.markRead(meId, shapeIntoMongoObjectId(id));
  }

  // Mark all WAIT notifications as READ
  @UseGuards(AuthGuard)
  @Mutation(() => Int)
  async markAllNotificationsRead(
    @AuthMember('_id') meId: ObjectId,
  ): Promise<number> {
    return this.notificationService.markAllRead(meId);
  }

  // Update my notification (e.g., status/title/desc if allowed by schema)
  @UseGuards(AuthGuard)
  @Roles(MemberType.ADMIN)
  @Mutation(() => Notification)
  async updateNotification(
    @AuthMember('_id') meId: ObjectId,
    @Args('input') input: UpdateNotificationInput,
  ): Promise<Notification> {
    // ensure _id is ObjectId
    const patched: UpdateNotificationInput = {
      ...input,
      _id: shapeIntoMongoObjectId(input._id as any) as any,
    };
    return this.notificationService.update(meId, patched);
  }

  // Remove (delete) a notification by id
  @UseGuards(AuthGuard)
  @Mutation(() => Notification)
  async removeNotification(
    @Args('id') id: string,
  ): Promise<Notification> {
    return this.notificationService.removeNotification(shapeIntoMongoObjectId(id));
  }

  // Create a welcome notification for current user (useful for testing)
  @UseGuards(AuthGuard)
  @Mutation(() => Notification)
  async createWelcomeNotification(
    @AuthMember('_id') meId: ObjectId,
  ): Promise<Notification> {
    return this.notificationService.createWelcome(meId);
  }
}
