import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const RecordSchema = new Schema({
    id: String,
    strategyID: String,
    startTime: Int,
    endTime: Int,
    start: Float,
    end: Float,
    high: Float,
    low: Float
});

export default mongoose.model('Records', RecordSchema);