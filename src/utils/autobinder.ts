export function autobinder(_: any, _2: any, descriptor: PropertyDescriptor) {
  const orginalMethod = descriptor.value;

  const myDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const BoundFn = orginalMethod.bind(this);
      return BoundFn;
    },
  };
  return myDescriptor;
}
