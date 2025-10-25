const Rating = require('../model/rating');

exports.handleRate = async (req, res) => {
  const { productId, value, userId } = req.body;

  if (value < 1 || value > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const existed = await Rating.findOne({ productId, userId });

    if (existed) {
      existed.value = value;
      await existed.save();
      return res.json({ message: "Rating updated", rating: existed });
    } else {
      const rating = new Rating({ userId, value, productId });
      await rating.save();
      return res.status(201).json({ message: "Rating saved", rating });
    }

  } catch (err) {
    console.error("Rating error:", err);
    res.status(500).json({ message: "Error Rating" });
  }
};

exports.getRating = async (req, res) => {
    const {userId, productId} = req.query
    try{
      const rating = await Rating.findOne({userId, productId})
      if (!rating) return res.json({ value: 0 });

    return res.json({ value: rating.value });
    }catch(err){
      console.error("Fetch rating error:", err);
    res.status(500).json({ message: "Failed to fetch rating" });
    }
}
