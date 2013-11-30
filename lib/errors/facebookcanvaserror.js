/**
 * `FacebookCanvasError` error.
 *
 * FacebookCanvasError represents an error while attempting to log in via a
 * Facebook canvas app.  Note that these responses don't conform
 * to the OAuth 2.0 specification.
 *
 * References:
 *   - https://developers.facebook.com/docs/reference/api/errors/
 *
 * @constructor
 * @param {String} [message]
 * @param {Number} [code]
 * @api public
 */
function FacebookCanvasError(message, code) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'FacebookCanvasError';
  this.message = message;
  this.code = code;
  this.status = 500;
}

/**
 * Inherit from `Error`.
 */
FacebookCanvasError.prototype.__proto__ = Error.prototype;


/**
 * Expose `FacebookCanvasError`.
 */
module.exports = FacebookCanvasError;
