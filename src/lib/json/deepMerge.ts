export default function deepMerge(...args: Object[]) {
  if (args.length > 0) {
    // дописать merge с массивами
    let result = new (<any>args[0].constructor)();
    let array = Array.isArray(result);
    for (let i = 0, len = args.length; i < len; i++) {
      let current = args[i];
      if (current !== undefined) {
        if (!array) {
          let keys = Object.keys(current);
          for (let j = 0, kLen = keys.length; j < kLen; j++) {
            let key = keys[j];
            if (current.hasOwnProperty(key)) {
              let cv = current[key];
              if (result.hasOwnProperty(key) && typeof cv === 'object' && cv !== null) {
                result[key] = deepMerge(result[key], cv);
              } else {
                result[key] = cv;
              }
            }
          }
        } else {
          if (Array.isArray(current)) {
            result = [
              ...result,
              ...(<Object[]>current),
            ];
          } else {
            result.push(current);
          }
        }
      }
    }
    return result;
  } else {
    return args[0];
  }
};
