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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2JpbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hdXRvYmluZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxVQUFVLENBQUMsQ0FBTSxFQUFFLEVBQU8sRUFBRSxVQUE4QjtJQUN4RSxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBRXZDLE1BQU0sWUFBWSxHQUF1QjtRQUN2QyxZQUFZLEVBQUUsSUFBSTtRQUNsQixHQUFHO1lBQ0QsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQ0YsQ0FBQztJQUNGLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMifQ==