import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema(
  {
    caseNo: {
      type: String,
      required: true,
      unique: true,
    },
    mediatorName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    nextHearingDate: {
      type: Date,
    },
    partiesName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Case = mongoose.models.Case || mongoose.model('Case', caseSchema);
export default Case;
