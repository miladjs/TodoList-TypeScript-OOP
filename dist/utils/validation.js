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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE1BQU0sVUFBVSxRQUFRLENBQUMsTUFBbUI7SUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBRW5CLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNuQixPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztLQUN2RDtJQUNELElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3hELE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNyRTtJQUNELElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3hELE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNyRTtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMifQ==