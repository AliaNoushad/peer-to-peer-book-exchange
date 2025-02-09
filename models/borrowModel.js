const borrowSchema = mongoose.Schema({
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Returned"], default: "Pending" },
    borrowedAt: { type: Date },
    returnedAt: { type: Date },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Borrow", borrowSchema);