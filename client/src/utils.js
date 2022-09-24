import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 767px) {
      ${props}
    }
  `;
};
// for example: ${mobile({ width: "50px" })};

export const extractImageUrl = (imageId, format, type) => {
  /**
   * Extracts image URL.
   * @param {int} imageId - The id of the image.
   * @param {string} format - The file format of the image
   * @param {string} type - The type of the image. "banner" for banner, "logo" for logo, null for product etc.
   */

  if (type)
    return `https://bringit-images.s3.amazonaws.com/assets/${type}-${imageId}.${format}`;
  else
    return `https://bringit-images.s3.amazonaws.com/assets/${imageId}.${format}`;
  // if (type) return `/assets/${type}-${imageId}.${format}`;
  // else return `/assets/${imageId}.${format}`;
};

export const isStoreOpen = (start, end) => {
  const now = new Date();
  const startMin = start * 60;
  const endMin = end * 60;
  const nowMin = now.getHours() * 60 + now.getMinutes();

  if (
    nowMin >= startMin &&
    nowMin <= endMin &&
    now.getDay() !== 0 &&
    now.getDay() !== 6
  )
    return true;
  else return false;

  // return true;
};
