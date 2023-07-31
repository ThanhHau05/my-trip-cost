import * as R from 'ramda';
import Immutable from 'seamless-immutable';

// is this object already Immutable?
const isImmutable = R.has('asMutable');

// change this Immutable object into a JS object
const convertToJs = (state: { asMutable: (arg0: { deep: boolean }) => any }) =>
  state.asMutable({ deep: true });

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = when(isImmutable, convertToJs);

// convert this JS object into an Immutable object
const toImmutable = (raw: any) => Immutable(raw);

// the transform interface that redux-persist is expecting
const transform = {
  out: (state: any) => {
    // console.log({ retrieving: state })
    return toImmutable(state);
  },
  in: (raw: any) => {
    // console.log({ storing: raw })
    return fromImmutable(raw);
  },
};

export default transform;

// eslint-disable-next-line @typescript-eslint/no-shadow
function when(predicate: any, transform: any) {
  return (value: any) => {
    if (predicate(value)) {
      return transform(value);
    }
    return value;
  };
}
