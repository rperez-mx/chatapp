module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        uid : String,
        username : String,
        displayName : String,
        bio : String,
        online : Boolean,
        completed : Boolean
      },
      { timestamps : true}
    )
  )
}