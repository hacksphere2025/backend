/**
 * @typedef {Object} Iorder
 * @property {Types.ObjectId} buy_product
 * @property {Types.ObjectId} location
 * @property {number} quantity
 * @property {string} unit
 * @property {Types.ObjectId} seller_id
 * @property {Types.ObjectId} buyer_id
 * @property {string} status
 */

/**
 * @typedef {Object} ICreateOrder
 * @property {string} product_id
 * @property {number} quantity
 * @property {string} seller_id
 * @property {string} buyer_id
 * @property {string} location
 * @property {string} status
 */

/**
 * @typedef {Object} IUpdateOrder
 * @property {Types.ObjectId} [product_id]
 * @property {number} [quantity]
 * @property {string} [unit]
 * @property {Types.ObjectId} [seller_id]
 * @property {Types.ObjectId} [buyer_id]
 * @property {string} [status]
 */

class CreateOrderDTO {
  /**
   * @param {ICreateOrder} data
   */
  constructor(data) {
    this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.buyer_id = data.buyer_id;
    this.seller_id = data.seller_id;
    this.location = data.location;
    this.status = data.status;
  }
}

class UpdateOrderDTO {
  /**
   * @param {IUpdateOrder} data
   */
  constructor(data) {
    this.buy_product = data.buy_product;
    this.quantity = data.quantity;
    this.buyer_id = data.buyer_id;
    this.seller_id = data.seller_id;
    this.location = data.location;
    this.status = data.status;
  }
}

module.exports = {
  CreateOrderDTO,
  UpdateOrderDTO,
};
