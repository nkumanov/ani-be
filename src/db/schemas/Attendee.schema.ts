import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttendeeDocument = HydratedDocument<Attendee>;
@Schema({ collection: 'guests' })
export class Attendee {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  attend: string;
  @Prop()
  meal: string;
  @Prop()
  alergy: string;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);
