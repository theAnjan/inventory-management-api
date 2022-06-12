const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  point: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  color: String,
  price: Number,
  status: {
    type: String,
    enum: ['out of stock', 'available', 'booked', 'sold', 'damaged'],
    default: 'available'
  },
  modelNo: String,
  weight: String,
  size: String,
  brand: String,
  quantity: Number,
  images: [String],
  specificiations: {
    type: String
  },
  purchasedDate: Date,
  salesDate: Date,
  returnedDate: Date,
  tags: [String],
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  isReturnEligible: {
    type: Boolean,
    default: false
  },
  warrentyStatus: Boolean,
  warrentyPeriod: String,
  discount: {
    discountedItem: Boolean,
    discountType: {
      type: String,
      enum: ['percentage', 'value', 'quantity']
    },
    discountValue: String
  },
  ratings: [ratingSchema]
}, {
  timestamps: true
})


module.exports = mongoose.model('item', ItemSchema)