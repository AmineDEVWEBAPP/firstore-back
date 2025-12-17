export default function camelToSnake(value) {
    return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}