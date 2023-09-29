export function validate(entery) {
    let isValid = true;
    if (entery.required) {
        isValid = isValid && entery.value.trim().length !== 0;
    }
    if (entery.minLength && typeof entery.value === "string") {
        isValid = isValid && entery.value.trim().length >= entery.minLength;
    }
    if (entery.maxLength && typeof entery.value === "string") {
        isValid = isValid && entery.value.trim().length <= entery.maxLength;
    }
    return isValid;
}
//# sourceMappingURL=validation.js.map