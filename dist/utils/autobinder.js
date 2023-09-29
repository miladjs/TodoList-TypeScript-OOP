export function autobinder(_, _2, descriptor) {
    const orginalMethod = descriptor.value;
    const myDescriptor = {
        configurable: true,
        get() {
            const BoundFn = orginalMethod.bind(this);
            return BoundFn;
        },
    };
    return myDescriptor;
}
//# sourceMappingURL=autobinder.js.map