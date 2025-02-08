/**
 * @typedef {Object} ICart
 * @property {Types.ObjectId} product_id
 * @property {number} quantity
 * @property {string} [unit]
 * @property {string} user
 */

/**
 * @typedef {Object} ICreateCart
 * @property {Types.ObjectId} product_id
 * @property {number} quantity
 * @property {string} [unit]
 * @property {string} user
 */

/**
 * @typedef {Object} IUpdateCart
 * @property {Types.ObjectId} [product_id]
 * @property {number} [quantity]
 * @property {string} [unit]
 * @property {string} [user]
 */

class CreateCartDTO {
  /**
   * @param {ICreateCart} data
   */
  constructor(data) {
    this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.user = data.user;
    this.unit = data.unit;
  }
}

class UpdateCartDTO {
  /**
   * @param {IUpdateCart} data
   */
  constructor(data) {
    this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.user = data.user;
    this.unit = data.unit;
  }
}

module.exports = {
  CreateCartDTO,
  UpdateCartDTO,
};
