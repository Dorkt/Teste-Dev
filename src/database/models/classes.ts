import mongoose, { Document, Model } from 'mongoose';

export interface Classe {
    _id: string,
    name: string,
    description: string,
    video: string,
    data_init: Date,
    data_end: Date,
    data_created: Date,
    date_updated: Date,
    total_comments: number
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        video: { type: String, required: true },
        data_init: { type: Date, required: true },
        data_end: { type: Date, required: true },
        data_created: { type: Date, required: true },
        data_updated: { type: Date, required: true },
        total_comments: { type: Number, required: true },
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

interface ClasseModel extends Omit<Classe, '_id'>, Document {}

export const Classe: Model<ClasseModel> = mongoose.model('User', new mongoose.Schema(schema))

