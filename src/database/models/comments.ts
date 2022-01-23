import mongoose, { Document, Model } from 'mongoose';

export interface Comments {
    _id: string,
    id_class: string,
    comment: string,
    date_created: string,
    created_at
}

const schema = new mongoose.Schema(
    {
        id_class: { type: String, required: true },
        comment: { type: String, required: true },
        date_created: { type: Date, required: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: false },
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

interface CommentsModel extends Omit<Comments, '_id'>, Document {}

export const Comments: Model<CommentsModel> = mongoose.model('Comments', new mongoose.Schema(schema))

