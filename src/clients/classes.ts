import { Controller } from "@overnightjs/core";
import { Request, Response } from "express";

export interface Classes {
    readonly name: string;
    readonly description: string;
    readonly video: string;
    readonly data_init: Date;
    readonly data_end: Date;
    readonly date_created: Date;
    readonly date_updated: Date;
    readonly total_comments: number;
}

export class clientClasse {

    constructor() {}

    public async getClasse(req: Request, res: Response): Promise<void> {

    }
}