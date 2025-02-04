const { Types } = require("mongoose");

/**
 * @typedef {Object} IProduct
 * @property {Types.ObjectId} category
 * @property {string} name
 * @property {number} quantity
 * @property {string} image
 * @property {string} seller_id
 * @property {number} freshness
 * @property {Date} harvest_date
 * @property {Types.ObjectId} location
 */

/**
 * @typedef {Object} ICreateProduct
 * @property {Types.ObjectId} category
 * @property {string} name
 * @property {number} quantity
 * @property {string} [image]
 * @property {string} seller_id
 * @property {number} freshness
 * @property {string} harvest_date
 * @property {Types.ObjectId} location
 */

/**
 * @typedef {Object} IUpdateProduct
 * @property {Types.ObjectId} [category]
 * @property {string} [name]
 * @property {number} [quantity]
 * @property {string} [image]
 * @property {string} [seller_id]
 * @property {number} [freshness]
 * @property {string} [harvest_date]
 * @property {Types.ObjectId} [location]
 */

/**
 * @typedef {Object} IGetProduct
 * @property {Types.ObjectId} _id
 */

/**
 * @typedef {Object} IGetProductByUser
 * @property {string} seller_id
 */

class CreateProductDTO {
  /**
   * @param {ICreateProduct} data
   */
  constructor(data) {
    this.category = data.category;
    this.name = data.name;
    this.quantity = data.quantity;
    this.image = data.image;
    this.seller_id = data.seller_id;
    this.freshness = data.freshness;
    this.harvest_date = data.harvest_date;
    this.location = data.location;
  }
}

class UpdateProductDTO {
  /**
   * @param {IUpdateProduct & { _id: string}}data
   */
  constructor(data) {
    this._id = new Types.ObjectId(data._id);
    if (data.category) this.category = data.category;
    if (data.name) this.name = data.name;
    if (data.quantity) this.quantity = data.quantity;
    if (data.image) this.image = data.image;
    if (data.seller_id) this.seller_id = data.seller_id;
    if (data.freshness) this.freshness = data.freshness;
    if (data.harvest_date) this.harvest_date = data.harvest_date;
    if (data.location) this.location = data.location;
  }
}

class GetProductByIdDTO {
  /**
   * @param {IGetProduct} data
   */
  constructor(data) {
    this._id = data._id;
  }
}

class GetProductByUserEmailDTO {
  /**
   * @param {IGetProductByUser} data
   */
  constructor(data) {
    this.seller_id = data.seller_id;
  }
}

module.exports = {
  CreateProductDTO,
  UpdateProductDTO,
  GetProductByIdDTO,
  GetProductByUserEmailDTO,
};
