import mongoose, { Document, Model } from 'mongoose';

export interface Classe {
    _id: string,
    name: string,
    description: string,
    video: string,
    data_init: Date,
    data_end: Date,
    date_created: Date,
    date_updated: Date,
    total_comments: number
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        video: { type: String },
        data_init: { type: Date },
        data_end: { type: Date },
        date_created: { type: Date, default: Date.now },
        date_updated: { type: Date, default: Date.now },
        total_comments: { type: Number, default: 0 },
    },
    {
        timestamps: { createdAt: 'date_created', updatedAt: 'date_updated' },
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

export const Classe: Model<ClasseModel> = mongoose.model('Classes', new mongoose.Schema(schema))

