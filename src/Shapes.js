/* 2 indicates the shape's stationary point.
*  A shape's stationary point will be the point on which axes's (axis in plural form) has most '1's.
*  If the shape is symmetrical - no point will be declared as stationary point.
*  Note that in most cases there can be more then 1 stationary point and in that case choose ONLY 1 point
*  as stationary.
*/

const shape = [
    [ [1, 2, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0] ],

    [ [0, 0, 1, 0],
      [0, 2, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0] ],

    [ [0, 1, 0, 0],
      [0, 2, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0] ],

    [ [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0] ],

    [ [0, 1, 0, 0],
      [1, 2, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0] ],

    [ [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 2, 1, 0],
      [0, 0, 0, 0] ]
]


module.exports = shape;