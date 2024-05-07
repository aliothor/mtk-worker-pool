/**
 * Whether the object is null or undefined.
 * @param obj - object
 * @return
 */
export function isNil(obj: any) {
  return obj == null
}

/**
 * Check whether the object is a function
 * @param obj
 * @return
 */
export function isFunction(obj: any) {
  if (isNil(obj)) {
    return false
  }
  return typeof obj === 'function' || (obj.constructor !== null && obj.constructor === Function)
}

let uid = 0

export function UID() {
  return uid++
}

export const requestAnimFrame = requestAnimationFrame
