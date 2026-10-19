import { model, Schema } from "mongoose";
import { UserIdentity } from "./user-identity.entity";

export const userIdentitySchema = new Schema<UserIdentity>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  provider: { type: String, default: 'local' },
  credentials: {
    type: {
      username: String,
      hashedPassword: String
    },
    _id: false,
  }
});

userIdentitySchema.pre('findOne', function() {
  this.populate('user');
});

export const UserIdentityModel =
  model<UserIdentity>('UserIdentity', userIdentitySchema);
