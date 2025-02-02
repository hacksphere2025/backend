const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
});

export const category = mongoose.model("Category", categorySchema);