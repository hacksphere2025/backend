const { Types } = require("mongoose");

/**
 * @typedef {Object} ILocation
 * @property {string} lat
 * @property {string} lng
 */

/**
 * @typedef {Object} IAddress
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {number} pincode
 * @property {Location} location
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} ICreateAddress
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {number} pincode
 * @property {Location} location
 */

/**
 * @typedef {Object} IUpdateAddress
 * @property {string} [address]
 * @property {string} [city]
 * @property {string} [state]
 * @property {number} [pincode]
 * @property {Location} [location]
 */

/**
 * @typedef {Object} IGetAddress
 * @property {Types.ObjectId} _id
 */

class LocationPointsDto {
  /**
   * @param {ILocation} location
   */
  constructor(location) {
    this.lat = location.lat;
    this.lng = location.lng;
  }
}

class CreateAddressDTO {
  /**
   * @param {ICreateAddress} data
   */
  constructor(data) {
      this.address = data.address;
      this.city = data.city;
      this.state = data.state;
      this.pincode = data.pincode;
      this.location = new LocationPointsDto(data.location);
  }

  
}

class UpdateAddressDTO {
  /**
   * @param {IUpdateAddress & { _id: string}}data
   */
  constructor(data) {
    this._id = new Types.ObjectId(data._id);
    if (data.address) this.address = data.address;
    if (data.city) this.city = data.city;
    if (data.state) this.state = data.state;
    if (data.pincode) this.pincode = data.pincode;
    if (data.location) this.location = new LocationPointsDto(data.location);
  }
}

class AddressResponseDTO {
  /**
   * @param {IAddress & { _id: string }} data
   */
  constructor(data) {
    this._id = new Types.ObjectId(data._id);
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.pincode = data.pincode;
    this.location = new LocationPointsDto(data.location);
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

class AddressIdDTO {
  /**
   * @param {IGetAddress} data
   */
  constructor(data) {
    this._id = new Types.ObjectId(data._id);
  }
}

module.exports = {
  LocationPointsDto,
  CreateAddressDTO,
  UpdateAddressDTO,
  AddressResponseDTO,
  AddressIdDTO,
};
