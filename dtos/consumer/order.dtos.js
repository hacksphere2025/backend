/**
 * @typedef {Object} Iorder
 * @property {Types.ObjectId} buy_product
 * @property {number} quantity
 * @property {Types.ObjectId} seller_id
 * @property {Types.ObjectId} buyer_id
 */

/**
 * @typedef {Object} ICreateOrder
 * @property {Types.ObjectId} product_id
 * @property {number} quantity
 * @property {Types.ObjectId} seller_id
 * @property {Types.ObjectId} buyer_id
 */

/**
 * @typedef {Object} IUpdateOrder
 * @property {Types.ObjectId} [product_id]
 * @property {number} [quantity]
 * @property {Types.ObjectId} [seller_id]
 * @property {Types.ObjectId} [buyer_id]
 */

class CreateOrderDTO {
  /**
   * @param {ICreateOrder} data
   */
  constructor(data) {
    this.buy_product = data.buy_product;
    this.quantity = data.quantity;
    this.buyer_id = data.buyer_id;
    this.seller_id = data.seller_id;
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
  }
}

module.exports = {
  CreateOrderDTO,
  UpdateOrderDTO,
};
