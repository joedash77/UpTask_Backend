import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import Task, { ITask } from "./Task";
import { IUser } from "./User";
import Note from "./Note";

export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[]
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    team: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
}, {timestamps: true})

// Middleware - Mongoose
ProjectSchema.pre('deleteOne', {document: true}, async function() { // Tiene q ser función, arrow function entiende el "this" de otra manera
    // Si cambiamos los valores de document y query, va a cambiar la forma en la que recuperas datos
    const projectId = this._id
    if(!projectId) return

    const tasks = await Task.find({ project: projectId })
    for(const task of tasks) {
        await Note.deleteMany({ task: task._id })
    }

    await Task.deleteMany({project: projectId})
})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project
