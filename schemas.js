const Joi = require('joi');

// Function to escape HTML characters
function escapeHTML(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Extension for Joi to add escapeHTML rule
const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = escapeHTML(value);
        if (clean !== value) return helpers.error('string.escapeHTML', { value });
        return clean;
      }
    }
  }
});

// Extend Joi with the escapeHTML extension
const JoiWithEscapeHTML = Joi.extend(extension);

// Validation schema for campground
const campgroundSchema = JoiWithEscapeHTML.object({
  campground: JoiWithEscapeHTML.object({
    title: JoiWithEscapeHTML.string().required().escapeHTML(),
    price: JoiWithEscapeHTML.number().required().min(0),
    // image: JoiWithEscapeHTML.string().required(),
    location: JoiWithEscapeHTML.string().required().escapeHTML(),
    description: JoiWithEscapeHTML.string().required().escapeHTML(),
  }).required(),
  deleteImages: JoiWithEscapeHTML.array()
});

// Validation schema for review
const reviewSchema = JoiWithEscapeHTML.object({
  review: JoiWithEscapeHTML.object({
    rating: JoiWithEscapeHTML.string().required().escapeHTML(),
    body: JoiWithEscapeHTML.string().required().escapeHTML(),
  }).required()
});

module.exports = {
  campgroundSchema,
  reviewSchema
};
