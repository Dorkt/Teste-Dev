import { CUSTOM_VALIDATION } from "@src/database/models/users";
import { Response } from "express";
import mongoose from "mongoose";

export abstract class BaseController {
    protected sendCreateUpdateErrorResponse(
        res: Response,
        error: mongoose.Error.ValidationError | Error
    ): void {
        if (error instanceof mongoose.Error.ValidationError) {
            const duplicatedKindErrors = Object.values(error.errors).filter((err) => {
				if (
					err instanceof mongoose.Error.ValidatorError ||
					err instanceof mongoose.Error.CastError
				) {
					return err.kind === CUSTOM_VALIDATION.DUPLICATED;
				} else {
					return null;
				}
			});
            res.status(422).send({ code: 422, error: error.message });
        } else {
            res.status(500).send({ code: 500, error: 'Something went wrong!' })
        }
    }
}