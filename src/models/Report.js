import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    location: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
