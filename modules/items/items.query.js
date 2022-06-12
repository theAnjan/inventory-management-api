const ItemModel = require('./items.model');

function map_item_req(itemData, item) {
  if (itemData.name)
    item.name = itemData.name;
  if (itemData.description)
    item.description = itemData.description;
  if (itemData.category)
    item.category = itemData.category;
  if (itemData.color)
    item.color = itemData.color;
  if (itemData.price)
    item.price = itemData.price;
  if (itemData.status)
    item.status = itemData.status;
  if (itemData.modelNo)
    item.modelNo = itemData.modelNo;
  if (itemData.weight)
    item.weight = itemData.weight;
  if (itemData.size)
    item.size = itemData.size;
  if (itemData.brand)
    item.brand = itemData.brand;
  if (itemData.quantity)
    item.quantity = itemData.quantity;
  if (itemData.images)
    item.images = itemData.images;
  if (itemData.specificiations)
    item.specificiations = itemData.specificiations;
  if (itemData.purchasedDate)
    item.purchasedDate = itemData.purchasedDate;
  if (itemData.salesDate)
    item.salesDate = itemData.salesDate;
  if (itemData.returnedDate)
    item.returnedDate = itemData.returnedDate;
  if (itemData.tags)
    item.tags = itemData.tags.split(',')
  if (itemData.vendor)
    item.vendor = itemData.vendor;
  if (itemData.isReturnEligible)
    item.isReturnEligible = itemData.isReturnEligible;
  if (itemData.warrentyStatus)
    item.warrentyStatus = itemData.warrentyStatus;
  if (itemData.warrentyPeriod)
    item.warrentyPeriod = itemData.warrentyPeriod;
  if (!item.discount)
    item.discount = {};
  if (itemData.discountedItem)
    item.discount.discountedItem = itemData.discountedItem;
  if (itemData.discountType)
    item.discount.discountType = itemData.discountType;
  if (itemData.discountValue)
    item.discount.discountValue = itemData.discountValue;
}

/**
 * find form database
 * @param {object} condition 
 * @returns Promise
 */
function find(condition) {

  return ItemModel
    .find(condition)
    .sort({
      _id: -1
    })
    .populate('vendor', { username: 1, email: 1 })
    .populate('ratings.user', { username: 1 })
    .exec();
}

function insert(data) {

  // validate data
  // map data
  let newItem = new ItemModel({});
  map_item_req(data, newItem)
  // return new Promise(function (resolve, reject) {
  //   then(function (data) {
  //     resolve(data)
  //   })
  //     .catch(function (err) {
  //       reject(err)
  //     })
  // })
  return newItem.save();

}

function update(data, itemId) {
  return new Promise(function (resolve, reject) {
    ItemModel.findById(itemId, function (err, item) {
      if (err) {
        return reject(err)
      }
      if (!item) {
        return reject({
          msg: 'Item Not Found',
          status: 404
        })
      }
      map_item_req(data, item)
      item.save(function (err, updated) {
        if (err) {
          return reject(err)
        }
        resolve(updated)
      })
    })

  })
}

function remove(id) {
  return ItemModel.findByIdAndRemove(id);
}

function addRatings(data, itemId) {
  return new Promise(function (resolve, reject) {
    ItemModel.findById(itemId, function (err, item) {
      if (err) {
        return reject(err);
      }
      if (!item) {
        return reject({
          msg: 'item not found',
          status: 404
        })
      }
      item.ratings.push(data);
      item.save(function (err, saved) {
        if (err) {
          return reject(err);
        }
        resolve(saved)
      })
    })
  })
}


module.exports = {
  find,
  insert,
  update,
  remove,
  addRatings
}