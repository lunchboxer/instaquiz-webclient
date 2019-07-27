export function normalize (oldData, parentTableName, previousEntities) {
  const data = JSON.parse(JSON.stringify(oldData))
  const entities = {}
  let previousEntities_ = { entities: {} }
  const results = []

  var _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }

  var _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (object) {
        return typeof object
      }
      : function (object) {
        return object &&
          typeof Symbol === 'function' &&
          object.constructor === Symbol &&
          object !== Symbol.prototype
          ? 'symbol'
          : typeof object
      }

  function _toConsumableArray (array) {
    if (Array.isArray(array)) {
      for (var i = 0, array2 = new Array(array.length); i < array.length; i++) {
        array2[i] = array[i]
      }
      return array2
    } else {
      return [...array]
    }
  }

  function _defineProperty (object, key, value) {
    if (key in object) {
      Object.defineProperty(object, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      })
    } else {
      object[key] = value
    }
    return object
  }

  var isObject = function isObject (item) {
    return (
      item &&
      (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' &&
      !Array.isArray(item)
    )
  }
  // in a given object, check if any descendants are objects or arrays
  // if an object or array is found, it passes the value and key
  var checkForNestedObjects = function checkForNestedObjects (object) {
    var objectTableName =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null

    var keys = Object.keys(object)
    for (const element of keys) {
      if (isObject(object[element])) {
        object[element] = convertToReferenceAndReplaceObject(
          element,
          object[element],
          objectTableName,
          object.id
        )
      }
      if (Array.isArray(object[element])) {
        object[element] = convertToEntitiesAndReplaceObjects(
          element,
          object[element],
          objectTableName,
          object.id
        )
      }
    }
  }

  // given an array of objects, and the entityTableName they belong to,
  // add each object to it's entity object and replace the array elements with id references
  // checks recursively first for any nested descendants further down
  var convertToEntitiesAndReplaceObjects = function convertToEntitiesAndReplaceObjects (
    entityTableName,
    arrayToConvert,
    parentTableName,
    parentId
  ) {
    var replacementIdArray = []

    for (const element of arrayToConvert) {
      checkForNestedObjects(element, entityTableName)

      addObjectToEntityTable(element, entityTableName)
      addParentReference(
        entityTableName,
        element,
        parentTableName,
        parentId
      )

      replacementIdArray.push(element.id)
    }
    return replacementIdArray
  }

  // converts an ancestor object to an id reference and adds ancestor object to it's entity type
  // if ancestor key is not pointed to an object, returns the original value
  var convertToReferenceAndReplaceObject = function convertToReferenceAndReplaceObject (
    entityTableName,
    objectToConvert,
    parentTableName,
    parentId
  ) {
    if (
      (typeof objectToConvert === 'undefined'
        ? 'undefined'
        : _typeof(objectToConvert)) === 'object'
    ) {
      if (!objectToConvert.id) {
        objectToConvert.id = Math.random()
          .toString(36)
          .substr(2, 9)
      }
      checkForNestedObjects(objectToConvert, parentTableName)
      addObjectToEntityTable(objectToConvert, entityTableName)
      addParentReference(
        entityTableName,
        objectToConvert,
        parentTableName,
        parentId
      )
      return objectToConvert.id
    }
    return objectToConvert
  }

  // adds object to it's entity type, with it's id as it's key
  var addObjectToEntityTable = function addObjectToEntityTable (
    object,
    entityTableName
  ) {
    if (previousEntities_.entities[entityTableName + 's']) {
      entityTableName = entityTableName + 's'
    }
    if (
      previousEntities_.entities[
        entityTableName.substring(0, entityTableName.length - 1)
      ]
    ) {
      entityTableName = entityTableName.substring(0, entityTableName.length - 1)
    }
    //

    if (!entities[entityTableName]) entities[entityTableName] = {}
    if (!previousEntities_.entities[entityTableName]) { previousEntities_.entities[entityTableName] = {} }
    if (!entities[entityTableName][object.id]) { entities[entityTableName][object.id] = {} }

    if (!previousEntities_.entities[entityTableName][object.id]) { previousEntities_.entities[entityTableName][object.id] = {} }

    // debugger;
    //
    entities[entityTableName] = _extends(
      {},
      entities[entityTableName],
      _defineProperty(
        {},
        object.id,
        _extends(
          {},
          previousEntities_.entities[entityTableName][object.id],
          entities[entityTableName][object.id],
          object
        )
      )
    )
  }

  // adds object's parent id, as JSON nested object often don't know who they belong to
  var addParentReference = function addParentReference (
    entityTableName,
    objectToConvert,
    parentTableName,
    parentId
  ) {
    if (!parentTableName) return
    if (!parentId) return

    if (previousEntities_.entities[entityTableName + 's']) {
      entityTableName = entityTableName + 's'
    }
    if (
      previousEntities_.entities[
        entityTableName.substring(0, entityTableName.length - 1)
      ]
    ) {
      entityTableName = entityTableName.substring(0, entityTableName.length - 1)
    }
    if (!entities[entityTableName]) entities[entityTableName] = {}

    if (!entities[entityTableName][objectToConvert.id]) { entities[entityTableName][objectToConvert.id] = {} }

    if (!entities[entityTableName][objectToConvert.id][parentTableName]) { entities[entityTableName][objectToConvert.id][parentTableName] = [] }

    entities[entityTableName][objectToConvert.id] = _extends(
      {},
      entities[entityTableName][objectToConvert.id],
      _defineProperty(
        {},
        parentTableName,
        [].concat(
          _toConsumableArray(
            entities[entityTableName][objectToConvert.id][parentTableName]
          ),
          [parentId]
        )
      )
    )
  }

  if (!data) return
  if (!parentTableName) return data
  if (
    !(Array.isArray(data) && data[0]) &&
    !(
      data !== null &&
      (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object'
    )
  ) { return data }
  if (previousEntities) previousEntities_ = previousEntities
  if (previousEntities_.entities[parentTableName + 's']) { parentTableName = parentTableName + 's' }
  if (
    previousEntities_.entities[
      parentTableName.substring(0, parentTableName.length - 1)
    ]
  ) { parentTableName = parentTableName.substring(0, parentTableName.length - 1) }

  if (!entities[parentTableName]) entities[parentTableName] = {}

  if (Array.isArray(data) && data[0]) {
    for (const element of data) {
      checkForNestedObjects(element, parentTableName)
      addObjectToEntityTable(element, parentTableName)
      results.push(element.id)
    }
    return { entities: entities }
  } else if (
    data !== null &&
    (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object'
  ) {
    if (!data.id) {
      data.id = Math.random()
        .toString(36)
        .substr(2, 9)
    }
    convertToReferenceAndReplaceObject(
      parentTableName,
      data,
      parentTableName,
      '-1'
    )
    return { entities: entities }
  } else {
    return data
  }
}
